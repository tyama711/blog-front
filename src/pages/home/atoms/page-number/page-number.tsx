import React from "react";

import "./page-number.css";

interface PageNumberProps {
  page: number;
  current: boolean;
}

export default function PageNumber(props: PageNumberProps) {
  if (props.current) {
    return <span className="page-numbers current">{props.page}</span>;
  } else {
    return <span className="page-numbers">{props.page}</span>;
  }
}

PageNumber.defaultProps = {
  current: false
};
