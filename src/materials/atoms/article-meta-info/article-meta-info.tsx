import React from "react";
import dateFormat from "dateformat";

interface ArticleMetaInfoProps {
  createDate: Date;
  updateDate?: Date;
}

export default function ArticleMetaInfo({
  createDate,
  updateDate
}: ArticleMetaInfoProps) {
  return (
    <div className="article-meta-info">
      {dateFormat(createDate, "yyyy/mm/dd")}
      {updateDate && ` (Updated ${dateFormat(updateDate, "yyyy/mm/dd")})`}
    </div>
  );
}
