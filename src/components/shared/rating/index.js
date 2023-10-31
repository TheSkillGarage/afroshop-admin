import React from 'react';
import { PropTypes } from "prop-types";

/**
 * @description StaticRating Component
 *
 * @param {number} rating : this control the number of rating stars
 * @param {string} size : to vary the size of the rating stars depending on where it is used

 * @example <StaticRating rating={5} size={'text-4xl'}/>
 */

function StaticRating({rating, size}) {
  return (
    <div className={size}>
      {[...Array(5)].map((star, i) => { 
        i++;
        return(
          <button
            type="button"
            key={i}
            id='ratingButton'
            className={i <= (rating)?  "text-yellow" : "text-gray-300"}
            ><span className='star'>&#9733;</span>
          </button>
      )})}

    </div>
  )
}
StaticRating.defaultProps = {
  rating: 3,
  size: 'text-4xl'
} 

StaticRating.propTypes = {
  rating: PropTypes.number,
  size: PropTypes.string
}

//<Route exact path="/rating" element={<StarRating />} />   
export default StaticRating