const { Router } = require("express");
const {
  GetAllSubjects,
  createSubject,
  UpdateSubject,
  DeleteSubject,
  ReadSubject,
} = require("../services/subjectsService");

const subjectsRouter = Router();

subjectsRouter.route("/").get(GetAllSubjects).post(createSubject);

subjectsRouter
  .route("/:id")
  .patch(UpdateSubject)
  .delete(DeleteSubject)
  .get(ReadSubject);

module.exports = subjectsRouter;
