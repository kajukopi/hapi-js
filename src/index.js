require("dotenv").config()
const Hapi = require("@hapi/hapi")
const config = require("./config/config")
const Vision = require("@hapi/vision")
const mongoose = require("mongoose")
const http = require("http")

;(async function init(callback) {
  const server = Hapi.server({
    port: config.PORT,
    host: "localhost",
    autoListen: true,
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
  const userRoutes = require("./routes/userRoutes")
  const assetRoutes = require("./routes/assetRoutes")
  const serviceRoutes = require("./routes/serviceRoutes")

  server.route(userRoutes)
  server.route(assetRoutes)
  server.route(serviceRoutes)

  await mongoose.connect(config.DATABASE_URL)

  callback(server)
})(async (server) => {
  const port = config.normalizePort(config.PORT)
  const httpServer = http.createServer(server.listener)

  httpServer.listen(port, async () => {
    await server.start()
    console.log(`HTTP httpServer running at http://${server.settings.host}:${server.settings.port}/`)
  })

  httpServer.on("error", config.onError)
}).catch((err) => {
  console.error("Failed to start the server:", err)
  process.exit(1)
})
