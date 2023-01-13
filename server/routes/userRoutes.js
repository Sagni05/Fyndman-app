import express from "express";
import {
  createUsers,
  findAllUsers,
  findOneUser,
  findUserName,
  addTopic,
  userSelectedTopic,
  findTitleDescription,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(findAllUsers).post(createUsers);

router.route("/:_id").get(findOneUser).put(userSelectedTopic);

router.route("/updateUser/:_id").post(addTopic);

router.route("/:name").post(findUserName);

router.route("/titleDescription/:_id").get(findTitleDescription);

export default router;
