import {
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const NoAccess = () => {
  
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
          Ops! sem acesso.
        </Typography>
        <Typography variant='h5' component='h2' gutterBottom>
          {"Precisamos do login no SSO para acessar o sistema."}
        </Typography>
      </Container>
      <Box component='footer'>
        <Container maxWidth='sm'>
          <Link to='/login'>Login simulado</Link>
        </Container>
      </Box>
    </Box>
  );
};
export default NoAccess;
