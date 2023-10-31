import React from "react";
import { useState } from "react";
import { PropTypes } from "prop-types";



/**
 * @description StarRating Component
 *
 * @param {string} size : to vary the size of the rating stars depending on where it is used

 * @example <StarRating size={'text-4xl'}/>
 */

function StarRating({size}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className={size}>
      {[...Array(5)].map((_, i) => {
        i++;
        return (
          <button
            type="button"
            key={i}
            id={`star${i}`}
            className={i <= (hover || rating) ? "text-yellow" : "text-gray-300"}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}
StarRating.defaultProps = {
  size: 'text-xl'
}
StarRating.propTypes = {
  size: PropTypes.string
}

export default StarRating;
