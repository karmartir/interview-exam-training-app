import React, { memo } from "react";
import { APP_AUTHOR } from "../constants/categories";

const Footer = memo(function Footer() {
  return (
    <footer className="app-footer">
      <p>{APP_AUTHOR} registered. All rights reserved.</p>
    </footer>
  );
});

export default Footer;
