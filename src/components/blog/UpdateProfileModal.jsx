import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import useBlogCalls from "../../services/useBlogCalls";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UpdateProfileModal = () => {
  const [open, setOpen] = useState(false);
  const { patchProfile, getSingleUser } = useBlogCalls();
  const [showPassword, setShowPassword] = useState(false);
  const { singleUser } = useSelector((state) => state.getBlog);
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { username, email, firstName, lastName, image, city, bio } = singleUser;

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
    if (e.target.name === "password") {
      const validationError = validatePassword(e.target.value);
      setPasswordError(validationError);
    }
  };

  const validatePassword = (password) => {
    const passwordRules = [
      { regex: /[a-z]/, message: "Password must contain at least one lowercase letter" },
      { regex: /[A-Z]/, message: "Password must contain at least one uppercase letter" },
      { regex: /\d+/, message: "Password must contain at least one number" },
      { regex: /[@$!%*?&]/, message: "Password must contain one of @$!%*?&" },
      { regex: /.{8,}/, message: "Password must be at least 8 characters" },
      { regex: /^.{0,15}$/, message: "Password must be at most 15 characters" },
    ];

    for (const rule of passwordRules) {
      if (!rule.regex.test(password)) {
        return rule.message;
      }
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordError) {
      return;
    }
    if (passwordAgain !== profileInfo.password) {
      alert("Passwords do not match.");
      return;
    }
    patchProfile(profileInfo, singleUser?._id);
    handleClose();
  };

  const handleOpen = () => {
    getSingleUser(singleUser?._id);
    setOpen(true);
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
    setPasswordAgain("");
    setPasswordError("");
    setOpen(false);
  };

  useEffect(() => {
    if (singleUser) {
      setProfileInfo({
        username: singleUser.username,
        email: singleUser.email,
        firstName: singleUser.firstName,
        lastName: singleUser.lastName,
        image: singleUser.image,
        city: singleUser.city,
        bio: singleUser.bio,
        password: "",
      });
    }
  }, [singleUser]);

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
            error={Boolean(passwordError)}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="passwordAgain"
            name="passwordAgain"
            label="Confirm Password"
            variant="outlined"
            value={passwordAgain}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPasswordAgain(e.target.value)}
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
