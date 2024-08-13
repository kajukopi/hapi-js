const Hapi = require("@hapi/hapi")
const config = require("./config/config")
const Vision = require("@hapi/vision")
const mongoose = require("mongoose")
const http = require("http")

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
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

  await mongoose.connect(config.DATABASE_URL)

  // Create the HTTP server using Node's http module
  const httpServer = http.createServer(server.listener)

  // Start the HTTP server
  httpServer.listen(config.normalizePort(server.settings.port), server.settings.host, () => {
    console.log(`Server running at http://${server.settings.host}:${server.settings.port}/`)
  })

  httpServer.on("error", config.onError)
  
  // Start the server
  await server.initialize()
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
