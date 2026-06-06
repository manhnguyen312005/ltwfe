import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/");

    if (pathParts.length === 3 && pathParts[1] === "users") {
      fetchModel(`/user/${pathParts[2]}`)
        .then((user) =>
          setContextText(
            `${user.firstName || user.first_name} ${
              user.lastName || user.last_name
            }`
          )
        )
        .catch(() => setContextText(""));
    } else if (pathParts.length === 3 && pathParts[1] === "photos") {
      fetchModel(`/user/${pathParts[2]}`)
        .then((user) =>
          setContextText(
            `Photos of ${user.firstName || user.first_name} ${
              user.lastName || user.last_name
            }`
          )
        )
        .catch(() => setContextText(""));
    } else {
      setContextText("");
    }
  }, [location]);

  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit" sx={{ fontWeight: "bold" }}>
          Nguyễn Đức Mạnh
        </Typography>

        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
