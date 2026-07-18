// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Services from './pages/Services';
import Businesses from './pages/Businesses';
import BusinessProfile from './pages/BusinessProfile';
import ShopProfile from './pages/ShopProfile';
import ProductDetail from './pages/ProductDetail';
// import Providers from './pages/Providers';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import FAQ from './pages/FAQ';
// import Partners from './pages/Partners';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="services" element={<Services />} />
          <Route path="businesses" element={<Businesses />} />
          <Route path="business/:id" element={<BusinessProfile />} />
          <Route path="/shop/:id" element={<ShopProfile />} />
          
          {/* <Route path="providers" element={<Providers />} /> */}
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="login" element={<Login />} /> */}
          {/* <Route path="register" element={<Register />} /> */}
          {/* <Route path="faq" element={<FAQ />} /> */}
          {/* <Route path="partners" element={<Partners />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;