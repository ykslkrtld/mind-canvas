import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import { object, string } from "yup";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuthCalls from "../services/useAuthCalls";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"


const Register = () => {
  const { register } = useAuthCalls();
  let registerSchema = object({
    username: string()
      .required("Username is required"),
    firstName: string()
      .required("FirstName is required"),
    lastName: string()
      .required("LastName is required"),
    email: string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d+/, "Password must contain at least one number")
      // .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain one of @$!%*?&")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be at most 15 characters"),
    image: string().url("Please enter a valid url"),
    bio: string(),
    city: string(),
  });

  const [showPassword, setShowPassword] = useState(false);
  const {user} = useSelector(state => state.auth)

  return user.username ? <Navigate to="/"/> : 
  <Container maxWidth="lg" >
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} sm={10} md={6}>
          <Grid item xs={12}>
            <Typography variant="h3" color="secondary" align="center" my={5}>
              MindCanvas
            </Typography>
          </Grid>
          <Avatar
            sx={{
              backgroundColor: "#9C27B0",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography variant="h4" align="center" mb={4} color="secondary">
            Register
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
              firstName: "",
              lastName: "",
              image: "",
              bio: "",
              city: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register(values);
              actions.resetForm();
              actions.setSubmitting(false); // isSubmitting
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <TextField
                    label="User Name *"
                    name="username"
                    id="username"
                    type="text"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />

                  <TextField
                    label="First Name *"
                    name="firstName"
                    id="firstName"
                    type="text"
                    variant="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    label="Last Name *"
                    name="lastName"
                    id="lastName"
                    type="text"
                    variant="outlined"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                  <TextField
                    label="Email *"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Image"
                    name="image"
                    id="image"
                    type="url"
                    variant="outlined"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.image && Boolean(errors.image)}
                    helperText={touched.image && errors.image}
                  />
                  <TextField
                    label="Bio"
                    name="bio"
                    id="bio"
                    type="text"
                    variant="outlined"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bio && Boolean(errors.bio)}
                    helperText={touched.bio && errors.bio}
                  />
                   <TextField
                    label="City"
                    name="city"
                    id="city"
                    type="text"
                    variant="outlined"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                  />
                  <TextField
                    label="Password *"
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff /> }
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    size="large"
                    color="secondary"
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <p>
              Already have an account?{" "}
              <NavLink
                to="/login"
                color="secondary"
                style={{
                  textDecoration: "none",
                  fontWeight: "600"
                }}
              >
                Sign In
              </NavLink>
            </p>
          </Box>
        </Grid>
      </Grid>
      <div style={{ paddingBottom: '200px' }}></div>
    </Container>
    }
  
export default Register;
