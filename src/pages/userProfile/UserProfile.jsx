import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TitleBar from "../../components/ui/titleBar/TitleBar";
import { AuthContext } from "../../context/AuthContext";
import Main from "../../utils/main/Main";

function UserProfile() {
  const { userInformation, updateUserInformation, changePassword } =
    useContext(AuthContext);
  const [formData, setFormData] = useState({
    user_name: userInformation.user_name,
    email: userInformation.email,
    image: userInformation.image,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [imagePreview, setImagePreview] = useState(userInformation.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOpen(true);
    try {
      const updatedFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        updatedFormData.append(key, formData[key]);
      });
      await updateUserInformation(updatedFormData);
      setLoading(false);
      setOpen(false);
      toast.success("User information updated successfully!");
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error("Failed to update user information.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOpen(true);
    try {
      const response = await changePassword(passwordData);
      setLoading(false);

      toast.success(response.message || "Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error(err.response.data.message || "Failed to change password.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Main containerName="Vai trò người dùng">
      <TitleBar text="Thông tin người dùng" />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Avatar
              src={imagePreview}
              alt={formData.user_name}
              sx={{ width: 100, height: 100, bgcolor: 'var(--bgColor)' }}
            />
            <Input type="file" onChange={handleImageChange} sx={{ color: 'var(--textColor)' }} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Tên người dùng"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'var(--textColor)' } }}
                InputProps={{ style: { color: 'var(--textColor)' } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'var(--textColor)' } }}
                InputProps={{ style: { color: 'var(--textColor)' } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2, bgcolor: 'var(--primaryColor)', color: 'var(--rePrimaryColor)' }}
              >
                Cập nhật thông tin
              </Button>
            </form>
            <form onSubmit={handleChangePassword}>
              <TextField
                fullWidth
                margin="normal"
                label="Mật khẩu hiện tại"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                InputLabelProps={{ style: { color: 'var(--textColor)' } }}
                InputProps={{
                  style: { color: 'var(--textColor)' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        sx={{ color: 'var(--textColor)' }}
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Mật khẩu mới"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                InputLabelProps={{ style: { color: 'var(--textColor)' } }}
                InputProps={{
                  style: { color: 'var(--textColor)' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        sx={{ color: 'var(--textColor)' }}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={loading}
                sx={{ mt: 2, bgcolor: 'var(--primaryColor)', color: 'var(--rePrimaryColor)' }}
              >
                Đổi mật khẩu
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          sx={{ bgcolor: 'var(--mainBG)' }}
        >
          {loading && <CircularProgress sx={{ color: 'var(--textColor)' }} />}
        </Box>
      </Modal>
    </Main>
  );
}

export default UserProfile;
