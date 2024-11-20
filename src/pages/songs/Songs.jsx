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
import { deleteSong, fetchSongs } from "../../redux/songsSlice";
import Main from "../../utils/main/Main";

const Songs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songs, status, error } = useSelector((state) => state.songs);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddSong = () => {
    navigate("add");
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (song) => {
    setSelectedSong(song);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSong(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteSong(selectedSong._id)).unwrap();
      dispatch(fetchSongs());
      setSnackbar({
        open: true,
        message: "Xóa bài hát thành công!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Xóa bài hát thất bại!",
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

  const filteredSongs = songs.filter((song) =>
    song.name_music.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const paginatedSongs = filteredSongs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Main containerName="Bài hát">
      <TitleBar text="Danh Sách Bài hát" />
      <section className="orderDetail">
        <Topbar
          title={"Chi Tiết Bài Hát Gần Đây"}
          IconBox={
            <div>
              <TextField
                label="Tìm kiếm bài hát"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginRight: "16px" }}
              />
              <Button variant="outlined" onClick={handleAddSong}>
                Thêm Bài Hát
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
          {status === "succeeded" && songs.length === 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">Không có dữ liệu</Typography>
            </Box>
          )}
          {status === "succeeded" && songs.length > 0 && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table_head">Id</th>
                    <th className="table_head">Tên Bài Hát</th>
                    <th className="table_head">Ca Sĩ</th>
                    <th className="table_head">Thể Loại</th>
                    <th className="table_head">Thời Gian</th>
                    <th className="table_head">Hình Ảnh</th>
                    <th className="table_head">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSongs.map((item, index) => (
                    <tr key={index} className="table_row">
                      <td className="table_Cell">
                        {(page - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="table_Cell">{item.name_music}</td>
                      <td className="table_Cell">{item.name_singer}</td>
                      <td className="table_Cell">{item.category}</td>
                      <td className="table_Cell">{item.time_format}</td>
                      <td className="table_Cell">
                      <div className="imgBox">
                            <img
                              src={item.image_music}
                              alt=""
                              height={50}
                              width={50}
                              className="song-image"
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
                  count={Math.ceil(songs.length / itemsPerPage)}
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
            Bạn có chắc chắn muốn xóa bài hát này không?
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

export default Songs;
