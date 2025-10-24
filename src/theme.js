import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    custom: {
      black: '#121212',
      grey: '#6b6b6b',
      grey400: '#999999',
      lightGrey: '#b9b9b9',
      white: '#ffffff',
      purple: '#7c74ee',
      darkCyan: '#026e74',
      gradient: 'linear-gradient(to right, #3DC3C0 0%, #8568F5 100%)',
    }
  },
  typography: {
    fontFamily: [
      'Montserrat', // Đặt Montserrat lên đầu
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    title1: { fontSize: '44px', fontWeight: 600 }, //Su dung cho chu Register, Login,...
    title2: { fontSize: '24px', fontWeight: 500 }, //Su dung cho cac tieu de phu, Logo
    body1: { fontSize: '16px' }, //Primary text, su dung chinh cho trang web
    body2: { fontSize: '14px' }, //Secondary text, su dung cho cac chu nho hon, cac thong tin bo sung
    button: {
      fontSize: '18px',
      fontWeight: 500,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Không viết hoa chữ cái
          borderRadius: '8px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Bo tròn input
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
  },
});

export default theme;