import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/dashboard/Dashboard";
import Item from "../../components/ui/item/Item";
import MixedChart from "../../components/ui/mixedChart/MixedChart";
import TitleBar from "../../components/ui/titleBar/TitleBar";
import Topbar from "../../components/ui/topbar/Topbar";
import { svgIcon } from "../../data/dashSource";
import { fetchAlbums, fetchTopAlbums } from "../../redux/albumsSlice";
import { fetchArtists, fetchTopArtists } from "../../redux/artistsSlice";
import { fetchSongs, fetchTopSongs } from "../../redux/songsSlice";
import Main from "../../utils/main/Main";
import "./course.scss";

function Course() {
  const { topAlbums, albums } = useSelector((state) => state.albums);
  const { topArtists, artists } = useSelector((state) => state.artists);
  const { topSongs, songs } = useSelector((state) => state.songs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopAlbums());
    dispatch(fetchTopArtists());
    dispatch(fetchTopSongs());
    dispatch(fetchAlbums());
    dispatch(fetchSongs());
    dispatch(fetchArtists());
  }, [dispatch]);

  const albumData = {
    series: [
      {
        name: "Total Plays",
        data: topAlbums.map((album) => album.totalPlays), // Dữ liệu cho tổng số lượt phát
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      colors: ["#5A66F1"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: 7,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1],
      },
      xaxis: {
        categories: topAlbums.map((album) => album.name_album), // Tên album làm nhãn cho trục X
      },
      yaxis: [
        {
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: false,
          position: "topLeft",
        },
      },
      legend: {
        horizontalAlign: "center",
        position: "top",
        fontSize: "12px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 600,
      },
    },
    height: 400,
  };
  const songData = {
    series: [
      {
        name: "View",
        data: topSongs.map((song) => song.view), // Dữ liệu cho số lượt xem
      },
      {
        name: "Favorite",
        data: topSongs.map((song) => song.favorite), // Dữ liệu cho số lượt yêu thích
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      colors: ["#5A66F1", "#CBD5E1"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: 7,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      xaxis: {
        categories: topSongs.map((song) => song.name_music), // Tên các bài hát
      },
      yaxis: [
        {
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: false,
          position: "topLeft",
        },
      },
      legend: {
        horizontalAlign: "center",
        position: "top",
        fontSize: "12px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 600,
      },
    },
    height: 400,
  };

  const artistData = {
    series: [
      {
        name: "Total Plays",
        data: topArtists.map((artist) => artist.totalPlays), // Dữ liệu cho tổng số lượt phát
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      colors: ["#5A66F1"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: 7,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1],
      },
      xaxis: {
        categories: topArtists.map((artist) => artist.name_artist), // Tên nghệ sĩ làm nhãn cho trục X
      },
      yaxis: [
        {
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: false,
          position: "topLeft",
        },
      },
      legend: {
        horizontalAlign: "center",
        position: "top",
        fontSize: "12px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 600,
      },
    },
    height: 400,
  };
  return (
    <Main containerName="course">
      <TitleBar text="Thống kê" />
      <Dashboard>
        <Item
          title="Tổng bài hát"
          amount={songs.length}
          MySvg={svgIcon.one}
          BadgeIcon={TrendingUpIcon}
        />
        <Item
          title="Tổng nghệ sĩ"
          amount={artists.length}
          MySvg={svgIcon.two}
          BadgeIcon={TrendingUpIcon}
        />
        <Item
          title="Tổng album"
          amount={albums.length}
          MySvg={svgIcon.three}
          BadgeIcon={TrendingDownIcon}
        />
        <Item
          title="Tổng người nghe"
          amount="$35,262"
          MySvg={svgIcon.four}
          BadgeIcon={TrendingUpIcon}
          badge="1.4%"
        />
      </Dashboard>
      <div className="center">
        <section className="statistics">
          <Topbar title={"Danh sách nhạc phổ biến"} />
          <MixedChart data={songData} />
        </section>
        <section className="statistics">
          <Topbar title={"Danh sách nghệ sĩ phổ biến"} />
          <MixedChart data={artistData} />
        </section>
      </div>
      <div className="center">
        <section className="statistics">
          <Topbar title={"Danh sách album phổ biến"} />
          <div className="statisticsContainer">
            <MixedChart data={albumData} />
          </div>
        </section>
      </div>
    </Main>
  );
}

export default Course;
