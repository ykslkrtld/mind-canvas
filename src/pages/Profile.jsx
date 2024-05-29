import React, { useEffect } from "react";
import useBlogCalls from "../services/useBlogCalls";
import { useSelector } from "react-redux";
import { Box, CardMedia, Typography } from "@mui/material";

const Profile = () => {
  const { getUseCat } = useBlogCalls();
  const { users } = useSelector((state) => state.getBlog);
  console.log(users);

  useEffect(() => {
    getUseCat("users");
  }, []);

  return (
    <>
    <Box
      sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        border:"2px solid red",
        margin:"auto",
        marginTop:"3rem",
        textAlign: "center",
        width: 350,
      }}
    >
      <CardMedia
        component="img"
        image={users[0]?.image}
        alt="Paella dish"
        sx={{
          marginBottom: "1rem",
          width: "350px",
          height: "350px",
          borderRadius: "100%",
        }}
      />
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
      >
        First Name:{" "}
        <Typography fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>
          {users[0]?.firstName}
        </Typography>{" "}
      </Typography>
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
      >
        Last Name:{" "}
        <Typography fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{users[0]?.lastName}</Typography>{" "}
      </Typography>
      {users[0]?.bio && (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1.3rem"}
        >
          Bio: <Typography fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{users[0].bio}</Typography>{" "}
        </Typography>
      )}
      {users[0]?.city && (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1.3rem"}
        >
          City: <Typography fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{users[0].city}</Typography>{" "}
        </Typography>
      )}
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
      >
        Email: <Typography fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{users[0]?.email}</Typography>{" "}
      </Typography>
    </Box>
    <div style={{ paddingBottom: '100px' }}></div>
    </>
  );
};

export default Profile;
