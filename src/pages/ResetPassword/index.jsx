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
import { resetPassword } from "../../services/authService";
import {
  checkEmptyFieldsResetPassword,
  checkPasswordMatch,
  checkPasswordPolicy,
} from "../../utils/validation";
export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    email: initialEmail,
    password: "",
    confirmPassword: "",
  });

  // ... trong component Register()
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

    let errorMessage = checkEmptyFieldsResetPassword(formData);
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

    errorMessage = checkPasswordMatch(
      formData.password,
      formData.confirmPassword
    );
    if (errorMessage) {
      setMessage(errorMessage);
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPassword(formData.email, formData.password);
      setMessage(
        result.message || "Reset password successful!"
      );
      if (!result.ok) {
        setIsError(true);
        return;
      }
      setIsError(false);
      navigate("/login");

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
              variant="title1"
              component="h1"
              align="center"
              gutterBottom
              sx={{ marginBottom: "30px" }}
            >
              Reset Password
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
                {/* SỬ DỤNG CUSTOM TEXT FIELD */}

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

                <TextField
                  required
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </Stack>

              <Stack direction="column" alignItems="center" sx={{ mt: 24 }}>
                <Button type="submit" isLoading={isLoading}>
                  RESET
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
