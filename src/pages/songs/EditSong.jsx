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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchArtists } from "../../redux/artistsSlice";
import { fetchSongById, updateSong } from "../../redux/songsSlice";
import Main from "../../utils/main/Main";

 

function EditSong() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    artists,
    status: artistsStatus,
    error: artistsError,
  } = useSelector((state) => state.artists);
  const {
    song,
    status: songStatus,
    error: songError,
  } = useSelector((state) => state.songs);
  const [formData, setFormData] = useState({
    id_singer: "",
    name_music: "",
    category: "",
    content: "",
    link_mv: "",
    image_music: "",
    src_music: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [youtubePreview, setYoutubePreview] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchSongById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (song) {
      setFormData({
        ...song,
        link_mv: song.link_mv
          ? `https://www.youtube.com/watch?v=${song.link_mv}`
          : "",
          id_singer: song.id_account,
      });
      setImagePreview(song.image_music);
      setAudioPreview(song.src_music);
      setYoutubePreview(
        song.link_mv ? `https://www.youtube.com/embed/${song.link_mv}` : null
      );
    }
  }, [song]);

  const extractYoutubeId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "link_mv") {
      const youtubeId = extractYoutubeId(value);
      setYoutubePreview(
        youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null
      );
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData({ ...formData, [name]: file });
    if (name === "image_music") {
      setImagePreview(URL.createObjectURL(file));
    } else if (name === "src_music") {
      setAudioPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      await dispatch(updateSong({ id, ...formData })).unwrap();
      toast.success("Cập nhật bài hát thành công!");
      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };
  console.log(formData);
  return (
    <Main containerName="Chỉnh sửa bài hát">
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa bài hát: <strong>{formData.name_music}</strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Chọn nghệ sĩ"
            name="id_singer"
            value={formData.id_singer}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            fullWidth
            margin="normal"
            required
          >
            <option value="">Chọn nghệ sĩ</option>
            {artists.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name_artist}
              </option>
            ))}
          </TextField>
          <TextField
            label="Tên bài hát"
            name="name_music"
            value={formData.name_music}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Thể loại"
            name="category"
            value={formData.category}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            fullWidth
            margin="normal"
            required
          >
            <option value="">Chọn thể loại</option>
            <option value={"all"}>Tất cả</option>
            <option value={"kpop"}>Nhạc Hàn</option>
            <option value={"vpop"}>Nhạc Việt</option>
            <option value={"usuk"}>Nhạc Âu Mỹ</option>
            <option value={"lobal"}>Nhạc toàn cầu</option>
          </TextField>
          <TextField
            label="Nội dung"
            name="content"
            value={formData.content ?? ""}
            onChange={handleChange}
            multiline
           minRows={6}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Link MV"
            name="link_mv"
            value={formData.link_mv}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {youtubePreview && (
            <Box mt={2}>
              <iframe
                width="100%"
                height="315"
                src={youtubePreview}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Preview"
              ></iframe>
            </Box>
          )}
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span" color="primary">
              Tải lên hình ảnh
            </Button>
          </label>
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="Image Preview"
                className="image-preview"
              />
            </Box>
          )}
          <input
            accept="audio/*"
            id="audio-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="audio-upload">
            <Button variant="contained" component="span" color="primary">
              Tải lên âm thanh
            </Button>
          </label>
          {audioPreview && (
            <Box mt={2}>
              <audio controls src={audioPreview} style={{ width: "100%" }} />
            </Box>
          )}
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={open}
            >
              Cập nhật bài hát
            </Button>
          </Box>
          {songStatus === "loading" && (
            <Box mt={2} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {songError && (
            <Box mt={2}>
              <Alert severity="error">{songError}</Alert>
            </Box>
          )}
        </form>
      </Container>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          {open && <CircularProgress />}
          {songStatus === "failed" && (
            <Alert severity="error" onClose={() => setOpen(false)}>
              {songError}
            </Alert>
          )}
        </Box>
      </Modal>
    </Main>
  );
}

export default EditSong;
