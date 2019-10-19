import React from 'react'
import ArticleModel from '../../../../models/interfaces/article'
import ArticleMetaInfo from '../../../../materials/atoms/article-meta-info'
import ArticleTitle from '../../../../materials/atoms/article-title'

import './article.css'

interface ArticleProps {
  article: ArticleModel
}

export default function Article({ article }: ArticleProps) {
  return (
    <div className="article">
      <header>
        <ArticleMetaInfo
          createDate={article.createDate}
          updateDate={article.updateDate}
        />
        <ArticleTitle
          title={article.title}
          linkUrl={`/article/${article._id}`}
        />
      </header>
      <div>{article.abstract}</div>
    </div>
  )
}
