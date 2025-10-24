import React from 'react';
import { Box, Typography, Link, Stack, Grid } from '@mui/material';
import logoImg from '../assets/img/logo.png'
import CustomBreadcrumbs from './Breadcrumb';
import theme from '../theme';

const Header = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px 50px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        gap: '50px',
        alignItems: 'flex-end', 
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: 'white',
      }}
    >
      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={0} 
        sx={{ 
         }}
      >
        {/* Logo Image */}
        <img
          src={logoImg} 
          alt="Company Logo"
          style={{
            height: '21.27px', 
            width: '30.7px',  
            objectFit: 'contain',
          }}
        />

        {/* Logo Text với Gradient */}
        <Typography 
          variant="title2"
          sx={{
            paddingRight: 1,
            background: theme.palette.custom.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', 
            backgroundClip: 'text', 
            textFillColor: 'transparent',
            // Đảm bảo typography không bị tràn hay lỗi căn chỉnh
            lineHeight: 1.3, 
          }}
        >
          Logo
        </Typography>
      </Stack>

      <CustomBreadcrumbs />
    </Box>
  );
};

export default Header;