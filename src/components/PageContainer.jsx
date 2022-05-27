import React from "react";

export const PageContainer = ({ children }) => {
  return (
    <div style={{
      'marginTop': '75px',
      'marginLeft': '17.5%',
      'marginRight': '17.5%',
    }}>
      {children}
    </div>
  );
}
