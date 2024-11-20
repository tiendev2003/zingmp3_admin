import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListTable from "../../components/ui/listtable/ListTable";
import TitleBar from "../../components/ui/titleBar/TitleBar";
import Topbar from "../../components/ui/topbar/Topbar";
import { deleteAlbum, fetchAlbums } from "../../redux/albumsSlice";
import Main from "../../utils/main/Main";

function Albums() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { albums, status, error } = useSelector((state) => state.albums);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddAlbum = () => {
    navigate("add");
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (album) => {
    setSelectedAlbum(album);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAlbum(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteAlbum(selectedAlbum._id)).unwrap();
      dispatch(fetchAlbums());
      setSnackbar({
        open: true,
        message: "Xóa album thành công!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Xóa album thất bại!",
        severity: "error",
      });
    } finally {
      setOpen(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlbums = albums.filter((album) =>
    album.name_album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const paginatedAlbums = filteredAlbums.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Main containerName="Album">
      <TitleBar text="Danh Sách Album" />
      <section className="orderDetail">
        <Topbar
          title={"Chi Tiết Album Gần Đây"}
          IconBox={
            <div>
              <TextField
                label="Tìm kiếm album"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginRight: "16px" }}
              />
              <Button variant="outlined" onClick={handleAddAlbum}>
                Thêm Album
              </Button>
            </div>
          }
        />
        <ListTable>
          {status === "loading" && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          {status === "succeeded" && albums.length === 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">Không có dữ liệu</Typography>
            </Box>
          )}
          {status === "succeeded" && albums.length > 0 && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table_head">Id</th>
                    <th className="table_head">Tên</th>
                    <th className="table_head">Mô Tả</th>
                    <th className="table_head">Hình Ảnh</th>
                    <th className="table_head">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAlbums.map((item, index) => (
                    <tr key={index} className="table_row">
                      <td className="table_Cell">
                        {(page - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="table_Cell">{item.name_album}</td>
                      <td className="table_Cell">{item.description}</td>
                      <td className="table_Cell">
                        <div className="imgBox">
                          <img
                            src={item.image_album}
                            alt=""
                            width={50}
                            height={50}
                            className="album-image"
                          />
                        </div>
                      </td>
                      <td className="table_Cell">
                        <div className="action_btn">
                          <div
                            onClick={() => navigate(`edit/${item._id}`)}
                            className="icon"
                          >
                            <EditOutlinedIcon />
                          </div>
                          <div
                            onClick={() => handleDeleteClick(item)}
                            className="icon"
                          >
                            <DeleteOutlineOutlinedIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={Math.ceil(albums.length / itemsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                />
              </Box>
            </>
          )}
        </ListTable>
      </section>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa album này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Main>
  );
}

export default Albums;
