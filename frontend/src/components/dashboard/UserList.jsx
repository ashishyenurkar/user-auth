import React, { useState, useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
  Select, MenuItem, FormControl, InputLabel, TextField, Box 
} from "@mui/material";
import AddUser from "./AddUser";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState(""); // Search by name
  const [userType, setUserType] = useState(""); // Filter by type

  // Fetch users from API with search & filter
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/user-list?page=${page + 1}&limit=${rowsPerPage}&search=${search}&type=${userType}`,
        { withCredentials: true }
      );
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, search, userType]);

  // Handle pagination change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <AddUser onUserAdded={fetchUsers} />

      {/* Search and Filter Inputs */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
        
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
              setPage(0);
            }}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="child">Child</MenuItem>
            <MenuItem value="mother">Mother</MenuItem>
            <MenuItem value="father">Father</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Created At</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default UserList;
