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
import { deleteUserRole, fetchUserRoles } from "../../redux/userRolesSlice";
import Main from "../../utils/main/Main";

const UserRoles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roles, status, error } = useSelector((state) => state.userRoles);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddRole = () => {
    navigate("add");
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRole(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteUserRole(selectedRole._id)).unwrap();
      dispatch(fetchUserRoles());
      setSnackbar({
        open: true,
        message: "Xóa vai trò thành công!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Xóa vai trò thất bại!",
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

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchUserRoles());
  }, [dispatch]);

  const paginatedRoles = filteredRoles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Main containerName="Vai trò người dùng">
      <TitleBar text="Danh Sách Vai Trò Người Dùng" />
      <section className="orderDetail">
        <Topbar
          title={"Chi Tiết Vai Trò Gần Đây"}
          IconBox={
            <div>
              <TextField
                label="Tìm kiếm vai trò"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginRight: "16px" }}
              />
              <Button variant="outlined" onClick={handleAddRole}>
                Thêm Vai Trò
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
          {status === "succeeded" && roles.length === 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">Không có dữ liệu</Typography>
            </Box>
          )}
          {status === "succeeded" && roles.length > 0 && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table_head">Id</th>
                    <th className="table_head">Tên</th>
                    <th className="table_head">Mô Tả</th>
                    <th className="table_head">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRoles.map((role, index) => (
                    <tr key={index} className="table_row">
                      <td className="table_Cell">
                        {(page - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="table_Cell">{role.name}</td>
                      <td className="table_Cell">{role.description}</td>
                      <td className="table_Cell">
                        <div className="action_btn">
                          <div
                            onClick={() => navigate(`edit/${role._id}`)}
                            className="icon"
                          >
                            <EditOutlinedIcon />
                          </div>
                          <div
                            onClick={() => handleDeleteClick(role)}
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
                  count={Math.ceil(roles.length / itemsPerPage)}
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
            Bạn có chắc chắn muốn xóa vai trò này không?
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

export default UserRoles;