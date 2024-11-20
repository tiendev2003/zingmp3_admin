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
import slugify from "slugify";
import { fetchArtistById, updateArtist } from "../../redux/artistsSlice";
import Main from "../../utils/main/Main";

function EditArtist() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artist, status, error } = useSelector((state) => state.artists);
  const [formData, setFormData] = useState({
    name_artist: "",
    slug_name_artist: "",
    bio: "",
    image_artist: "",
  });
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchArtistById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (artist) {
      setFormData(artist);
      if (artist.image_artist) {
        setPreview(artist.image_artist);
      }
    }
  }, [artist]);

  const generateSlug = (name) => {
    return slugify(name, { lower: true, strict: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      if (name === "name_artist") {
        updatedFormData.slug_name_artist = generateSlug(value);
      }
      return updatedFormData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image_artist: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      await dispatch(updateArtist({ id, ...formData })).unwrap();
      toast.success("Artist updated successfully!");
      setOpen(false);
      history("/artists");
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  return (
    <Main containerName="Chỉnh sửa Nghệ sĩ">
      <Container className="edit-artist-container" maxWidth="xl">
        <Typography variant="h4">
          Chỉnh sửa Nghệ sĩ {formData?.name_artist}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} className="edit-artist-form">
          <TextField
            label="Tên"
            name="name_artist"
            value={formData.name_artist}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Tên Slug"
            name="slug_name_artist"
            value={formData.slug_name_artist}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Tiểu sử"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <input
            accept="image/*"
            id="upload-button"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }} // Ẩn phần tử input
          />
          <label htmlFor="upload-button">
            <Button variant="contained" component="span" color="secondary">
              Tải lên Hình ảnh
            </Button>
          </label>
          {preview && (
            <img src={preview} alt="Xem trước Hình ảnh" className="image-preview" />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={open}
          >
            Lưu
          </Button>
        </form>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
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
}

export default EditArtist;
