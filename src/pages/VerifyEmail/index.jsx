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
import { verifyEmail } from '../../services/authService.js'; // Sửa lỗi resolve bằng cách thêm .js
import { checkEmptyFields } from '../../utils/validation.js'; // Mặc dù không dùng hết, nhưng giữ lại

// Component này cần được bọc trong Layout/ThemeProvider/Header ở App.jsx
export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy email từ state khi navigate từ trang Register, nếu không có thì đặt rỗng
  const initialEmail = location.state?.email || ''; 

  // State cho OTP và Email
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState(initialEmail); 

  const [message, setMessage] = useState(null); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setMessage(null);
    if (e.target.name === 'otp') {
      // Giới hạn chỉ chấp nhận số và giới hạn 6 ký tự
      const value = e.target.value.replace(/[^0-9]/g, '');
      setOtp(value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };
  
  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage(null); 
    setIsLoading(true);

    // --- CLIENT-SIDE VALIDATION ---
    
    if (!email) {
      setMessage('Please enter your email address.');
      setIsError(true);
      setIsLoading(false);
      return; 
    }
    
    if (!otp) {
        setMessage('Please enter the verification code (OTP).');
        setIsError(true);
        setIsLoading(false);
        return; 
    }

    if (otp.length !== 6 || isNaN(otp)) {
      setMessage('The verification code must be a 6-digit number.');
      setIsError(true);
      setIsLoading(false);
      return; 
    }
    // --- END VALIDATION ---

    try {
      // Giả định verifyEmail(email, otp) trả về thành công nếu status 200/201
      await verifyEmail(email, otp); 
      
      setMessage('Email verified successfully! Redirecting to login...');
      setIsError(false);
      
      // Chuyển đến trang đăng nhập sau khi xác thực thành công
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 

    } catch (error) {
      // XỬ LÝ LỖI OTP/API
      setMessage(error.message || 'Verification failed. Please check the code and try again.');
      setIsError(true);
      setIsLoading(false); // Tắt loading khi thất bại
    } 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Header sẽ được render tại đây */}
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        
      </Box>
    </ThemeProvider>
  );
}


// <Card elevation={8} sx={{ width: '100%', maxWidth: 450, borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
//           <CardContent sx={{ padding: '40px' }}>
//             <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ marginBottom: '30px' }}>
//               Verify Email 
//             </Typography>
            
//             {/* Alert Message */}
//             {message && (
//               <Alert 
//                 severity={isError ? 'error' : 'success'} 
//                 sx={{ mb: 3 }}
//               >
//                 {message}
//               </Alert>
//             )}

//             {/* Form sử dụng handleVerify */}
//             <Box component="form" onSubmit={handleVerify} noValidate sx={{ mt: 1 }}>
//               <Stack spacing={3}>
//                 <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
//                     Please enter the 6-digit verification code sent to: 
//                     <Typography component="span" fontWeight="bold"> {email || "your email."}</Typography>
//                 </Typography>
                
//                 {/* Email Field */}
//                 <TextField
//                   required
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={handleChange}
//                   // Vô hiệu hóa nếu email được truyền qua state để khuyến khích dùng email đó
//                   disabled={!!initialEmail} 
//                 />

//                 {/* OTP Field */}
//                 <TextField
//                   required
//                   name="otp"
//                   label="Verification Code (OTP)"
//                   type="text" 
//                   id="otp"
//                   value={otp}
//                   onChange={handleChange}
//                   inputProps={{ maxLength: 6, inputMode: 'numeric' }} 
//                 />

//                 <Button
//                   type="submit"
//                   isLoading={isLoading}
//                   sx={{
//                     mt: 1, mb: 2,
//                     backgroundColor: '#673ab7', 
//                     '&:hover': { backgroundColor: '#5e35b1' },
//                   }}
//                 >
//                   VERIFY
//                 </Button>
//               </Stack>

//               <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Didn't receive the code?{' '}
//                   {/* Link này có thể chuyển đến chức năng Gửi lại OTP */}
//                   <Link href="#" variant="body2" sx={{ color: '#ff4081', textDecoration: 'none' }}>
//                     Resend OTP
//                   </Link>
//                 </Typography>
//               </Stack>
//             </Box>
//           </CardContent>
//         </Card>