import { Box } from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* <Navbar /> */}
      {/* <Breadcrumb /> */}
      <Box flex="1" p={2}>{children}</Box>
      {/* <Footer /> */}
    </Box>
  );
}
