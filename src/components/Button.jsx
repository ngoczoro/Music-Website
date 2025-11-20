import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import theme from '../theme';
const CustomButton = ({ children,isLoading = false, ...props }) => {
  // Mặc định kiểu dáng chung cho nút (dùng cho REGISTER)
  return (
    <Button
      variant="contained"
      disabled={isLoading || props.disabled}
      // Truyền tất cả các props còn lại (type, onClick, disabled, etc.)
      {...props}
      
      sx={{
        width: 'auto',
        mt: 1,
        mb: 2,
        padding: '12px 19px',
        textTransform: 'none', // Theo yêu cầu trong theme ban đầu
        borderRadius: '8px',
        backgroundColor: theme.palette.custom.purple,
        '&:hover': {
          backgroundColor: '#5e35b1',
        },
        ...props.sx,
      }}
    >
      {isLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        children 
      )}
    </Button>
  );
};

export default CustomButton;