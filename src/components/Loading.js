import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
