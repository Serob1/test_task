import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getQRCodes } from "../../state/qrCodeSlice/qrCodeSlice"
import { Box, Container, Typography } from "@mui/material"
import QRCode from "react-qr-code"

export default function MyQRCodes() {

    const dispatch = useDispatch()
    const { qrCodes } = useSelector(state => state.qrcode)

    useEffect(() => {
        dispatch(getQRCodes())
    }, [])

    return (
        <Container>
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
                    {"My QR Codes"}
                </Typography>
                <Box display={'flex'} flexDirection={'column'} rowGap={4} sx={{ mt: 4 }}>
                    {qrCodes.map((item) => (
                        <Box key={item.id} display={'flex'} columnGap={8} pb={1.25} borderBottom={'2px solid'}>
                            <Box width={350} textAlign={'start'}>
                                <Typography>
                                    <span style={{ fontWeight: 600 }}>Content:</span> {item.content}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 600 }}>Background Color:</span> {item.background_color}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 600 }}>Foreground Color:</span> {item.fill_color}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 600 }}>Size:</span> {item.size}
                                </Typography>
                            </Box>
                            <Box>
                                <QRCode
                                    title="GeeksForGeeks"
                                    value={item.content}
                                    bgColor={item.background_color}
                                    fgColor={item.fill_color}
                                    size={item.size}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}