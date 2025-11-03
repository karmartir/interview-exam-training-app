import React, { memo } from "react";
import { APP_AUTHOR } from "../constants/categories";

const Footer = memo(function Footer() {
  return (
    <footer className="app-footer">
      <p>
        Copyright &copy; {new Date().getFullYear()}. {APP_AUTHOR}. All rights
        reserved.
      </p>
    </footer>
  );
});

export default Footer;
