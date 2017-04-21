import React from 'react'
import {Card, CardTitle} from 'react-materialize'

/* -------------------<   COMPONENT   >-------------------- */

const ProductCard = (props) => (
    <Card className='small'
      header={<CardTitle image='assets/sample-1.jpg'>Card Title</CardTitle>}
      actions={[<a href='#'>This is a Link</a>]}>
      I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
    </Card>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'

export default connect(
)(ProductCard)
