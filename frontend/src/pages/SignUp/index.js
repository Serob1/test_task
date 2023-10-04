import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../state/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            name: data.get('name'),
            surname: data.get('surname'),
            email: data.get('email'),
            password: data.get('password'),
        };
        dispatch(signupUser({body, setErrors, navigate}))
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 12 }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {"Sign Up"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        helperText={errors.name?.[0] || ''}
                        error={!!errors.name?.[0]}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="surname"
                        label="Surname"
                        name="surname"
                        autoComplete="surname"
                        helperText={errors.surname?.[0] || ''}
                        error={!!errors.surname?.[0]}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        helperText={errors.email?.[0] || ''}
                        error={!!errors.email?.[0]}
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
                        helperText={errors.password?.[0] || ''}
                        error={!!errors.password?.[0]}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {"Sign Up"}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Log In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}