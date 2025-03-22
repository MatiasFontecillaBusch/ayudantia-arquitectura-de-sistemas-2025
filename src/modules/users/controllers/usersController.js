const prisma = require("../../../database/prisma");
const { default: AppError } = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const getUsers = catchAsync(async (req, res, next) => {
  const users = await prisma.users.findMany();
  res.status(200).json(users);
});

const getUserById = catchAsync(async (req, res, next) => {
  const user = await prisma.users.findUnique({
    where: { id: req.params.id },
  });
  if (!user) {
    return next(new AppError("Usuario no encontrado", 404));
  }
  res.status(200).json(user);
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, lastName, email, rol } = req.body;
  if (!name || !email) {
    return next(new AppError("Faltan campos requeridos", 400));
  }
  const newUser = await prisma.users.create({
    data: { name, lastName, email, rol },
  });
  res.status(201).json(newUser);
});

const updateUser = catchAsync(async (req, res, next) => {
  const { name, lastName, email, rol } = req.body;
  const updatedUser = await prisma.users.update({
    where: { id: req.params.id },
    data: { name, lastName, email, rol },
  });
  res.status(200).json(updatedUser);
});

const deleteUser = catchAsync(async (req, res, next) => {
  await prisma.users.update({
    where: { id: req.params.id },
    data: { deletedAt: new Date() },
  });
  res.status(204).end();
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
