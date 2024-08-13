const assetController = require("../controllers/assetController")

const routes = [
  {
    method: "GET",
    path: "/assets",
    handler: assetController.getAllAssets,
  },
  {
    method: "POST",
    path: "/assets",
    handler: assetController.createAsset,
  },
  {
    method: "GET",
    path: "/assets/{id}",
    handler: assetController.getAssetById,
  },
  {
    method: "PUT",
    path: "/assets/{id}",
    handler: assetController.updateAsset,
  },
  {
    method: "DELETE",
    path: "/assets/{id}",
    handler: assetController.deleteAsset,
  },
]

module.exports = routes
