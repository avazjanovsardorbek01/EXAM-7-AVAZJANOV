import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
  Paper,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TextField } from "formik-material-ui";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../service";
import { Notification } from "../../utils";
import { signInValidationSchema } from "../../utils/validation";
import nikeIcon from "../../assets/nike.svg";
import GoogleIcon from "../../assets/google.svg";
import FacebookIcon from "../../assets/facebook.svg";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        Notification({
          title: "Sign In Successful",
          type: "success",
        });
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Sign In Error:", error);
      setError("Sign In failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    // Handle Google login action
    // Example: window.location.href = 'your_google_login_url';
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login action
    // Example: window.location.href = 'your_facebook_login_url';
  };

  const handleOpenForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
          >
            <img
              src={nikeIcon}
              alt="Nike Logo"
              style={{ width: 40, marginRight: 10 }}
            />
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "#000", fontWeight: 700 }}
            >
              Login
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  autoComplete="off"
                  InputLabelProps={{
                    style: { color: "#000", fontWeight: 600 },
                  }}
                  aria-describedby="email-error"
                />
                <Field
                  component={TextField}
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  autoComplete="off"
                  aria-describedby="password-error"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography
                  id="password-error"
                  variant="body2"
                  align="right"
                  style={{ cursor: "pointer", color: "#1976d2", marginTop: 10 }}
                  onClick={handleOpenForgotPassword}
                >
                  Forgot your password?
                </Typography>
                {error && (
                  <Typography
                    id="email-error"
                    variant="body2"
                    align="center"
                    style={{ color: "red", marginTop: 10 }}
                  >
                    {error}
                  </Typography>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.rememberMe}
                      onChange={handleChange}
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label="Remember Me"
                  style={{ marginTop: 10 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting || submitting}
                  style={{
                    marginTop: 20,
                    backgroundColor: "#FE8A2F", // Changed to #FE8A2F
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {submitting ? "Signing In..." : "Sign In"}
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ marginTop: 20 }}
                >
                  Or login with{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleGoogleLogin}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: 10,
                      color: "#FFBC35",
                    }}
                  >
                    <img
                      src={GoogleIcon}
                      alt="Google Icon"
                      style={{ width: 20, marginRight: 5 }}
                    />
                    Google
                  </Link>{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleFacebookLogin}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginLeft: 10,
                      color: "#FFBC35",
                    }}
                  >
                    <img
                      src={FacebookIcon}
                      alt="Facebook Icon"
                      style={{ width: 20, marginRight: 5 }}
                    />
                    Facebook
                  </Link>
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ marginTop: 20, color: "#757575" }}
                  onClick={() => navigate("/sign-up")}
                >
                  Don't have an account? Sign Up
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
      <Dialog open={openForgotPassword} onClose={handleCloseForgotPassword}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address. We will send you an email to reset
            your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForgotPassword} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCloseForgotPassword}
            style={{ backgroundColor: "#FE8A2F", color: "#fff" }} // Changed to #FE8A2F
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Login;
