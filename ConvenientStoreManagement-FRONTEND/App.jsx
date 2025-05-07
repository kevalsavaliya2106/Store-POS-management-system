import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import POSPage from './pages/POSPage/POSPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CustomerPage from './pages/CustomerPage/CustomerPage';
import Navbar from './components/Navbar/Navbar';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage/TransactionHistoryPage';
import './styles/global.css'; // Optional for global resets or fonts
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/ThemeContext';


function App() {
  return (
    <Router>
      <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pos" element={<POSPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionHistoryPage />} />

        {/* Add more routes as needed */}
      </Routes>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      </ThemeProvider>
    </Router>
  );
}
export default App;
