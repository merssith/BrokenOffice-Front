import {
  Grid,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const UserTicketHistory = () => {
  const [pagNum, setPagNum] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  ////////////////
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/incidents/byUser/${user.id}`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch("");
  }, [user.id]);
  /////////////////
  useEffect(() => {
    setQuantity(tickets.length / 3);
  }, [tickets]);

  const handleMoreInfo = (id) => {
    navigate(`/ticket/${id}`);
  };
  const handlePagination = (e, p) => {
    setPagNum(p);
  };

  const handleShowContent = () => {
    return tickets.slice();
  };

  // console.log("QUANTITY", quantity);

  // console.log(tickets);
  return (
    <>
      <Grid
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "30px",
          margin: "auto",
        }}
      >
        <Grid>
          <Typography mt="10px" mb="30px" align="center" variant="h5">
            Ticket History
          </Typography>
        </Grid>

        <TableContainer sx={{ width: "100%" }} component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ width: "20%", textAlign: "center", fontSize: 12 }}
                >
                  <Typography>{<strong>Date</strong>}</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    width: "50%",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  <Typography>{<strong>Subject</strong>}</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 12 }}>
                  <Typography>{<strong>Status</strong>}</Typography>
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", fontSize: 12 }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket, i) => (
                <TableRow
                  onClick={() => handleMoreInfo(ticket.id)}
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell sx={{ fontSize: 12 }}>{ticket.id}</TableCell> */}
                  <TableCell sx={{ textAlign: "center", fontSize: 12 }}>
                    {ticket.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: 12,
                      wordWrap: "break-word",
                    }}
                  >
                    {ticket.subject}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 12 }}>
                    {ticket.status}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "right",
                    }}
                  ></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack sx={{ width: "22rem", marginTop: "2rem" }}>
          <Pagination
            count={quantity}
            color="primary"
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default UserTicketHistory;
