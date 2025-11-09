import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { loginUser } from "../../services/authService";
import {
  checkEmptyFieldsLogin,
  checkPasswordPolicy,
  checkEmailFormat,
} from "../../utils/validation";
export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
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

    let errorMessage = checkEmptyFieldsLogin(formData);
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

    errorMessage = checkPasswordPolicy(formData.password);
    if (errorMessage) {
      setMessage(errorMessage);
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const result = await loginUser(formData);

      setMessage(
        result.message || "Login successful! Redirecting to homepage..."
      );
      setIsError(false);

      navigate("/dashboard", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      setMessage(error.message || "An unknown error occurred.");
      setIsError(true);
    } finally {
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
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ marginBottom: "30px" }}
            >
              Login
            </Typography>
            {message && (
              <Alert severity={isError ? "error" : "success"} sx={{ mb: 3 }}>
                {message}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Stack spacing={3}>
                <TextField
                  required
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <TextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <TextField
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <Box display="flex" justifyContent="flex-end" mb={6}>
                  <Link
                    href="/forgot-password"
                    variant="body2"
                    sx={{ color: "#FF8682", textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

              </Stack>

              <Stack direction="column" alignItems="center" sx={{ mt: 8 }}>
                <Button type="submit" isLoading={isLoading} >
                  LOGIN
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link
                    href="/"
                    variant="body2"
                    sx={{ color: "#FF8682", textDecoration: "none" }}
                  >
                    Register
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
