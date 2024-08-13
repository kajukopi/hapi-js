const Boom = require("@hapi/boom")
const Asset = require("../models/asset")

const getAllAssets = async (request, h) => {
  try {
    const assets = await Asset.find().lean()
    return h.response(assets)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

const createAsset = async (request, h) => {
  try {
    const newAsset = new Asset(request.payload)
    const savedAsset = await newAsset.save()
    return h.response(savedAsset).code(201)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

const getAssetById = async (request, h) => {
  try {
    const id = request.params.id
    const asset = await Asset.findById({_id: id})

    if (!asset) {
      return Boom.notFound("User not found")
    }

    return h.response(asset).code(200)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

const updateAsset = async (request, h) => {
  try {
    const id = request.params.id
    const {name} = request.payload
    const asset = await Asset.findByIdAndUpdate({_id: id}, {name})

    if (!asset) {
      return Boom.notFound("User not found")
    }

    return h.response(asset).code(200)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

const deleteAsset = async (request, h) => {
  try {
    const id = request.params.id
    const asset = await Asset.findByIdAndDelete({_id: id})

    if (!asset) {
      return Boom.notFound("User not found")
    }

    return h.response(asset).code(200)
  } catch (err) {
    return Boom.badRequest(err)
  }
}

module.exports = {
  getAllAssets,
  createAsset,
  getAssetById,
  updateAsset,
  deleteAsset,
}
