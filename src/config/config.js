require("dotenv").config()
function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening(server) {
  const addr = server.address()
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  console.log("App started. Listening on " + bind)
}

module.exports = {
  port: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/newDataBase",
  onError,
  onListening,
  normalizePort,
}
