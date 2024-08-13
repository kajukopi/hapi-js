const Hapi = require("@hapi/hapi")
const config = require("./config/config")
const Vision = require("@hapi/vision")
const Path = require("path")
const mongoose = require("mongoose")

const init = async () => {
  await mongoose.connect(config.dbUrl)

  const server = Hapi.server({
    port: config.port, // Set the port here
    host: "localhost",
  })

  await server.register(Vision)

  server.views({
    engines: {
      hbs: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "views",
    layout: true,
    layoutPath: "views/layout",
  })

  // Register routes
  const routes = require("./routes/userRoutes")
  server.route(routes)

  // Start the server
  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
