// App.js
import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import UserList from './components/UserList';
import ThreeDComponent from './components/ThreeDComponent';
import SmallFrame from './components/SmallFrame';
import GaussianGraph from './components/GaussianGraph';
//import GET from './components/GET';
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('form'); // Để xác định trang hiện tại

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Đóng menu khi chọn một trang
  };
  return (
    <div className="App">
      <header>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="menu-line" />
          <div className="menu-line" />
          <div className="menu-line" />
          <div className="menu-line" />
        </div>
        <h1 className="app-title">ỨNG DỤNG QUẢN LÝ BỆNH NHÂN CỦA HUY</h1>
      </header>
      <main>
        <div className={`form-container ${currentPage === 'form' ? 'visible' : 'hidden'}`}>
          <Form />
        </div>
        <div className={`user-list-container ${currentPage === 'userList' ? 'visible' : 'hidden'}`}>
          <UserList />
        </div>
        <div className={`threejs-container ${currentPage === 'userList2' ? 'visible' : 'hidden'}`}>
          <GaussianGraph />

        </div>
        {currentPage === 'PAGE4' && (
          <div className="user-list-container">
            <GaussianGraph />
            <SmallFrame />
          </div>

        )}

      </main>
      <aside className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleMenuClick('form')}>NHẬP THÔNG TIN</li>
          <li onClick={() => handleMenuClick('userList')}>DANH SÁCH NGƯỜI DÙNG</li>
          <li onClick={() => handleMenuClick('userList2')}>KHÁM BỆNH THÔNG SỐ</li> {/* Thêm mục mới */}
          <li onClick={() => handleMenuClick('PAGE4')}>MÔ PHỎNG CHUYỂN ĐỘNG</li>
        </ul>
      </aside>
    </div>
  );
}

export default App;
