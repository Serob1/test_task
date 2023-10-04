import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MyRouters from './router/MyRouters'
import { getAuthorizedUser } from './state/userSlice/userSlice';

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)

  useEffect(() => {
    if (token) {
      dispatch(getAuthorizedUser())
    }
  }, [dispatch])

  return (
    <div className="App">
      <ToastContainer />
      <MyRouters />
    </div>
  );
}

export default App;
