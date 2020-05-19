import React from "react";
import Breakpoint from "./breakpoints";

export default function DesktopBreakpoint(props) {
  return <Breakpoint name="laptop">{props.children}</Breakpoint>;
}
