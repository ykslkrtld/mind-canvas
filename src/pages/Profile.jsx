import { useSelector } from "react-redux";
import { Box, CardMedia, Typography } from "@mui/material";
import UpdateProfileModal from "../components/blog/UpdateProfileModal";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
    <Box
      sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        margin:"auto",
        marginTop:"3rem",
        textAlign: "center",
        width: 350,
      }}
    >
      <CardMedia
        component="img"
        image={user?.image}
        alt="image"
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
        First Name:
        <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>
          {user?.firstName}
        </Typography>
      </Typography>
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
      >
        Last Name: <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{user?.lastName}</Typography>{" "}
      </Typography>
      {user?.bio && (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1.3rem"}
        >
          Bio: <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{user.bio}</Typography>{" "}
        </Typography>
      )}
      {user?.city && (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1.3rem"}
        >
          City: <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{user.city}</Typography>{" "}
        </Typography>
      )}
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
      >
        Email: <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{user?.email}</Typography>{" "}
      </Typography>
      {/* <UpdateProfileModal/> */}
    </Box>
    <div style={{ paddingBottom: '100px' }}></div>
    </>
  );
};

export default Profile;
