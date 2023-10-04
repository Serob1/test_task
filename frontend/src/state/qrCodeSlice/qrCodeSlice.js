import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import QRCodeService from './qrCode.service';

const initialState = {
    qrCodes: []
};

export const newQRCode = createAsyncThunk(
    'qrcode/newQRCode',
    async ({ body, setErrors, clearQRParams }, { getState }) => {
        try {
            const { token } = getState().user
            await QRCodeService.newQRCode(token, body)
            toast.success("QR Code successfully created")
            clearQRParams()
        }
        catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response?.data?.errors)
            }
            else {
                console.log(err.message)
            }
        }
    }
)

export const getQRCodes = createAsyncThunk(
    'qrcode/getQRCodes',
    async (_, { dispatch, getState }) => {
        try {
            const { token } = getState().user
            const res = await QRCodeService.getQRCodes(token)
            dispatch(setQRCodes(res.data))
        }
        catch (err) {
            console.log(err)
        }
    }
)

const qrCodeSlice = createSlice({
    name: 'qrcode',
    initialState,
    reducers: {
        setQRCodes: (state, action) => {
            state.qrCodes = action.payload
        }
    },
});

export const { setQRCodes } = qrCodeSlice.actions;

export default qrCodeSlice.reducer;
