import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <h1 className="title">404 - Page Not Found</h1>
      <p className="message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link className="link" to="/">
        Go back home
      </Link>
    </div>
  );
}
