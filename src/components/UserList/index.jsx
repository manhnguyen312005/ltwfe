import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://t4phzp-8080.csb.app/user/list")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error("Lỗi lấy danh sách user:", err));
  }, []);

  return (
    <Box>
      <Typography variant="h6" sx={{ padding: "16px", fontWeight: "bold" }}>
        Danh sách User
      </Typography>
      <Divider />

      <List component="nav">
        {users.length > 0 ? (
          users.map((user) => (
            <React.Fragment key={user._id}>
              <ListItemButton component={Link} to={`/users/${user._id}`}>
                <ListItemText
                  primary={`${user.firstName || user.first_name} ${
                    user.lastName || user.last_name
                  }`}
                  sx={{ color: "#1976d2" }}
                />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography
            sx={{ padding: "16px", color: "gray", fontStyle: "italic" }}
          >
            Đang tải dữ liệu...
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default UserList;
