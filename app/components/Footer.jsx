import React from 'react'
import {Footer} from 'react-materialize'

/* -------------------<   COMPONENT   >-------------------- */

export const TheFooter = (props) => (
      <Footer copyrights="&copy; 2017 Art Shopper"
      moreLinks={
        <a className="grey-text text-lighten-4 right" href="#!"></a>
      }
      links={
        <ul>
          <li><a className="grey-text text-lighten-3" href="https://github.com/art-shopper/website">ArtShopper Team Github</a></li>
          <li><a className="grey-text text-lighten-3" href="https://www.fullstackacademy.com/">Fullstack Academy</a></li>
          <li><a className="grey-text text-lighten-3" href="https://www.bobross.com/">Bob Ross's Home Page</a></li>
          <li><a className="grey-text text-lighten-3" href="https://www.youtube.com/watch?v=oHg5SJYRHA0">Bonus Content</a></li>
        </ul>
      }
      className='example'
    >
        <h5 className="white-text">about art shopper</h5>
        <p className="grey-text text-lighten-4">This website dedicated to Bob Ross was built by a team of Fullstack Academy students using React-Redux, Express, PostgreSQL, and Materialize CSS. </p>
    </Footer>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {},
)(TheFooter)
