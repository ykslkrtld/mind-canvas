import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAuthCalls from "../services/useAuthCalls";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useBlogCalls from "../services/useBlogCalls";

const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "New Blog", path: "/new-blog" },
];

const settings = [
  { name: "My Blogs", path: "/my-blogs" },
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/" },
];

const logReg = [
  { name: "Login", path:"/login" },
  { name: "Register", path:"/register" },
]

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { singleUser } = useSelector((state) => state.getBlog);
  const { getSingleUser } = useBlogCalls();
  const location = useLocation();
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (setting) => {
    if (setting.name === "Logout") {
      logout();
    }
    handleCloseUserMenu();
  };

  const getLogRegLinks = () => {
    if (location.pathname === "/login") {
      return logReg.filter((item) => item.name === "Register");
    } else if (location.pathname === "/register") {
      return logReg.filter((item) => item.name === "Login");
    } else {
      return logReg;
    }
  };

  useEffect(() => {
    if (user?.userId) {
      getSingleUser(user?.userId);
    }
  }, [user?.userId]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
          <a href="/"><img
              src="https://png.pngtree.com/png-vector/20231115/ourmid/pngtree-blog-icon-blog-png-image_10603652.png"
              width={"60rem"}
              alt=""
            /></a>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      to={page.path}
                      style={({ isActive }) =>
                        isActive ? { textDecoration: "none", color: "purple" } : { textDecoration: "none", color: "inherit" }
                      }
                    >
                      {page.name}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
          <a href="/"><img
              src="https://png.pngtree.com/png-vector/20231115/ourmid/pngtree-blog-icon-blog-png-image_10603652.png"
              width={"60rem"}
              alt=""
            /></a>
          </Box>      
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  to={page.path}
                  style={({ isActive }) =>
                    isActive ? { textDecoration: "none", color: "purple", backgroundColor:"white", padding:"0.5rem 1rem", borderRadius:"0.8rem" } : { textDecoration: "none", color: "inherit" }
                  }
                >
                  {page.name}
                </NavLink>
              </Button>
            ))}
          </Box>
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Typography>{ user.username && singleUser?.firstName + " " + singleUser?.lastName}</Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user.username && singleUser?.image}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user.username ? 
                settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleUserMenuClick(setting)}
                  >
                    <NavLink
                      to={setting.path}
                      style={{ textDecoration: "none", color: "inherit" }
                      }
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </NavLink>
                  </MenuItem>
                ))
               : getLogRegLinks().map((item) => (
                <MenuItem key={item.name} onClick={handleCloseUserMenu}>
                  <NavLink
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">{item.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
