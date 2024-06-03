import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { MdLogin as LoginIcon } from "react-icons/md"
import imgLogin from '../../assets/logo-main.jpeg';
import './Login.css';


export const Login = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { cargandoLogin, messageLogin, onIniciarSesion, user,  token}  = useAuth();

    const handleSubmit = (e)=>{
        e.preventDefault();
        onIniciarSesion({username, password});
    };

    useEffect(()=>{
        if (Boolean(token)){
            navigate(user.url_main, {replace: true});
            return;
        }
    }, [token]);

    return  <Container maxWidth="xs" >
                <Box className="Login_mainContainer">
                    <Card variant="outlined" className="Login_card">
                        <CardContent className="Login_cardContent">
                            <Box className="Login_boxImg">
                                <img src={imgLogin} alt="Logo" />
                            </Box>
                            <Box className="Login_boxForm">
                                <Typography className="Login_subtitle" variant="h4">
                                    <strong>Hola,</strong>
                                </Typography>
                                <Typography className="Login_subtitle" variant="h5">
                                ¡Bienvenido(a) a nuestra app!
                                </Typography>
                                <Box className="Login_form" component="form" onSubmit={handleSubmit} noValidate>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        value = {username}
                                        label="Usuario"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        size="small"
                                        onChange = {(e)=>{
                                            setUsername(e.currentTarget.value);
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        value = {password}
                                        required
                                        fullWidth
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        name="password"
                                        label="Clave"
                                        type="password"
                                        size="small"
                                        onChange = {(e)=>{
                                            setPassword(e.currentTarget.value);
                                        }}
                                    />
                                    {
                                    Boolean(messageLogin)
                                        ?   <Alert variant="filled" severity={messageLogin.severity}>{messageLogin.text}</Alert>
                                        :   <LoadingButton
                                                loading = {cargandoLogin}
                                                text = "INICIANDO..."
                                                fullWidth
                                                type="submit"
                                                color="primary"
                                                loadingPosition="start"
                                                startIcon={<LoginIcon />}
                                                variant="contained"
                                                size="large"
                                                sx={{ mt: 3, mb: 2 }}
                                                disabled = { username === "" || password === ""}
                                                >
                                                INGRESAR
                                            </LoadingButton>
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
}