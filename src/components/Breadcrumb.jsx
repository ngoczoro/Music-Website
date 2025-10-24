import React from 'react';
import { Breadcrumbs, Typography, Link, Box } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import theme from '../theme';
const DARK_CYAN = theme.palette.custom.darkCyan;
const normal = theme.palette.text.gray;
const BreadcrumbLink = ({ to, children, isLast }) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      underline="hover"
      color={isLast ? DARK_CYAN : normal} 
      fontWeight={400}
      sx={{
        textTransform: 'capitalize', // Viết hoa chữ cái đầu
        marginBottom: '2px',
      }}
    >
      {children}
    </Link>
  );
};

const CustomBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // Tách đường dẫn và loại bỏ khoảng trắng

  // Xử lý logic hiển thị
  // Ví dụ: /home/songs/create -> ["home", "songs", "create"]
  
  // Xử lý trường hợp đặc biệt: '/' và '/register'
  if (pathnames.length === 0 || pathnames[0] === 'register') {
      return (
          <Box sx={{ paddingLeft: 0, paddingTop: 0, marginBottom: '4px' }}>
              <Typography variant='body2' color={DARK_CYAN} sx={{textTransform: 'capitalize', textDecoration: 'underline'}}>
                  Register
              </Typography>
          </Box>
      );
  }

  return (
    <Box sx={{ marginBottom: '4px'}}>
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          // Xây dựng đường dẫn tích lũy: /home -> /home/songs -> /home/songs/create
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          const displayValue = value === 'home' ? 'Home' : value.replace(/-/g, ' '); 

          return last ? (
              <Typography variant='body2' color={DARK_CYAN} sx={{textTransform: 'capitalize', textDecoration: 'underline'}}>
              {displayValue}
            </Typography>
          ) : (
            // Component không phải cuối cùng: hiển thị link
            <BreadcrumbLink to={to} key={to}>
              {displayValue}
            </BreadcrumbLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default CustomBreadcrumbs;