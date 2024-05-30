import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import useBlogCalls from "../../services/useBlogCalls";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuthCalls from "../../services/useAuthCalls";

const UpdateProfileModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { user } = useSelector((state) => state.auth);
  const { patchProfile } = useBlogCalls();
  const { login } = useAuthCalls();
  const [showPassword, setShowPassword] = useState(false);
  
  const { username, email, firstName, lastName, image, city, bio } = user;

  const [profileInfo, setProfileInfo] = useState({
    username,
    email,
    firstName,
    lastName,
    image,
    city,
    bio,
    password: "",
  });

  const handleChange = (e) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchProfile(profileInfo, user?.userId);
    setOpen(false);
  };

  const handleClose = () => {
    setProfileInfo({
      username,
      email,
      firstName,
      lastName,
      image,
      city,
      bio,
      password: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleOpen}
      >
        EDIT PROFILE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 360,
            bgcolor: "background.paper",
            borderRadius: "2rem",
            boxShadow: 24,
            p: 4,
          }}
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap="1rem"
        >
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            value={profileInfo.username}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            value={profileInfo.password}
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={profileInfo.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            value={profileInfo.firstName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            value={profileInfo.lastName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            id="image"
            name="image"
            label="Image URL"
            variant="outlined"
            value={profileInfo.image}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="city"
            name="city"
            label="City"
            variant="outlined"
            value={profileInfo.city}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="bio"
            name="bio"
            label="Bio"
            variant="outlined"
            value={profileInfo.bio}
            onChange={handleChange}
            fullWidth
          />
          <Button fullWidth variant="contained" type="submit" color="secondary">
            UPDATE PROFILE
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateProfileModal;
