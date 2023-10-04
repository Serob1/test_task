import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box } from '@mui/material';
import { logoutUser } from '../../state/userSlice/userSlice';

const allMenu = [
    {
        title: 'Create QR Code',
        path: '/'
    }
]

function Header() {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)

    const logout = () => {
        dispatch(logoutUser())
    }

    const menu = [
        {
            isShow: !!token,
            title: 'Create QR Code',
            path: '/'
        },
        {
            isShow: !!token,
            title: 'My QR Codes',
            path: '/my-qr-codes'
        },
        {
            isShow: !token,
            title: 'Login',
            path: '/login'
        },
        {
            isShow: !token,
            title: 'Sign Up',
            path: '/signup'
        },
    ].filter(item => item.isShow)

    return (
        <Box display={'flex'} justifyContent={'flex-end'} bgcolor={'#1976d2'} height={70}>
            <Box display={'flex'} columnGap={3} p={3}>
                {menu.map((item, index) => (
                    <Link
                        key={index}
                        style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}
                        to={item.path}
                    >
                        {item.title}
                    </Link>
                ))}
                {!!token && (
                    <Button
                        sx={{ color: "white", p: '0', textTransform: 'none', fontSize: '16px' }}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default Header;