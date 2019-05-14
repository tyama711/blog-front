import React from "react";
import { Link } from "react-router-dom";

export default function BlogTitle() {
  return (
    <Link to={"/"}>
      <h1>ブログはじめました。</h1>
    </Link>
  );
}
