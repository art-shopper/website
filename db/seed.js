'use strict'

const db = require('APP/db')
    , {User, Product, Review, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
    reviews: reviews(),
  }

  // seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  bob: {
    first_name: 'Bob',
    last_name: 'Ross',
    email: 'bob@zeke.zeke',
    password: '123',
    is_admin: true
  },
  barack: {
    first_name: 'Barack',
    last_name: 'Obama',
    email: 'barack@formerpresidents.gov',
    password: '123',
    is_admin: true
  },
})

const products = seed(Product, {
  painting1: {
    title: 'Painting 1',
    description: 'This painting is a great painting by Pablo Picasso.',
    price: 10000,
    quantity: 1,
    tags: ['awesome', 'picasso']
  },
  painting2: {
    title: 'Untitled',
    description: "We don't know who painted this.",
    price: 20000,
    quantity: 1,
    tags: ['black', 'white', 'untitled']
  }
})

const reviews = seed(Review, {
  review1: {
    title: 'Painting 1',
    text: 'Nice Painting! Definetely worth the price!!',
    rating: 5,
    product_id: 1,
  },
  review2: {
    title: 'Painting 2',
    text: 'This painting is a great painting by Pablo Picasso.',
    rating: 3,
    product_id: 1,
  },
    review3: {
    title: 'Painting 2',
    text: 'What is this painting? I do not know why I purchased it',
    rating: 2,
    product_id: 1,
  }
})

// const favorites = seed(Favorite,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({users, products}) => ({
//     // The easiest way to seed associations seems to be to just create rows
//     // in the join table.
//     'obama loves surfing': {
//       user_id: users.barack.id,    // users.barack is an instance of the User model
//                                    // that we created in the user seed above.
//                                    // The seed function wires the promises so that it'll
//                                    // have been created already.
//       thing_id: products.surfing.id  // Same thing for products.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       thing_id: products.smiting.id
//     },
//     'obama loves puppies': {
//       user_id: users.barack.id,
//       thing_id: products.puppies.id
//     },
//     'god loves puppies': {
//       user_id: users.god.id,
//       thing_id: products.puppies.id
//     },
//   })
// )

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, products, reviews})
