import React, { useEffect } from "react";
import useBlogCalls from "../services/useBlogCalls";
import { useSelector } from "react-redux";
import { Box, CardMedia, Typography } from "@mui/material";

const Profile = () => {
  const { getUsers } = useBlogCalls();
  const { users } = useSelector((state) => state.getBlog);
  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: 350,
      }}
    >
      <CardMedia
        component="img"
        image={users[0]?.image}
        alt="Paella dish"
        sx={{ marginBottom: "1rem", width: "350px", height:"350px", borderRadius:"100%" }}
      />
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
        fontWeight={"600"}
      >
        First Name: <Typography fontSize={"1.3rem"}>{users[0]?.firstName}</Typography>{" "}
      </Typography>
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
        fontWeight={"600"}
      >
        Last Name:{" "}
        <Typography fontSize={"1.3rem"}>{users[0]?.lastName}</Typography>{" "}
      </Typography>
      {users[0]?.bio && (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1.3rem"}
          fontWeight={"600"}
        >
          Bio: <Typography fontSize={"1.3rem"}>{users[0].bio}</Typography>{" "}
        </Typography>
      )}
      {users[0]?.city && (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1.3rem"}
          fontWeight={"600"}
        >
          City: <Typography fontSize={"1.3rem"}>{users[0].city}</Typography>{" "}
        </Typography>
      )}
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
        fontWeight={"600"}
      >
        Email: <Typography fontSize={"1.3rem"}>{users[0]?.email}</Typography>{" "}
      </Typography>
    </Box>
  );
};

export default Profile;
