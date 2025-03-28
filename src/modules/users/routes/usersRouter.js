const { Router } = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  seedUser,
} = require("../controllers/usersController");

const usersRouter = Router();

usersRouter.route("/").get(getUsers).post(createUser);
usersRouter.route("/seed").post(seedUser);

usersRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = usersRouter;
