import React from "react";
import dateFormat from "dateformat";

interface ArticleMetaInfoProps {
  createDate: Date;
  updateDate?: Date;
}

export default function ArticleMetaInfo(props: ArticleMetaInfoProps) {
  return (
    <div className="article-meta-info">
      {dateFormat(props.createDate, "yyyy/mm/dd")}
      {props.updateDate &&
        ` (Updated ${dateFormat(props.updateDate, "yyyy/mm/dd")})`}
    </div>
  );
}
