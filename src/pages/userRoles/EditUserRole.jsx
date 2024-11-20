import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserRoleById, updateUserRole } from "../../redux/userRolesSlice";
import Main from "../../utils/main/Main";

const EditUserRole = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { role, status, error } = useSelector((state) => state.userRoles);
  const [name, setName] = useState(""); // Ensure name is always defined
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserRoleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (role && role.name !== undefined) {
      setName(role.name);
    }
  }, [role]);

  const handleChange = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      await dispatch(updateUserRole({ id, name })).unwrap();
      toast.success("Cập nhật vai trò người dùng thành công!");
      setOpen(false);
      navigate("/user-roles");
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  return (
    <Main containerName="Chỉnh sửa vai trò người dùng">
      <Container maxWidth="xl">
        <Typography variant="h4">Chỉnh sửa vai trò người dùng</Typography>
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
          <Button type="submit" variant="contained" color="primary" disabled={open}>
            Lưu vai trò
          </Button>
        </form>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          {open && <CircularProgress />}
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

export default EditUserRole;