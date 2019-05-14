import React from "react";

import "./style.css";

interface ArticleMetaInfoProps {
  createDate: Date;
  updateDate?: Date;
}

export default function ArticleMetaInfo(props: ArticleMetaInfoProps) {
  return (
    <div className="article-meta-info">
      {props.updateDate && `Updated ${props.updateDate}`}
      {`Posted ${props.createDate}`}
    </div>
  );
}
