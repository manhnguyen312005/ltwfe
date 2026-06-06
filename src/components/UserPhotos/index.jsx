import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Box,
} from "@mui/material";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    axios
      .get(`https://t4phzp-8080.csb.app/photosOfUser/${userId}`)
      .then((response) => setPhotos(response.data))
      .catch((err) => console.error("Lỗi tải ảnh:", err));
  }, [userId]);

  if (!photos)
    return (
      <Typography sx={{ padding: "20px" }}>Đang tải thư viện ảnh...</Typography>
    );
  if (photos.length === 0)
    return <Typography sx={{ padding: "20px" }}>Chưa có ảnh nào.</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "20px",
      }}
    >
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ maxWidth: 800, boxShadow: 3 }}>
          <CardMedia
            component="img"
            image={`https://t4phzp-8080.csb.app/images/${photo.file_name}`}
            alt="User upload"
            sx={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
            }}
          />

          <CardContent>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              gutterBottom
            >
              Đăng lúc: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Typography
              variant="h6"
              sx={{ marginTop: "16px", marginBottom: "8px" }}
            >
              Bình luận:
            </Typography>
            <Divider sx={{ marginBottom: "16px" }} />

            {photo.comments &&
              photo.comments.map((comment) => (
                <Box key={comment._id} sx={{ marginBottom: "16px" }}>
                  <Typography variant="body2" sx={{ marginBottom: "4px" }}>
                    <Link
                      to={`/users/${comment.user._id}`}
                      style={{
                        fontWeight: "bold",
                        color: "#1976d2",
                        textDecoration: "none",
                      }}
                    >
                      {comment.user.firstName || comment.user.first_name}{" "}
                      {comment.user.lastName || comment.user.last_name}
                    </Link>
                    <span
                      style={{
                        color: "gray",
                        fontSize: "0.85em",
                        marginLeft: "8px",
                      }}
                    >
                      ({new Date(comment.date_time).toLocaleString()})
                    </span>
                  </Typography>

                  <Typography variant="body1">{comment.comment}</Typography>
                </Box>
              ))}

            {(!photo.comments || photo.comments.length === 0) && (
              <Typography
                variant="body2"
                color="text.secondary"
                fontStyle="italic"
              >
                Chưa có bình luận nào.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
