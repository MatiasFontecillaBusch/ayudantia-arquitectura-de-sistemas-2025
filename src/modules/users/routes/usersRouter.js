const { Router } = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const usersRouter = Router();

usersRouter.route("/").get(getUsers).post(createUser);

usersRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = usersRouter;
