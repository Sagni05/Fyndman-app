import { User } from "../model/usermodel.js";
import { special } from "./spliteDescription.js";

//calculate function
function calculatePercentage(arr) {
  let res = [];

  arr.forEach((item) => res.push(item.value));

  let sum = res.reduce((item, value) => item + value, 0);

  return Math.round((sum / arr.length / 3) * 100);
}

const createUsers = async (req, res, next) => {
  try {
    console.log(req.body);
    let { name, mail } = req.body;
    console.log(name, typeof name);
    name = name.toLowerCase();
    mail = mail.toLowerCase();
    const user = await User.create({ name, mail });
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const findAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
    users[0].topics.forEach(
      (item) => (item.percent = calculatePercentage(item.description))
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const findOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let { name } = req.body;
    name = name.toLowerCase();
    const user = await User.findByIdAndUpdate(
      req.params,
      { name },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const findUserName = async (req, res, next) => {
  try {
    let { name } = req.params;
    name = name.toLowerCase();
    // console.log(name, typeof name);
    // console.log(req.params);
    const user = await User.findOne({ name });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

//new
const addTopic = async (req, res) => {
  console.log(req.params, "params");
  console.log(req.body, "body");
  //adding topic
  const user = await User.findById(req.params);
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("plz provide title and description");
  }

  let splitedDescription = special(description);
  console.log(splitedDescription);
  user.topics.push({ title, description: splitedDescription });
  console.log(user, "user");
  const updateTopics = await user.save();

  res.status(201).json({
    status: "success",
    data: updateTopics,
  });
};

const userSelectedTopic = async (req, res) => {
  const { title, desc_id, value } = req.query;
  const { _id } = req.params;
  if (!_id) {
    res.status(500);
    throw new Error("topics must have a user id");
  }
  //find the user who wants to add topic
  const user = await User.findById({ _id: _id });
  if (!user) {
    res.status(400);
    throw new Error(" not a valid user");
  }

  //filter users selected topic
  const topic = user.topics.filter((item) => item.title === title);
  if (topic.length == 0) {
    res.status(400);
    throw new Error("no topic found");
  }

  //filtering selected chunk of description

  const selectedDesc = topic[0].description.filter(
    (item) => item._id == desc_id
  );
  if (selectedDesc.length == 0) {
    res.status(400);
    throw new Error("bad selection");
  }

  if (value > 3) {
    res.status(400);
    throw new Error("value must be in range 0-3");
  }
  //updating value and saving

  selectedDesc[0].value = value;
  await user.save();
  console.log("selected part successfully updated");
  res.status(201).json({
    status: "success",
    updatedDesc: selectedDesc[0],
  });
};

const findTitleDescription = async (req, res) => {
  //   console.log(req.params);
  const { title } = req.query;
  const { _id } = req.params;
  if (!_id) {
    res.status(403);
    throw new Error("topics must have a user id");
  }
  //find the user who wants to add topic
  const user = await User.findById({ _id });
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  const topic = user.topics.filter((item) => item.title === title);
  if (topic.length == 0) {
    res.status(400);
    throw new Error("no topic found");
  }
  res.status(200).json({
    status: "success",
    Topic: topic,
  });
};

export {
  createUsers,
  findAllUsers,
  findOneUser,
  updateUser,
  findUserName,
  addTopic,
  userSelectedTopic,
  findTitleDescription,
};
