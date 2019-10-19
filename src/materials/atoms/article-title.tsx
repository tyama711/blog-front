import React from 'react'
import { Link } from 'react-router-dom'

interface ArticleTitleProps {
  title: string
  linkUrl?: string
}

export default function ArticleTitle({ title, linkUrl }: ArticleTitleProps) {
  if (linkUrl === undefined) {
    return <h1 className="article-title">{title}</h1>
  }
  return (
    <Link to={linkUrl}>
      <h1 className="article-title">{title}</h1>
    </Link>
  )
}
