const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in');
  }
  next();
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`);
  }
  next();
}

// NEED TO TEST
const forbidden = message => (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).send(message);
  }
  next();
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = { mustBeLoggedIn, selfOnly, forbidden }
