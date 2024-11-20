import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAlbum } from "../../redux/albumsSlice";
import { fetchArtists } from "../../redux/artistsSlice";
import { fetchSongs } from "../../redux/songsSlice";
import Main from "../../utils/main/Main";

function AddAlbum() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { status, error } = useSelector((state) => state.albums);
  const { artists } = useSelector((state) => state.artists);
  const { songs } = useSelector((state) => state.songs);
  const [album, setAlbum] = useState({
    name_album: "",
    description: "",
    image_album: "",
    array_music: [],
    artist: "",
  });
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum((prevAlbum) => ({ ...prevAlbum, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAlbum({ ...album, image_album: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      await dispatch(addAlbum(album)).unwrap();
      toast.success("Album added successfully!");
      setOpen(false);
      history("/albums");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main containerName="Thêm Album">
      <Container className="add-album-container" maxWidth="xl">
        <Typography variant="h4">Thêm Album</Typography>
        <form onSubmit={handleSubmit} className="add-album-form">
          <TextField
            label="Tên"
            name="name_album"
            value={album.name_album}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Mô tả"
            name="description"
            value={album.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Nghệ sĩ</InputLabel>
            <Select
              name="artist"
              value={album.artist}
              onChange={handleChange}
              label="Nghệ sĩ"
              required
            >
              {artists.map((artist) => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name_artist}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Nhạc</InputLabel>
            <Select
              name="array_music"
              multiple
              value={album.array_music || []}
              onChange={handleChange}
              input={<OutlinedInput label="Nhạc" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                      Chưa chọn nhạc
                    </Typography>
                  ) : (
                    selected.map((value) => (
                      <Chip key={value} label={songs.find((m) => m._id === value)?.name_music} />
                    ))
                  )}
                </Box>
              )}
            >
              {songs.map((m) => (
                <MenuItem key={m._id} value={m._id}>
                  {m.name_music}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input
            accept="image/*"
            id="upload-button"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="upload-button">
            <Button variant="contained" component="span" color="secondary">
              Tải lên hình ảnh
            </Button>
          </label>
          {preview && (
            <img src={preview} alt="Xem trước hình ảnh" className="image-preview" />
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

export default AddAlbum;