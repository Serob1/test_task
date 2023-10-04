import { useState } from 'react';
import { useDispatch } from 'react-redux';
import QRCode from 'react-qr-code';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { newQRCode } from '../../state/qrCodeSlice/qrCodeSlice';

export default function QRCodeBuilder() {

    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [content, setContent] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [fgColor, setFgColor] = useState('');
    const [size, setSize] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            content,
            background_color: bgColor,
            fill_color: fgColor,
            size
        };
        dispatch(newQRCode({ body, setErrors, clearQRParams }))
    };

    const clearQRParams = () => {
        setErrors({})
        setContent('')
        setBgColor('')
        setFgColor('')
        setSize('')
    }


    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 4
                }}
            >
                <Typography component="h1" variant="h5">
                    {"Create QR Code"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        helperText={errors.content?.[0] || ''}
                        error={!!errors.content?.[0]}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Background color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        helperText={errors.background_color?.[0] || ''}
                        error={!!errors.background_color?.[0]}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Foreground color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        helperText={errors.fill_color?.[0] || ''}
                        error={!!errors.fill_color?.[0]}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="number"
                        label="Size"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value === '' ? 0 : e.target.value, 10))}
                        helperText={errors.size?.[0] || ''}
                        error={!!errors.size?.[0]}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {"Save"}
                    </Button>
                </Box>

                {content && (
                    <QRCode
                        title="GeeksForGeeks"
                        value={content}
                        bgColor={bgColor}
                        fgColor={fgColor}
                        size={size === '' ? 0 : size}
                    />
                )}
            </Box>
        </Container>
    )
}