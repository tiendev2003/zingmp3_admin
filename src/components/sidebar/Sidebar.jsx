import AlbumIcon from "@mui/icons-material/Album";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import "./sidebar.scss";
function Sidebar() {
  const { sidebarActive, setSidebarActive } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Thêm sự kiện để phát hiện click bên ngoài sidebar
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarActive(false);
      }
    };

    // Thêm sự kiện
    document.addEventListener("mousedown", handleClickOutside);

    // Gỡ bỏ sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Đính kèm sự kiện khi thay đổi kích thước cửa sổ
    window.addEventListener("resize", handleResize);
    // Gỡ bỏ sự kiện khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth > 768 ? (
        <DeskSidebar sidebarActive={sidebarActive} />
      ) : (
        <MobSidebar sidebarActive={sidebarActive} sideRef={sidebarRef} />
      )}
    </>
  );
}

export default Sidebar;

function DeskSidebar() {
  const { sidebarActive, setSidebarActive } = useContext(SidebarContext);
  const [isHover, setIsHover] = useState(false);

  return (
    <aside
      className={sidebarActive ? "deskSidebar" : "deskSidebar active"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="logo-image">
        {sidebarActive || isHover ? (
          <img
            src={
              "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
            }
            height="120"
            width={"120"}
            alt="Logo"
          />
        ) : (
          <img
            src={
              "https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.24/static/media/icon_zing_mp3_60.f6b51045.svg"
            }
            alt="Logo"
          />
        )}
      </div>
      <div className="content">
        <div className="top">
          <p>Bảng điều khiển</p>
        </div>
        <ul className="links-list">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>
              <HomeOutlinedIcon />
              <span>Thống kê</span>
            </li>
          </NavLink>

          <DropdownMenu
            title="Album"
            icon={<AlbumIcon />}
            items={[
              { to: "/albums", label: "Album" },
              { to: "/albums/add", label: "Thêm Album" },
            ]}
          />
          <DropdownMenu
            title="Bài hát"
            icon={<MusicNoteIcon />}
            items={[
              { to: "/songs", label: "Bài hát" },
              { to: "/songs/add", label: "Thêm Bài hát" },
            ]}
          />
          <DropdownMenu
            title="Nghệ sĩ"
            icon={<PersonIcon />}
            items={[
              { to: "/artists", label: "Nghệ sĩ" },
              { to: "/artists/add", label: "Thêm Nghệ sĩ" },
            ]}
          />

          <DropdownMenu
            title="Quyền người dùng"
            icon={<SecurityIcon />}
            items={[
              { to: "/user-roles", label: "Quyền người dùng" },
              { to: "/user-roles/add", label: "Thêm Quyền người dùng" },
            ]}
          />
          <NavLink
            to={"/user-accounts"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>
              <ManageAccountsOutlinedIcon />
              <span>Tài khoản người dùng</span>
            </li>
          </NavLink>
          <NavLink
            to={"/user-profile"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>
              <ManageAccountsOutlinedIcon />
              <span>Thông tin cá nhân</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </aside>
  );
}

function MobSidebar({ sidebarActive, sideRef }) {
  return (
    <aside
      className={sidebarActive ? "mobSidebar sideActive" : "mobSidebar"}
      ref={sideRef}
    >
      <div className="content">
        <div className="top">
          <p>Bảng điều khiển</p>
        </div>
        <ul className="links-list">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>
              <HomeOutlinedIcon />
              <span>Thống kê</span>
            </li>
          </NavLink>

          <DropdownMenu
            title="Album"
            icon={<AlbumIcon />}
            items={[
              { to: "/albums", label: "Album" },
              { to: "/albums/add", label: "Thêm Album" },
            ]}
          />
          <DropdownMenu
            title="Bài hát"
            icon={<MusicNoteIcon />}
            items={[
              { to: "/songs", label: "Bài hát" },
              { to: "/songs/add", label: "Thêm Bài hát" },
            ]}
          />
          <DropdownMenu
            title="Nghệ sĩ"
            icon={<PersonIcon />}
            items={[
              { to: "/artists", label: "Nghệ sĩ" },
              { to: "/artists/add", label: "Thêm Nghệ sĩ" },
            ]}
          />

          <DropdownMenu
            title="Quyền người dùng"
            icon={<SecurityIcon />}
            items={[
              { to: "/user-roles", label: "Quyền người dùng" },
              { to: "/user-roles/add", label: "Thêm Quyền người dùng" },
            ]}
          />
          <NavLink
            to={"/user-accounts"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>
              <ManageAccountsOutlinedIcon />
              <span>Tài khoản người dùng</span>
            </li>
          </NavLink>
          <NavLink
            to={"/user-profile"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>
              <ManageAccountsOutlinedIcon />
              <span>Thông tin cá nhân</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </aside>
  );
}

function DropdownMenu({ title, icon, items }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <li
        onClick={() => setDropdownOpen(!dropdownOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "4px" }}>
          <div
            style={{
              marginTop: "1px",
            }}
          >
            {icon}
          </div>
          <span>{title}</span>
        </div>

        <ExpandMoreIcon
          style={{
            marginLeft: "auto", // Đảm bảo icon luôn nằm bên phải
          }}
        />
      </li>

      {dropdownOpen && (
        <ul
          className="dropdown"
          style={{
            marginLeft: "10px",
          }}
        >
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <li>
                <HorizontalRuleIcon />
                <span>{item.label}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      )}
    </>
  );
}
