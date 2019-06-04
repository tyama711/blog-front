import React from "react";
import { Link } from "react-router-dom";

import "./article-title.css";

interface ArticleTitleProps {
  title: string;
  linkUrl?: string;
}

export default function ArticleTitle(props: ArticleTitleProps) {
  if (props.linkUrl === undefined) {
    return <h1 className="article-title">{props.title}</h1>;
  } else {
    return (
      <Link to={props.linkUrl}>
        <h1 className="article-title">{props.title}</h1>
      </Link>
    );
  }
}
