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

const Login = () => {
  const { login } = useAuthCalls();
  let loginSchema = object({
    email: string()
      .email("Geçerli bir mail giriniz")
      .required("Email zorunludur"), // required veya email içi doldurularak hata mesajı değiştirilebilir
    password: string()
      .required("Şifre zorunludur")
      .matches(/[a-z]/, "Şifre en az 1 küçük harf içermelidir")
      .matches(/[A-Z]/, "Şifre en az 1 büyük harf içermelidir")
      .matches(/\d+/, "Şifre en az 1 rakam içermelidir")
      // .matches(/[0-9]/, "Şifre en az 1 rakam içermelidir")
      .matches(/[@$!%*?&]/, "Şifre @$!%*?& birini içermelidir")
      .min(8, "Şifre en az 8 karakterli olmalıdır")
      .max(15, "Şifre en fazla 15 karakterli olmalıdır"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const {user} = useSelector(state => state.auth)

  return user ? <Navigate to="/"/> : 
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
            <Typography variant="h3" color="darkorange" align="center" my={5}>
              BLOG APP
            </Typography>
          </Grid>
          <Avatar
            sx={{
              backgroundColor: "darkorange",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography variant="h4" align="center" mb={4} color="darkorange">
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: "darkorange",
                      "&:hover": {
                        backgroundColor: "orange",
                      },
                    }}
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
                style={{
                  textDecoration: "none",
                  color: "darkorange",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Sign Up
              </NavLink>
            </p>
          </Box>
        </Grid>

        {/* <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid> */}
      </Grid>
    </Container>
  
};

export default Login;
