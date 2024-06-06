import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const About = () => {
  return (
    <Container sx={{ mt:"5rem" }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <CardMedia
            component="img"
            alt="cimbom"
            image="https://pbs.twimg.com/media/GOhgMAVW0AAPfQM?format=jpg&name=4096x4096"
            sx={{ objectFit: "contain", width: "100%", height: "40vh" }}
          />
          <Typography variant={"p"} fontWeight={"600"} fontSize={40}>
            MindCanvas
          </Typography>
          <Typography variant="h4">
            ykslkrtld
          </Typography>
          <Box
            className="social-icons"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Link href="https://github.com/ykslkrtld" target={"_blank"}>
              <GitHubIcon />
            </Link>
            <Link href="https://www.linkedin.com/in/yuksel-kurtuldu/" target={"_blank"}>
              <LinkedInIcon />
            </Link>
          </Box>
        </Box>
    </Container>
  );
};

export default About;
