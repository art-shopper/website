import React from 'react';
import { Link } from 'react-router'
import { CollectionItem } from 'react-materialize';

/* -------------------<   COMPONENT   >-------------------- */

const SingleReview = props => (
  <div>
    <p>Insert Review Title Here &nbsp;
      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </p>
    <p>Insert Date Created</p>
    <p>Insert Review Content Here</p>
  </div>

);



/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

export default connect(
    (state, {review}) => (
      {
        review
      }
    )
  )(SingleReview);
