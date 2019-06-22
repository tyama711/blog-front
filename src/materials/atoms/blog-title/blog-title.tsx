import React from "react";
import { Link } from "react-router-dom";

export default function BlogTitle() {
  return (
    <div className="blog-title">
      <Link to={"/"}>
        <h1>ブログつくりました。</h1>
      </Link>
    </div>
  );
}
