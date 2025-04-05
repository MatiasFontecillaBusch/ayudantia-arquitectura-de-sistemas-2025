const { Router } = require("express");
const {
  GetAllUsers,
  CreateUser,
  UpdateUser,
  DeleteUser,
  ReadUser,
} = require("../services/usersService");

const usersRouter = Router();

usersRouter.route("/").get(GetAllUsers).post(CreateUser);

usersRouter.route("/:id").patch(UpdateUser).delete(DeleteUser).get(ReadUser);

module.exports = usersRouter;
