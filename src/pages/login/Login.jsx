import { Alert, Box, Button, Container, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./LoginPage.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/");  
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Box className="login-page">
      <Container className="login-container" maxWidth="xs">
        <Typography variant="h5" align="center" className="title">
          Admin
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="signin-button"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
