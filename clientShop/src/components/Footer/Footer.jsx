import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-orange">
      <div className="container py-4 ">
        <div className="col text text-white fw-3 fs-14">
          <div className="row">
            <Link to="/" className="text-uppercase">
              <ul>
                <span className="text-sub">SHOP</span>
                <li>Smartphones</li>
                <li>Home Decoration</li>
                <li>Womens Dresser</li>
              </ul>
            </Link>
          </div>

          <div className="row">
            <Link to="/" className="text-uppercase">
              <ul>
                <span className="text-sub">LIÊN HỆ CHÚNG TÔI</span>
                <li>Email: THD@gmail.com</li>
                <li>SĐT: +84 399085128</li>
                <li>Địa chỉ : Vĩnh Hưng, Vĩnh Lộc, Thanh Hóa</li>
              </ul>
            </Link>
          </div>

          <div className="row">
            <Link to="/" className="text-uppercase">
              <ul>
                <span className="text-sub">CHÍNH SÁCH</span>
                <li>Chính sách bảo mật</li>
                <li>Quy chế hoạt động </li>
                <li>Chính sách phát triển</li>
              </ul>
            </Link>
          </div>
        </div>
        <span className="text-white copyright-text text-manrope fs-14 fw-3">
          &copy; 2023 THD. Đã đăng ký bản quyền .
        </span>
      </div>
    </footer>
  );
};

export default Footer;
