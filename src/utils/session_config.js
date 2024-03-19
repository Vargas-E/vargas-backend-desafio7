const MongoStore = require("connect-mongo");

const config = {
    secret: "secretcoder",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://vargasivanezequiel:coderhouse@cluster0.sybi3ex.mongodb.net/e-commerce?retryWrites=true&w=majority",
      ttl: 100,
    }),
  }

module.exports = config;