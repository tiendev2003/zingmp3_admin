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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListTable from "../../components/ui/listtable/ListTable";
import TitleBar from "../../components/ui/titleBar/TitleBar";
import Topbar from "../../components/ui/topbar/Topbar";
import { deleteArtist, fetchArtists } from "../../redux/artistsSlice";
import Main from "../../utils/main/Main";
const Artists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artists, status, error } = useSelector((state) => state.artists);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddArtist = () => {
    navigate("add");
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (artist) => {
    setSelectedArtist(artist);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArtist(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteArtist(selectedArtist._id)).unwrap();
      dispatch(fetchArtists());
      setSnackbar({
        open: true,
        message: "Xóa nghệ sĩ thành công!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Xóa nghệ sĩ thất bại!",
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

  const filteredArtists = artists.filter((artist) =>
    artist.name_artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const paginatedArtists = filteredArtists.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Main containerName="Nghệ sĩ">
      <TitleBar text="Danh Sách Nghệ Sĩ" />
      <section className="orderDetail">
        <Topbar
          title={"Chi Tiết Nghệ Sĩ Gần Đây"}
          IconBox={
            <div>
              <TextField
                label="Tìm kiếm nghệ sĩ"
                variant="outlined"
                size="small" // Adjust size to small
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginRight: "16px" }}
              />
              <Button variant="outlined" onClick={handleAddArtist}>
                Thêm Nghệ Sĩ
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
          {status === "succeeded" && artists.length === 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">Không có dữ liệu</Typography>
            </Box>
          )}
          {status === "succeeded" && artists.length > 0 && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table_head">Id</th>
                    <th className="table_head">Tên</th>
                    <th className="table_head">Slug</th>
                    <th className="table_head">Tiểu Sử</th>
                    <th className="table_head">Hình Ảnh</th>
                    <th className="table_head">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedArtists.map((item, index) => (
                    <tr key={index} className="table_row">
                      <td className="table_Cell">
                        {(page - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="table_Cell">{item.name_artist}</td>
                      <td className="table_Cell">{item.slug_name_artist}</td>
                      <td className="table_Cell">{item.bio}</td>
                      <td className="table_Cell">
                        <div className="imgBox">
                          <img
                            src={item.image_artist}
                            alt=""
                            width={50}
                            height={50}
                            className="artist-image"
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
                  count={Math.ceil(artists.length / itemsPerPage)}
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
            Bạn có chắc chắn muốn xóa nghệ sĩ này không?
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
};

export default Artists;
