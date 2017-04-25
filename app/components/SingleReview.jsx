import React from 'react';

/* -------------------<   COMPONENT   >-------------------- */

export default class SingleReview extends React.Component {

  const
  render () {
    return (
      <div>
        <p>{this.props.title} &nbsp;
          <span id="star">&#9733;</span><span id="star">&#9733;</span><span id="star">&#9733;</span><span id="star">&#9733;</span><span id="star">☆</span>
        </p>
        <p>Date: {this.props.date}</p>
        <p>{this.props.content}</p>
      </div>
    )
  }
}
