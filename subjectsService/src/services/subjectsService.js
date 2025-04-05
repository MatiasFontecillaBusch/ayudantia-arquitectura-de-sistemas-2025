// req tiene el cuerpo, parámetros e id por ejemplo
// req.body
// req.params
// req.query

const { status } = require("@grpc/grpc-js");
const catchAsync = require("../utils/catchAsync");
const Subjects = require("../database/models/subjectsModel");
const { default: AppError } = require("../../../apiGateway/src/utils/appError");

// res es la respuesta tiene status, json, etc.
const GetAllSubjects = catchAsync(async (call, callback) => {
  const subjects = await Subjects.find();
  return callback(null, { data: subjects });
});

const createSubject = catchAsync(async (call, callback) => {
  const { name } = call.request;
  if (!name) {
    throw new AppError("Datos ingresados no validos", status.INVALID_ARGUMENT);
  }

  const subject = await Subjects.create({ name });
  return callback(null, subject);
});

const ReadSubject = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const subject = await Subjects.findOne({ id: id });
  if (!subject) {
    return next(new AppError("Asignatura no encontrada", 404));
  }
  return callback(null, subject);
});

const UpdateSubject = catchAsync(async (call, callback) => {
  const { name, id } = call.request;
  console.log(id);
  console.log(call.request);
  const subject = await Subjects.findOneAndUpdate(
    { id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!subject) {
    throw new AppError("Asignatura no encontrada", status.NOT_FOUND);
  }
  return callback(null, subject);
});

const DeleteSubject = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const subject = await Subjects.findOneAndUpdate(
    { id: id },
    { deletedAt: new Date() }
  );

  if (!subject) {
    throw new AppError("Asignatura no encontrada", status.NOT_FOUND);
  }
  return callback(null, { success: true });
});

const subjectsService = {
  GetAllSubjects,
  createSubject,
  ReadSubject,
  UpdateSubject,
  DeleteSubject,
};

module.exports = subjectsService;
