import React from "react";
import { Link } from "react-router-dom";
import "./blog-title.scss";

export default function BlogTitle() {
  return (
    <div className="blogTitle">
      <Link to={"/"}>
        <h1>ブログつくりました。</h1>
      </Link>
    </div>
  );
}
