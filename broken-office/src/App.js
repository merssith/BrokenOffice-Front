import { Box } from "@mui/material";
import { Route, Routes, useLocation } from "react-router";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import HomeAdmin from "./containers/HomeAdmin";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NewTicket from "./components/NewTicket";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/users";

import UserTicketHistory from "./containers/UserTicketHistory";

import Profile from "./components/Profile";
import SingleTicket from "./components/SingleTicket";
import { setAvatar } from "./store/avatar";
import userEvent from "@testing-library/user-event";
import Photo from "./containers/Photo";

function App() {
  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.avatar);
  const location = useLocation();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios.get("/api/users/me").then((usuario) => {
      dispatch(setUser(usuario.data));
    });
  }, []);
  // console.log("LOCATION", location);
  return (
    <Box display="flex" flexDirection="column">
      <NavBar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createsuccess" element={<></>} />

        {/* User logged routes*/}
        <Route path="/" element={<></>} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/profile/edit" element={<></>} />
        <Route path="/ticket/create" element={<NewTicket />} />
        <Route path="/ticket/history" element={<UserTicketHistory />} />
        <Route path="/ticket/:id" element={<SingleTicket />} />
        <Route path="/photo" element={<Photo />} />

        {/* Admin routes*/}
        <Route path="/admin/*" element={<HomeAdmin />} />
      </Routes>
      {/* {path === "/" || "/login" || "/register" ? null : <BottomNav />} */}
      {location.pathname === "/" || !user.email ? null : <BottomNav />}
      {/* <Footer /> */}
    </Box>
  );
}

export default App;
