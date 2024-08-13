const User = require("../models/user")

const getAllUsers = async (request, h) => {
  try {
    const users = await User.find().lean()
    return h.response(users)
  } catch (err) {
    return h.response({error: err.message}).code(500)
  }
}

const createUser = async (request, h) => {
  try {
    const newUser = new User(request.payload)
    const savedUser = await newUser.save()
    return h.response(savedUser).code(201)
  } catch (err) {
    return h.response({error: err.message}).code(500)
  }
}

const getUserById = async (request, h) => {
  try {
    const id = request.params.id
    const user = await User.findById({_id: id})

    if (!user) {
      return h.response({error: "User not found"}).code(404)
    }

    return h.response(user).code(200)
  } catch (err) {
    return h.response({error: err.message}).code(500)
  }
}

const updateUser = async (request, h) => {
  try {
    const id = request.params.id
    const {name} = request.payload
    const user = await User.findByIdAndUpdate({_id: id}, {name})

    if (!user) {
      return h.response({error: "User not found"}).code(404)
    }

    return h.response(user).code(200)
  } catch (err) {
    return h.response({error: err.message}).code(500)
  }
}

const deleteUser = async (request, h) => {
  try {
    const id = request.params.id
    const user = await User.findByIdAndDelete({_id: id})

    if (!user) {
      return h.response({error: "User not found"}).code(404)
    }

    return h.response(user).code(200)
  } catch (err) {
    return h.response({error: err.message}).code(500)
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
}
