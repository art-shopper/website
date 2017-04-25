import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

/* -------------------<   COMPONENT   >-------------------- */

export default class SingleReview extends React.Component {

  render () {
    return (
      <div>
        <div className="rating-container">
          <span className="review-caption"> {this.props.title} &nbsp; </span>
            <StarRatingComponent
                name="star-rating"
                starCount={5}
                value={this.props.rating}
            />
         </div>
        <p> <i> Posted on {this.props.date} by {this.props.firstName} {this.props.lastName} </i> </p>

        <p>{this.props.content}</p>
      </div>
    )
  }
}
