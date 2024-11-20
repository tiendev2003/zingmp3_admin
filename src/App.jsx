import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext"; // Import AuthContext
import { SidebarContext } from "./context/SidebarContext";
import AddAlbum from "./pages/albums/AddAlbum";
import Albums from "./pages/albums/Albums";
import EditAlbum from "./pages/albums/EditAlbum";
import AddArtist from "./pages/artists/AddArtist";
import Artists from "./pages/artists/Artists";
import EditArtist from "./pages/artists/EditArtist";
import Course from "./pages/course/Course";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";

import AddSong from "./pages/songs/AddSong";
import EditSong from "./pages/songs/EditSong";
import Songs from "./pages/songs/Songs";
import Stocks from "./pages/stocks/Stocks";
import UserAccounts from "./pages/userAccounts/UserAccounts";
import UserProfile from "./pages/userProfile/UserProfile";
import AddUserRole from "./pages/userRoles/AddUserRole";
import EditUserRole from "./pages/userRoles/EditUserRole";
import UserRoles from "./pages/userRoles/UserRoles";

function App() {
  const { sidebarActive } = useContext(SidebarContext);
  const { isAuthenticated, userRole, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={sidebarActive ? "app" : "app active"}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Course />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          {isAuthenticated ? (
            userRole === "admin" ? (
              <>
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/songs" element={<Songs />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/user-accounts" element={<UserAccounts />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/albums/add" element={<AddAlbum />} />
                <Route path="/albums/edit/:id" element={<EditAlbum />} />
                <Route path="/songs/add" element={<AddSong />} />
                <Route path="/songs/edit/:id" element={<EditSong />} />
                <Route path="/artists/add" element={<AddArtist />} />
                <Route path="/artists/edit/:id" element={<EditArtist />} />

                <Route path="/user-roles" element={<UserRoles />} />
                <Route path="/user-roles/add" element={<AddUserRole />} />
                <Route path="/user-roles/edit/:id" element={<EditUserRole />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
