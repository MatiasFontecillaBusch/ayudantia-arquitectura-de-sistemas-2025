const catchAsync = require("../utils/catchAsync");
const prisma = require("../database/prisma");
const { status } = require("@grpc/grpc-js");
const userCreationEvent = require("../queue/producers/usersProducer");

const GetAllUsers = catchAsync(async (call, callback) => {
  const users = await prisma.users.findMany();
  return callback(null, { data: users });
});

const ReadUser = catchAsync(async (call, callback) => {
  const user = await prisma.users.findUnique({
    where: { id: call.request.id },
  });
  if (!user) {
    return next(new AppError("Usuario no encontrado", 404));
  }
  return callback(null, user);
});

const CreateUser = catchAsync(async (call, callback) => {
  const { name, lastName, email, rol } = call.request;
  if (!name || !email) {
    return next(new AppError("Faltan campos requeridos", 400));
  }
  const newUser = await prisma.users.create({
    data: { name, lastName, email, rol },
  });
  await userCreationEvent(newUser);
  return callback(null, newUser);
});

const UpdateUser = catchAsync(async (call, callback) => {
  const { name, lastName, email, rol, id } = call.request;

  const updatedUser = await prisma.users.update({
    where: { id: id },
    data: { name, lastName, email, rol },
  });

  if (!updatedUser) {
    throw new AppError("Usuario no encontrado", status.NOT_FOUND);
  }
  return callback(null, updatedUser);
});

const DeleteUser = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const user = await prisma.users.update({
    where: { id: id },
    data: { deletedAt: new Date() },
  });
  if (!user) {
    throw new AppError("Usuario no encontrado", status.NOT_FOUND);
  }
  return callback(null, { success: true });
});

const usersService = {
  GetAllUsers,
  ReadUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
};

module.exports = usersService;
