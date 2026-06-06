import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Button, Divider } from "@mui/material";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://t4phzp-8080.csb.app/user/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Lỗi lấy thông tin:", err));
  }, [userId]);

  if (!user)
    return (
      <Typography sx={{ padding: "20px", fontStyle: "italic", color: "gray" }}>
        Đang tải thông tin...
      </Typography>
    );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        {user.firstName || user.first_name} {user.lastName || user.last_name}
      </Typography>

      <Divider sx={{ marginBottom: "20px" }} />
      <Typography
        variant="body1"
        sx={{ marginBottom: "12px", fontSize: "1.1rem" }}
      >
        <strong>Vị trí:</strong> {user.location || "Chưa cập nhật"}
      </Typography>

      <Typography
        variant="body1"
        sx={{ marginBottom: "12px", fontSize: "1.1rem" }}
      >
        <strong>Nghề nghiệp:</strong> {user.occupation || "Chưa cập nhật"}
      </Typography>

      <Typography
        variant="body1"
        sx={{ marginBottom: "24px", fontSize: "1.1rem" }}
      >
        <strong>Mô tả:</strong> {user.description || "Chưa cập nhật"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${user._id}`}
        sx={{
          textTransform: "none",
          fontSize: "1rem",
          padding: "8px 20px",
        }}
      >
        Xem ảnh của user này
      </Button>
    </Box>
  );
}

export default UserDetail;
