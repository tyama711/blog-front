import React from "react";
import { ReactComponent as ArrowSVG } from "../../../../../resources/svg/right-arrow.svg";

import "./arrow.css";

interface ArrowProps {
  direction: "up" | "down" | "left" | "right";
}

export default function Arrow(props: ArrowProps) {
  switch (props.direction) {
    case "up":
      return <ArrowSVG className="up arrow" transform="rotate(270)" />;
    case "down":
      return <ArrowSVG className="down arrow" transform="rotate(90)" />;
    case "left":
      return <ArrowSVG className="left arrow" transform="rotate(180)" />;
    case "right":
      return <ArrowSVG className="right arrow" />;
  }
}

Arrow.defaultProps = {
  direction: "right"
};
