import React from 'react'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'
import PageNumber from '../atoms/page-number'
import Arrow from '../atoms/arrow'

const PAGE_SIZE = 10

interface PaginationProps {
  totalArticles: number
  currentPage: number
}

export default function Pagination({
  totalArticles,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.floor((totalArticles - 1) / PAGE_SIZE) + 1
  return (
    <nav className="pagination" role="navigation">
      <div>
        {currentPage > 1 && (
          <Link to={`?page=${currentPage - 1}`} className="prev-page">
            <Arrow direction="left" />
          </Link>
        )}

        {_.range(1, totalPages + 1).map(page => {
          if (page === currentPage) {
            return <PageNumber key={page} page={page} current />
          }
          return (
            <Link key={page} to={`?page=${page}`}>
              <PageNumber page={page} />
            </Link>
          )
        })}

        {currentPage < totalPages && (
          <Link to={`?page=${currentPage + 1}`} className="next-page">
            <Arrow direction="right" />
          </Link>
        )}
      </div>
    </nav>
  )
}
