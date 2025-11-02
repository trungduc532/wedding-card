import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./admin/Admin";
import Invite from "./invite/Invite";

export default function App(){
  return (
    <BrowserRouter>
      <div style={{fontFamily: 'Arial, sans-serif', padding: 20}}>
        <header style={{display:'flex', gap:12, marginBottom:20}}>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/invite/:id" element={<Invite/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home(){
  return (
    <div>
      <h1>Thiệp cưới: Đức & Trúc</h1>
      <p>Mở <a href="/admin">/admin</a> để tạo thiệp cho từng người nhận.</p>
      <p>Sau khi tạo, hệ thống trả về link /invite/:id — gửi link này cho khách mời.</p>
    </div>
  )
}