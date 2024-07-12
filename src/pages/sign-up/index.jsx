import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Notification } from "../../utils/index";
import { auth } from "../../service/";
import { useMask } from "@react-input/mask";
import { signUpValidationSchema } from "../../utils/validation";

// Import Nike Icon SVG URL
import nikeIcon from "../../assets/nike.svg";

const Index = () => {
  const initialValues = {
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
  };

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const phone_number = values.phone_number.replace(/\D/g, "");
      const payload = { ...values, phone_number: `+${phone_number}` };
      console.log("Payload to send:", payload); // Added logging for debugging

      const response = await auth.sign_up(payload);

      console.log("Response received:", response); // Added logging for debugging

      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        navigate("/sign-in");
      } else {
        Notification({
          title: "Sign Up Failed",
          type: "error",
        });
        console.error("Sign up failed with status:", response.status); // Added logging for debugging
      }
    } catch (error) {
      console.error(
        "Sign up error:",
        error.response ? error.response.data : error
      ); // Improved error logging
      Notification({
        title: "Sign Up Failed",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, [navigate]);

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
              style={{ width: 30, marginRight: 10 }}
            />
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "#000", fontWeight: 700 }}
            >
              Register
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signUpValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="full_name"
                  type="text"
                  as={TextField}
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="full_name"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                  sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      { borderColor: "#FFBC35" },
                  }}
                />
                <Field
                  name="phone_number"
                  type="tel"
                  as={TextField}
                  label="Phone number"
                  fullWidth
                  margin="normal"
                  inputRef={inputRef}
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="phone_number"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                  sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      { borderColor: "#FFBC35" },
                  }}
                />
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                  sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      { borderColor: "#FFBC35" },
                  }}
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      { borderColor: "#FFBC35" },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    backgroundColor: "#FFBC35",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ cursor: "pointer", color: "#1976d2", marginTop: 20 }}
                  onClick={() => navigate("/sign-in")}
                >
                  Already have an account? Sign In
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Index;
