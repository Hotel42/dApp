import React from "react";

export const Spacer = ({
  width = '10px',
  height = '10px',
}) => {
  return (
    <div style={{
      width,
      height,
    }}/>
  );
}
