import axios from '../../axios/axios';

function newQRCode(token, body) {
    return axios.post('/api/qr-code', body, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

function getQRCodes(token) {
    return axios.get('/api/qr-code', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

const QRCodeService = {
    newQRCode,
    getQRCodes
}

export default QRCodeService;