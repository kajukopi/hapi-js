const serviceController = require("../controllers/serviceController")

const routes = [
  {
    method: "GET",
    path: "/services",
    handler: serviceController.getAllServices,
  },
  {
    method: "POST",
    path: "/services",
    handler: serviceController.createService,
  },
  {
    method: "GET",
    path: "/services/{id}",
    handler: serviceController.getServiceById,
  },
  {
    method: "PUT",
    path: "/services/{id}",
    handler: serviceController.updateService,
  },
  {
    method: "DELETE",
    path: "/services/{id}",
    handler: serviceController.deleteService,
  },
]

module.exports = routes
