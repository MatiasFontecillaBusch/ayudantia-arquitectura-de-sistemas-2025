// req tiene el cuerpo, parámetros e id por ejemplo
// req.body
// req.params
// req.query

const Subjects = require("../../../database/models/subjectsModel");
const catchAsync = require("../../../utils/catchAsync");

// res es la respuesta tiene status, json, etc.
const getAllSubjects = catchAsync(async (req, res, next) => {
  const subjects = await Subjects.find();
  res.json(subjects);
});

const createSubject = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    throw new AppError("Se requiere nombre", 400);
  }

  const newSubject = await Subjects.create({ name });
  res.status(201).json(newSubject);
});

const getSubjectById = catchAsync(async (req, res, next) => {
  const subject = await Subjects.findOne({ id: req.params.id });
  if (!subject) {
    return next(new AppError("Asignatura no encontrada", 404));
  }
  res.json(subject);
});

const updateSubjectById = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("Se requiere el nuevo nombre", 400));
  }
  const subject = await Subjects.findOneAndUpdate(
    { id: req.params.id },
    { name },
    { new: true, runValidators: true }
  );
  if (!subject) {
    return next(new AppError("Asignatura no encontrada", 404));
  }
  res.json(subject);
});

const deleteSubjectById = catchAsync(async (req, res, next) => {
  const subject = await Subjects.findOneAndUpdate(
    { id: req.params.id },
    { deletedAt: new Date() }
  );
  if (!subject) {
    return next(new AppError("Asignatura no encontrada", 404));
  }
  res.status(204).end();
});

module.exports = {
  getAllSubjects,
  createSubject,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
};
