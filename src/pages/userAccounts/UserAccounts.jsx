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
import { fetchUserAccounts } from "../../redux/userAccountsSlice";
import "../../styles/_variables.scss"; // Import the variables
import Main from "../../utils/main/Main";

const UserAccounts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accounts, status, error } = useSelector(
    (state) => state.userAccounts
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (account) => {
    setSelectedAccount(account);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAccount(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccounts = accounts.filter((account) =>
    account.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchUserAccounts());
  }, [dispatch]);

  useEffect(() => {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(darkModePreference);
  }, []);

  const paginatedAccounts = filteredAccounts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Main
      containerName="Tài khoản người dùng"
      className={isDarkMode ? "dark-mode" : ""}
    >
      <TitleBar text="Danh Sách Tài Khoản Người Dùng" />
      <section className="orderDetail">
        <Topbar
          title={"Chi Tiết Tài Khoản Gần Đây"}
          IconBox={
            <div>
              <TextField
                label="Tìm kiếm tài khoản"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                InputLabelProps={{ style: { color: "var(--textColor)",
                  borderColor: "var(--textColor)"
                 } }}
                InputProps={{ style: { color: "var(--textColor)" } }}
              />
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
          {status === "succeeded" && accounts.length === 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">Không có dữ liệu</Typography>
            </Box>
          )}
          {status === "succeeded" && accounts.length > 0 && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table_head">Id</th>
                    <th className="table_head">Ảnh</th>
                    <th className="table_head">Tên Người Dùng</th>
                    <th className="table_head">Email</th>
                    <th className="table_head">Vai Trò</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAccounts.map((account, index) => (
                    <tr key={index} className="table_row">
                      <td className="table_Cell">
                        {(page - 1) * itemsPerPage + index + 1}
                      </td>

                      <td className="table_Cell">
                        <div className="imgBox">
                          <img
                            src={account.image}
                            alt=""
                            width={50}
                            height={50}
                            className="album-image"
                          />
                        </div>
                      </td>
                      <td className="table_Cell">{account.user_name}</td>
                      <td className="table_Cell">{account.email}</td>
                      <td className="table_Cell">{account.role.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={Math.ceil(accounts.length / itemsPerPage)}
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
            Bạn có chắc chắn muốn xóa tài khoản này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
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

export default UserAccounts;
