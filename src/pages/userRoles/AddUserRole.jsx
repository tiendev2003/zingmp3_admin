import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TitleBar from "../../components/ui/titleBar/TitleBar";
import { createUserRole } from "../../redux/userRolesSlice";
import Main from "../../utils/main/Main";

const AddUserRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.userRoles);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      await dispatch(createUserRole({ name })).unwrap();
      toast.success("Thêm vai trò người dùng thành công!");
      setOpen(false);
      navigate("/user-roles");
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  return (
    <Main containerName="Thêm vai trò người dùng mới">
      <TitleBar text="Thêm vai trò" titleHome="Danh sách vai trò" />
      <section className="listtable">
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên vai trò"
            name="name"
            value={name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            disabled={status === "loading"}
          >
            Lưu vai trò
          </Button>
        </form>
      </section>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {status === "loading" && <CircularProgress />}
          {status === "failed" && (
            <Alert severity="error" onClose={() => setOpen(false)}>
              {error}
            </Alert>
          )}
        </Box>
      </Modal>
    </Main>
  );
};

export default AddUserRole;
