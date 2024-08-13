const assetController = require("../controllers/assetController")

const routes = [
  {
    method: "GET",
    path: "/asset",
    handler: assetController.getAllAssets,
  },
  {
    method: "POST",
    path: "/asset",
    handler: assetController.createAsset,
  },
  {
    method: "GET",
    path: "/asset/{id}",
    handler: assetController.getAssetById,
  },
  {
    method: "PUT",
    path: "/asset/{id}",
    handler: assetController.updateAsset,
  },
  {
    method: "DELETE",
    path: "/asset/{id}",
    handler: assetController.deleteAsset,
  },
]

module.exports = routes
