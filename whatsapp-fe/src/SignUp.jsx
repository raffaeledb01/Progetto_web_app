import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./style/SignUp.css";

// Componente per la pagina di login 
const SignUp = (props) => {
  const [username, setUsername] = useState(''); // Stato per gestire l'input dell'username
  const [password, setPassword] = useState(''); // Stato per gestire l'input della password
  const [img, setImg] = useState(''); // Stato per gestire l'input dell'URL dell'immagine di profilo

  // Handle per settare lo stato username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle per settare lo stato password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    
  };


  // Handle per settare lo stato img
  const handleImgChange = (e) => {
    setImg(e.target.value);
  };


  // Handle per consentire il sign up solo in caso di credenziali corrette
  const handleSignUp = (e) => {
    e.preventDefault();
    let trimmedValueUsername = username.trim();
    let trimmedValuePassword = password.trim();
    let trimmedValueImg = img.trim();
      if (trimmedValueUsername !== '' && trimmedValuePassword !== '' ) {
        props.signUpUser(username, password, img);
        setUsername('');
        setPassword('');
        setImg('');
      }
  };

  return (

    <Container component="main" maxWidth="sm" className="container">
      <Box className="box">
        <Typography component="h1" variant="h5" className="title">
          Sign up
        </Typography>
        <Box component="form" noValidate className="form">
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange} // L'evento onChange che richiama l'handle per settare lo stato username
            className="text-field"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange} // L'evento onChange che richiama l'handle per settare lo stato password
            className="text-field"
          />
          <TextField
            margin="normal"
            fullWidth
            id="img"
            label="Profile Photo URL"
            name="img"
            autoComplete="img"
            value={img}
            onChange={handleImgChange} // L'evento onChange che richiama l'handle per settare lo stato img
            className="text-field"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit-button"
            onClick={handleSignUp} // L'evento onClick che richiama l'handle per iscriversi
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="./login" variant="body2" className="link">
                {"Do you already have an account? Log in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
