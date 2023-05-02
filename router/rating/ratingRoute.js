import express from "express";
import ratingController from "../../controller/rating/ratingController.js";
import ratingValidate from "../../validator/rating/ratingValidate.js";

const route = express.Router();

route.post("/", ratingValidate.createRating, ratingController.createRating);
route.get("/:id?", ratingController.getRating);
route.patch("/:id", ratingValidate.patchRating, ratingController.editRating);
route.delete("/:id", ratingController.deleteRating);

export default route;
