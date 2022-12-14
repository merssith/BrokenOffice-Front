import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import globant from "../utils/globant.png";
import globantDark from "../utils/globantWhite.png";
import "../styles/global.css";
import useGeolocation from "../hooks/useGeolocation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/users";

const ButtonGeneric = {
  margin: "2rem",
  color: "#444444",
  width: "8rem",
  boxShadow: 4,
  transform: "scale(1.3)",
  backgroundColor: "#BFD732",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#BFD732",
  },
  "&:active": {
    color: "white",
  },
};
const rol = ""; // "admin" - "superadmin"

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const { location, place } = useGeolocation();

  useEffect(() => {
    axios
      .put(`/api/users/update/${user.id}`, {
        geoCords: {
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        },
        place: place,
      })
      .then((res) => dispatch(setUser(res.data)));
  }, [place]);

  return (
    <>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "30px",
          margin: "auto",
        }}
      >
        <Typography mt="10px" mb="30px" align="center" variant="h5">
          Welcome, <strong>{user.name}</strong>
        </Typography>
        {!theme ? (
          <img style={{ width: "75%", maxWidth: "400px" }} src={globant} alt='globant'/>
        ) : (
          <img style={{ width: "75%", maxWidth: "400px" }} src={globantDark} alt='globant'/>
        )}
        <Button
          sx={ButtonGeneric}
          type="submit"
          color="primary"
          variant="contained"
        >
          <Link
            style={{ color: "#444444", textDecoration: "none" }}
            to="/ticket/create"
          >
            New Ticket
          </Link>
        </Button>
        <Button
          sx={ButtonGeneric}
          type="submit"
          color="primary"
          variant="contained"
        >
          <Link
            style={{ color: "#444444", textDecoration: "none" }}
            to="/ticket/history"
          >
            My Tickets
          </Link>
        </Button>
        <Button
          sx={ButtonGeneric}
          type="submit"
          color="primary"
          variant="contained"
        >
          <Link
            style={{ color: "#444444", textDecoration: "none" }}
            to="/user/profile"
          >
            Profile
          </Link>
        </Button>
        {(user.userRoleId === 1) | (rol === "superadmin") ? (
          <>
            <Button
              sx={ButtonGeneric}
              type="submit"
              color="primary"
              variant="contained"
            >
              <Link
                style={{ color: "#444444", textDecoration: "none" }}
                to="/tickets/all"
              >
                ALL TICKETS
              </Link>
            </Button>

            <Button
              sx={ButtonGeneric}
              type="submit"
              color="primary"
              variant="contained"
            >
              <Link
                style={{ color: "#444444", textDecoration: "none" }}
                to="/users/all"
              >
                ALL USERS
              </Link>
            </Button>
          </>
        ) : null}
        {(user.userRoleId === 2) | (rol === "admin") ? (
          <>
            <Button
              sx={ButtonGeneric}
              type="submit"
              color="primary"
              variant="contained"
            >
              <Link
                style={{ color: "#444444", textDecoration: "none" }}
                to="/tickets"
              >
                ASSIGNED TICKETS
              </Link>
            </Button>
          </>
        ) : null}
      </Grid>
      <Outlet />
      <Grid sx={{ mb: "100px" }} />
    </>
  );
};
export default Home;
