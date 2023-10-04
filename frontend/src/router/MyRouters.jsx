import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import QRCodeBuilder from '../pages/QRCodeBuilder';
import MyQRCodes from '../pages/MyQRCodes';

const MyRouters = () => {
  const { token } = useSelector(state => state.user);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!token ? (
          <>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path={'/'} element={<QRCodeBuilder />} />
            <Route path={'/my-qr-codes'} element={<MyQRCodes />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default MyRouters;