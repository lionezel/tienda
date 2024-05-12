import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Button } from "@mui/material";
import { app } from "../../../firebase/config";

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div>
      <h1>Inicia sesión</h1>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          type="email"
          label="Correo electrónico"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          type="password"
          label="Contraseña"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Iniciar sesión
        </Button>
      </Box>
    </div>
  );
}

export default Login;
