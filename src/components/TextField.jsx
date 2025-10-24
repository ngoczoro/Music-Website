import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = (props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="medium"
      // Truyền tất cả các props còn lại (label, name, value, onChange, required, etc.)
      {...props} 
      
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px', 
        },
        ...props.sx, // Cho phép ghi đè styles từ bên ngoài
      }}
    />
  );
};

export default CustomTextField;