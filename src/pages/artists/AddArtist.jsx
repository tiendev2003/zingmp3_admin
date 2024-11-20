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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from "slugify";
import { addArtist } from "../../redux/artistsSlice";
import Main from "../../utils/main/Main";

function AddArtist() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { status, error } = useSelector((state) => state.artists);
  const [artist, setArtist] = useState({
    name_artist: "",
    slug_name_artist: "",
    bio: "",
    image_artist: "",
  });
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);

  const generateSlug = (name) => {
    return slugify(name, { lower: true, strict: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtist((prevArtist) => {
      const updatedArtist = { ...prevArtist, [name]: value };
      if (name === "name_artist") {
        updatedArtist.slug_name_artist = generateSlug(value);
      }
      return updatedArtist;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setArtist({ ...artist, image_artist: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      await dispatch(addArtist(artist)).unwrap();
      toast.success("Artist added successfully!");
      setOpen(false);
      history("/artists");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main containerName="Thêm Nghệ sĩ">
      <Container className="add-artist-container" maxWidth="xl">
        <Typography variant="h4">Thêm Nghệ sĩ</Typography>
        <form onSubmit={handleSubmit} className="add-artist-form">
          <TextField
            label="Tên"
            name="name_artist"
            value={artist.name_artist}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Tên Slug"
            name="slug_name_artist"
            value={artist.slug_name_artist}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Tiểu sử"
            name="bio"
            value={artist.bio}
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
            disabled={status === "loading"}
          >
            Thêm
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
}

export default AddArtist;
