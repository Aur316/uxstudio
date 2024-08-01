import React from "react";

export default function EmailLoader() {
  return (
    <div className="ui-loader loader-blk">
      <svg viewBox="22 22 44 44" className="multiColor-loader">
        <circle
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          stroke-width="3.6"
          className="loader-circle loader-circle-animation"
        />
      </svg>
    </div>
  );
}
