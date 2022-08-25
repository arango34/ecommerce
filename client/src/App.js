import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Error from './pages/Error';
import Modal from './components/modal/Modal';

import { calculateTotals } from './features/cart/cartSlice';
import { getDepartments } from './features/product/productSlice';
import { getUsers } from './features/user/userSlice';

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);
  return (
    <main className={`${isModal && 'no-scroll'}`}>
      <Router>
        {isModal && <Modal />}
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:department' element={<Products />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
