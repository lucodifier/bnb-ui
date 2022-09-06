import { Box, Container, CssBaseline, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
      <CssBaseline />
      <Container component='main' maxWidth='sm'>
        <Typography variant='h2' component='h1' gutterBottom>
          Ops! Não encontrei.
        </Typography>
      </Container>
      <Box component='footer'>
        <Container maxWidth='sm'>
          <Link to='/'>Voltar</Link>
        </Container>
      </Box>
    </Box>
  );
};
export default NotFound;
