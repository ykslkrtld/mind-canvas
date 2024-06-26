import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useAuthCalls from "../services/useAuthCalls";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toastSuccessNotify } from "../helper/ToastNotify";


const Login = () => {
  const { login } = useAuthCalls();
  let loginSchema = object({
    email: string()
      .email("Please enter a valid email")
      .required("Email is required"), // required veya email içi doldurularak hata mesajı değiştirilebilir
    password: string()
      .required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d+/, "Password must contain at least one number")
      // .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain one of @$!%*?&")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be at most 15 characters"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const {user} = useSelector(state => state.auth)

  const copyEmail = () => {
    navigator.clipboard.writeText("test@test.com")
    toastSuccessNotify("Email copied!");
  }

  const copyPassword = () => {
    navigator.clipboard.writeText("Test123?")
    toastSuccessNotify("Password copied!");
  }

  return user.username ? <Navigate to="/"/> : 
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
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
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values);
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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="body2">
                    <ContentCopyIcon
                      onClick={copyEmail}
                      style={{ cursor: "pointer" }}
                    />
                    test@test.com
                  </Typography>
                  <TextField
                    label="Email"
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
                  <Typography
                      
                      variant="body2"
                    >
                      <ContentCopyIcon onClick={copyPassword}
                      style={{ cursor: "pointer" }}/>
                      Test123?
                    </Typography>
                  <TextField
                    label="Password"
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
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
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
              Don't have an account?{" "}
              <NavLink
                to="/register"
                color="secondary"
                style={{
                  textDecoration: "none",
                  fontWeight: "600"
                }}
              >
                Sign Up
              </NavLink>
            </p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  
};

export default Login;
