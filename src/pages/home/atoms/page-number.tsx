import React from 'react'

interface PageNumberProps {
  page: number
  current: boolean
}

export default function PageNumber({ current, page }: PageNumberProps) {
  if (current) {
    return <span className="page-numbers current">{page}</span>
  }
  return <span className="page-numbers">{page}</span>
}

PageNumber.defaultProps = {
  current: false,
}
