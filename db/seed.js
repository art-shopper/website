'use strict'

const db = require('APP/db')
    , {User, Product, Review, Order, OrderItem, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
  }

  seeded.reviews = reviews(seeded)
  seeded.orders = orders(seeded)
  seeded.orderItems = orderItems(seeded)

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
  omri: {
    first_name: 'Omri',
    last_name: 'Bernstein',
    email: 'omri@omri.omri',
    password: '123',
    is_admin: false
  },
  yoonahbrow: {
    first_name: 'Yoo-Nah',
    last_name: 'Park',
    email: 'yuna@luna.luna',
    password: '123',
    is_admin: false
  },
})

const products = seed(Product, {
  painting1: {
    title: 'Peaceful Reflections',
    description: "One of Bob's legendary pictures. The light is shown pouring from the heavens.",
    year: 1991,
    image: 'https://s-media-cache-ak0.pinimg.com/originals/02/6c/47/026c47ad36933184efcb93dc5767d63b.jpg',
    price: 240000,
    quantity: 1,
    tags: ['mountains', 'trees', 'lake', 'water', 'timeless']
  },
  painting2: {
    title: 'Quiet Clearing',
    description: 'Critics lauded the use of chiaroscuro in this painting as groundbreaking.',
    year: 1983,
    image: 'https://s-media-cache-ak0.pinimg.com/736x/e4/b6/59/e4b65938e0cc90f694ce0593485a8001.jpg',
    price: 120000,
    quantity: 1,
    tags: ['trees', 'shadows', 'reflections', 'clouds', 'dark']
  },
  painting3: {
    title: 'Bobby and the Campfire',
    description: 'One of the few paintings Bob made that portrayed the human form.',
    year: 1986,
    image: 'https://espnfivethirtyeight.files.wordpress.com/2014/04/campfire_banner1.jpg?quality=90&strip=all&w=575&ssl=1',
    price: 300000,
    quantity: 1,
    tags: ['campfire', 'trees', 'devastatingly-red', 'awesome']
  },
  painting4: {
    title: 'After a Winter Storm',
    description: 'The great blizzard of 1986 inpsired Bob to make this iconic painting of a wintry expanse.',
    year: 1986,
    image: 'http://d3rde5ck80dcsn.cloudfront.net/wp-content/uploads/2015/12/4.jpg',
    price: 1500000,
    quantity: 1,
    tags: ['winter', 'trees', 'pine', 'road', 'snowy']
  },
  painting5: {
    title: 'Self-Portrait',
    description: 'In the later years of his career, he composited one of the greatest self-portraits of all time.',
    year: 1991,
    image: 'https://i.imgur.com/lH6zsxr.jpg',
    price: 50402030,
    quantity: 1,
    tags: ['bob', 'ross', 'how-did-he-do-it', 'legendary']
  },
  painting6: {
    title: 'Untitled',
    description: "We don't know who painted this but we are selling it anyway.",
    year: 1590,
    image: 'http://www.louvre.fr/sites/default/files/imagecache/940x768/medias/medias_images/images/louvre-portrait-de-lisa-gherardini-epouse-de-francesco-del-giocondo-dite-monna-lisa-la-gioconda-ou-la-jocon.jpg',
    price: 200000000,
    quantity: 1,
    tags: ['famous', 'yellow', 'untitled', 'wow']
  },
})

const reviews = seed(Review,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  ({users, products}) => ({
    review1: {
      title: 'Wow, Awesome Painting',
      text: 'This is a great painting, and it is definitely worth the price!! I love how peaceful this is.',
      rating: 5,
      product_id: products.painting1.id,
      user_id: users.omri.id
    },
    review2: {
      title: 'Great lake but bad shipping',
      text: 'This lake is so beautifully represented. But the edges of the painting were kind of frayed when I received it.',
      rating: 3,
      product_id: products.painting2.id,
      user_id: users.yoonahbrow.id
    },
    review3: {
      title: 'Why did I do this...',
      text: 'What is this painting? I do not know why I purchased it.',
      rating: 2,
      product_id: products.painting6.id,
      user_id: users.omri.id
    },
    review4: {
      title: 'I really really like this painting',
      text: 'Sometimes I cry because this painting is so beautiful.',
      rating: 2,
      product_id: products.painting5.id,
      user_id: users.yoonahbrow.id
    },
    review5: {
      title: 'Are trees happy?',
      text: 'Nature is magical. Bob harnesses the power of earth and water in this timeless masterpiece.',
      rating: 4,
      product_id: products.painting5.id,
      user_id: users.omri.id
    },
    review6: {
      title: 'Mountains are beautiful',
      text: 'I love how Bob uses red, an unnatural color in a mountain setting, to create an extremely compelling effect.',
      rating: 5,
      product_id: products.painting1.id,
      user_id: users.yoonahbrow.id
    }
  })
)

const orders = seed(Order,
  ({users}) => ({
    order1: {
      id: 13401591,
      email: 'omri@omri.omri',
      status: 'shipped',
      user_id: users.omri.id
    },
    order2: {
      id: 13401592,
      email: 'omri@omri.omri',
      status: 'ordered',
      user_id: users.omri.id
    },
    order3: {
      id: 13401593,
      email: 'yuna@luna.luna',
      status: 'delivered',
      user_id: users.omri.id
    },
    order4: {
      id: 13401594,
      email: 'yuna@luna.luna',
      status: 'lost in delivery',
      user_id: users.yoonahbrow.id
    },
    order5: {
      id: 13401595,
      email: 'guest@guest.com',
      status: 'ordered',
    },
  })
)

const orderItems = seed(OrderItem,
  ({products}) => ({
    order1item1: {
      order_id: 13401591,
      product_id: products.painting1.id,
      quantity: 1,
      current_price: 2400000,
    },
    order1item2: {
      order_id: 13401591,
      product_id: products.painting2.id,
      quantity: 1,
      current_price: 4303400,
    },
    order1item3: {
      order_id: 13401591,
      product_id: products.painting3.id,
      quantity: 1,
      current_price: 3000000,
    },
    order2item1: {
      order_id: 13401592,
      product_id: products.painting1.id,
      quantity: 1,
      current_price: 2400000,
    },
    order3item1: {
      order_id: 13401593,
      product_id: products.painting3.id,
      quantity: 1,
      current_price: 4303400,
    },
    order4item1: {
      order_id: 13401594,
      product_id: products.painting4.id,
      quantity: 1,
      current_price: 9800000,
    },
    order5item1: {
      order_id: 13401595,
      product_id: products.painting6.id,
      quantity: 1,
      current_price: 14000000,
    },
  })
)

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

module.exports = Object.assign(seed, {users, products, reviews, orders, orderItems})
