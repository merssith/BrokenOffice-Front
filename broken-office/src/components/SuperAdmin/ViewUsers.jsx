import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/styles.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewUsers = () => {
  const initialStatePagination = {
    totalPages: null,
    currentPage: 1,
  };

  const [users, setUsers] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [filterValue, setFilterValue] = useState(0);

  const navigate = useNavigate();
  const [pagination, setPagination] = useState(initialStatePagination);
  const user = useSelector((state) => state.user);
  const darkMode = useSelector((state) => state.theme);

  useEffect(() => {
    if (filterValue === 0) {
      axios
        .get(`/api/users/all?page=${pagination.currentPage}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          setUsers(response.data.users);
          setPagination({
            ...pagination,
            totalPages: response.data.totalPages,
          });
        })
        .catch("");
    } else {
      axios
        .get(
          `http://localhost:3001/api/users/filter?role=${filterValue}&page=${pagination.currentPage}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          setUsers(response.data.users);
          setPagination({
            ...pagination,
            totalPages: response.data.totalPages,
          });
        })
        .catch("");
    }
  }, [user, filterValue, pagination.currentPage]);

  const handleManage = (id) => {
    navigate(`/users/${id}`);
  };
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handlePagination = (e, value) => {
    setPagination({ ...pagination, currentPage: value });
  };

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
        <Grid>
          <Typography mt="10px" mb="30px" align="center" variant="h5">
            ALL USERS
          </Typography>
        </Grid>

        <TableContainer sx={{ width: "100%", height: "530px" }}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ width: "15%", textAlign: "center", fontSize: 14 }}
                >
                  <Typography>{<strong>User ID</strong>}</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 14 }}>
                  <Typography>{<strong> Name </strong>}</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: 14 }}>
                  <Typography>
                    {
                      <Dropdown isOpen={dropdown} toggle={handleDropdown}>
                        <DropdownToggle
                          caret
                          className={
                            darkMode ? "dropdownBtnDarkMode" : "dropdownBtn"
                          }
                        >
                          Role
                        </DropdownToggle>
                        <DropdownMenu
                          className={darkMode ? "dropdownMenuDarkMode" : null}
                        >
                          <DropdownItem
                            className={
                              darkMode
                                ? "dropdownHeaderDarkMode"
                                : "dropdown-header"
                            }
                            header
                          >
                            Filter by Role
                          </DropdownItem>
                          <DropdownItem diviver />
                          <DropdownItem
                            className={
                              darkMode
                                ? "dropdownItemDarkMode"
                                : "dropdown-item"
                            }
                            onClick={() => setFilterValue(0)}
                          >
                            All users
                          </DropdownItem>
                          <DropdownItem
                            className={
                              darkMode
                                ? "dropdownItemDarkMode"
                                : "dropdown-item"
                            }
                            onClick={() => setFilterValue(3)}
                          >
                            User
                          </DropdownItem>
                          <DropdownItem
                            className={
                              darkMode
                                ? "dropdownItemDarkMode"
                                : "dropdown-item"
                            }
                            onClick={() => setFilterValue(2)}
                          >
                            Admin
                          </DropdownItem>
                          <DropdownItem
                            className={
                              darkMode
                                ? "dropdownItemDarkMode"
                                : "dropdown-item"
                            }
                            onClick={() => setFilterValue(1)}
                          >
                            Super Admin
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    }
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, i) => (
                <TableRow onClick={() => handleManage(user.id)} key={i}>
                  <TableCell sx={{ textAlign: "center", fontSize: 14 }}>
                    {user.id}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 14 }}>
                    {user.fullName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 14 }}>
                    {user.userRole.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Pagination
        count={pagination.totalPages || 0}
        page={pagination.currentPage}
        onChange={handlePagination}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
        }}
      />
      <Grid sx={{ mb: "100px" }} />
    </>
  );
};

export default ViewUsers;
