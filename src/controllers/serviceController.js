const Boom = require("@hapi/boom")
const Service = require("../models/service")

const getAllServices = async (request, h) => {
  try {
    const services = await Service.find().lean()
    return h.response(services)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

const createService = async (request, h) => {
  try {
    const newService = new Service(request.payload)
    const savedService = await newService.save()
    return h.response(savedService).code(201)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

const getServiceById = async (request, h) => {
  try {
    const id = request.params.id
    const service = await Service.findById({_id: id})

    if (!service) {
      return Boom.notFound("Service not found")
    }

    return h.response(service).code(200)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

const updateService = async (request, h) => {
  try {
    const id = request.params.id
    const {name} = request.payload
    const service = await Service.findByIdAndUpdate({_id: id}, {name})

    if (!service) {
      return Boom.notFound("Service not found")
    }

    return h.response(service).code(200)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

const deleteService = async (request, h) => {
  try {
    const id = request.params.id
    const service = await Service.findByIdAndDelete({_id: id})

    if (!service) {
      return Boom.notFound("Service not found")
    }

    return h.response(service).code(200)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

module.exports = {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
}
