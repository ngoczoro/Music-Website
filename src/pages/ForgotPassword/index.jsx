import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../../theme";
import Header from "../../components/Header";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Link,
  Stack,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { forgotPassword } from "../../services/authService";
import {
  checkEmptyFieldsForgotPassword,
  checkEmailFormat,
} from "../../utils/validation";
export default function ForgotPassword() {
  const navigate = useNavigate();
 const location = useLocation();

  const initialEmail = location.state?.email || '';
  const [formData, setFormData] = useState({
    email: initialEmail,
  });

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    let errorMessage = checkEmptyFieldsForgotPassword(formData);
    if (errorMessage) {
      setMessage(errorMessage);
      setIsError(true);
      setIsLoading(false);
      return;
    }

    errorMessage = checkEmailFormat(formData.email);
    if (errorMessage) {
      setMessage(errorMessage);
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const result = await forgotPassword(formData);

      if (!result.ok) {
        setMessage(result.message);
        setIsError(true);
        return;
      }

      setMessage(result.message);
      setIsError(false);

      navigate("/verify-email", {
        state: { email: formData.email, from: "forgot" },
      });

    } catch (error) {
      setMessage(error.message || "An unknown error occurred.");
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Card
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 450,
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent sx={{ padding: "40px" }}>
            <Typography
              variant="title1"
              component="h1"
              align="center"
              gutterBottom
              sx={{ marginBottom: "10px", fontSize: "40px" }}
            >
              Forgot Password
            </Typography>


            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 0 }}
            >
              <Stack spacing={3}>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Enter your email below to recover your password.
                </Typography>

                {message && (
                  <Alert severity={isError ? "error" : "success"}>
                    {message}
                  </Alert>
                )}

                <TextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </Stack>

              <Stack direction="column" alignItems="center" sx={{ mt: 30 }}>
                <Button type="submit" isLoading={isLoading} >
                  SUBMIT
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Go back?{" "}
                  <Link
                    href="/login"
                    variant="body2"
                    sx={{ color: "#FF8682", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
