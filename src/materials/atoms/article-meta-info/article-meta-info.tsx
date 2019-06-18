import React from "react";
import dateFormat from "dateformat";

import "./article-meta-info.css";

interface ArticleMetaInfoProps {
  createDate: Date;
  updateDate?: Date;
}

export default function ArticleMetaInfo(props: ArticleMetaInfoProps) {
  return (
    <div className="article-meta-info">
      {props.updateDate
        ? "Updated " + dateFormat(props.updateDate, "yyyy/mm/dd HH:MM")
        : "Posted " + dateFormat(props.createDate, "yyyy/mm/dd HH:MM")}
    </div>
  );
}
