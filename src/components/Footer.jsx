import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import React from "react";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "black", py: 1, position: "fixed", bottom: "0", width: "100%" }}>
      <Container maxWidth="md">
        <Stack
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
          spacing={1}
        >
          <Typography color={"white"} padding={1.5} >
            Developed by ykslkrtld - Copyright © 2024
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
