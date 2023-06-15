import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Login from './pages/auth/login/Login';
import NotFound from './pages/auth/notFound/NotFound';
import Register from './pages/auth/register/Register';
import Home from './pages/home/Home';
import PrivateRoute from './components/routes/PrivateRoute';
import UserDashBoard from './pages/user/userDashboard/UserDashBoard';
import UserProfile from './pages/user/userProfile/UserProfile';
import UserOrder from './pages/user/userOrder/UserOrder';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/adminDashboard/AdminDashboard';
import Menu from './components/nav/Menu';
import Category from './pages/admin/category/Category';
import AdminProduct from './pages/admin/adminProduct/AdminProduct';
import AdminProducts from './pages/admin/adminProducts/AdminProducts';
import AdminProductUpdate from './pages/admin/adminProductUpdate/AdminProductUpdate';
import Shop from './pages/shop/Shop';
import Search from './pages/search/Search';
import ProductView from './pages/productView/ProductView';
import Cart from './pages/cart/Cart';
import AdminOrders from './pages/admin/orders/Orders';

const App = () => {

  return (
    <BrowserRouter>
    <Menu/>
    <Toaster position='top-right' />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/product/:slug' element={<ProductView/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
     {/* =======Private Routing========== */}
      <Route path='/dashboard'element={<PrivateRoute/>}>
       <Route path='user' element={<UserDashBoard/>}/>
       <Route path="user/profile" element={<UserProfile/>}/>
        <Route path="user/orders" element={<UserOrder />} />
      </Route>
        {/* =========Admin Routing======== */}
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/category" element={<Category />} />

      <Route path="admin/product" element={<AdminProduct/>} />

       <Route path="admin/products" element={<AdminProducts />} />
       <Route path="admin/product/update/:slug" element={<AdminProductUpdate/>}
          />  
      <Route path="admin/orders" element={<AdminOrders/>} />
      </Route>
      
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    
  
    
    </BrowserRouter>
 
  )
}

export default App