import { useSelector } from "react-redux";
import { Box, CardMedia, Typography } from "@mui/material";
import UpdateProfileModal from "../components/blog/UpdateProfileModal";
import useBlogCalls from "../services/useBlogCalls";
import { useEffect } from "react";

const Profile = () => {
  const {user} = useSelector(state => state.auth)
  const { singleUser } = useSelector((state) => state.getBlog);
  const { getSingleUser } = useBlogCalls();


  useEffect(() => {
    if (user?.userId) {
      getSingleUser(user?.userId);
    }
  }, [user?.userId]);

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
        image={singleUser?.image}
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
          {singleUser?.firstName}
        </Typography>
      </Typography>
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
      >
        Last Name: <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{singleUser?.lastName}</Typography>{" "}
      </Typography>
      {singleUser?.bio && (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1.3rem"}
        >
          Bio: <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{singleUser.bio}</Typography>{" "}
        </Typography>
      )}
      {singleUser?.city && (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1.3rem"}
        >
          City: <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{singleUser.city}</Typography>{" "}
        </Typography>
      )}
      <Typography
        display={"flex"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1.3rem"}
      >
        Email: <Typography component="span" fontSize={"1.3rem"} color={"secondary"} fontWeight={"600"}>{singleUser?.email}</Typography>{" "}
      </Typography>
      <UpdateProfileModal/>
    </Box>
    <div style={{ paddingBottom: '100px' }}></div>
    </>
  );
};

export default Profile;
