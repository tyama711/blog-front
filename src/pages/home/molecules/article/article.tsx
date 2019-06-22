import React from "react";
import ArticleModel from "../../../../models/interfaces/article";
import ArticleMetaInfo from "../../../../materials/atoms/article-meta-info";
import ArticleTitle from "../../../../materials/atoms/article-title";

import "./article.css";

interface ArticleProps {
  article: ArticleModel;
}

export default function Article(props: ArticleProps) {
  return (
    <div className="article">
      <header>
        <ArticleMetaInfo
          createDate={props.article.createDate}
          updateDate={props.article.updateDate}
        />
        <ArticleTitle
          title={props.article.title}
          linkUrl={`/article/${props.article._id}`}
        />
      </header>
      <div>{props.article.abstract}</div>
    </div>
  );
}
