import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import theme from '../../theme.js'; // Sửa lỗi resolve bằng cách thêm .js
import Header from '../../components/Header.jsx'; // Sửa lỗi resolve bằng cách thêm .js
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Link,
  Stack,
  Card,
  CardContent,
  Alert
} from '@mui/material';

// Import components và services chung
import TextField from '../../components/TextField.jsx'; // Sửa lỗi resolve bằng cách thêm .js
import Button from '../../components/Button.jsx'; // Sửa lỗi resolve bằng cách thêm .js
import { verifyEmail, resendOTP, verifyOtp } from '../../services/authService.js'; // Sửa lỗi resolve bằng cách thêm .js

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialEmail = location.state?.email || '';
  const from = location.state?.from;
  console.log("Initial email from location state:", from);

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: initialEmail,
    otp: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    if (!formData.otp) {
      setMessage('Please enter the verification code (OTP).');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (formData.otp.length !== 6 || isNaN(formData.otp)) {
      setMessage('The verification code must be a 6-digit number.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      if (from === "register") {
        console.log("Verifying OTP for registration flow.");
        const result = await verifyEmail(formData.email, formData.otp);
        setMessage(result.message);
        if (!result.ok) {
          setIsError(true);
          return;
        }
        setIsError(false);
        navigate("/login", { state: { email: formData.email } });
        return;
      }
      const result = await verifyOtp(formData.email, formData.otp);
      setMessage(result.message);
      if (!result.ok) {
        setIsError(true);
        return;
      }
      setIsError(false);
      navigate("/reset-password", { state: { email: formData.email } });

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
              sx={{ marginBottom: "10px" }}
            >
              Verify Email
            </Typography>


            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 0 }}
            >
              <Stack spacing={3}>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Please enter OTP below to verify your email address.
                </Typography>

                {message && (
                  <Alert severity={isError ? "error" : "success"} >
                    {message}
                  </Alert>
                )}

                <TextField
                  required
                  id="otp"
                  label="OTP"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  sx={{ mt: 0 }}
                />

              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                <Typography variant="body2" color="text.secondary" alignItems='flex-end'>
                  Didn't receive the code?{" "}
                  <Link
                    variant="body2"
                    type="button"
                    sx={{ color: "#FF8682", textDecoration: "none", cursor: "pointer" }}
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        setIsLoading(true);
                        const type = from === "register" ? "REGISTER" : "FORGOT_PASSWORD";
                        const result = await resendOTP(initialEmail, type);
                        setMessage(result.message);
                        if (!result.ok) {
                          setIsError(true);
                          return;
                        }
                        setIsError(false);
                        setIsLoading(false);

                      } catch (error) {
                        setMessage(error.message || "Failed to resend OTP.");
                        setIsError(true);
                        setIsLoading(false);
                      }
                    }}
                  >
                    Resend
                  </Link>

                </Typography>
              </Box>
              <Stack direction="column" alignItems="center" sx={{ mt: 30 }}>
                <Button type="submit" isLoading={isLoading} >
                  SUBMIT
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Go back?{" "}
                  {from === "register" ? (
                    <Link
                      href="/register"
                      variant="body2"
                      sx={{ color: "#FF8682", textDecoration: "none" }}
                    >
                      Register
                    </Link>
                  ) : (
                    <Link
                      href="/forgot-password"
                      variant="body2"
                      sx={{ color: "#FF8682", textDecoration: "none" }}
                    >
                      Forgot Password
                    </Link>
                  )}
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
