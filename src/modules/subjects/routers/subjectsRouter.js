const { Router } = require("express");
const {
  getAllSubjects,
  createSubject,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
} = require("../controllers/subjectsController");

const subjectsRouter = Router();

/**
 * Son dos formas de definir un router, hacen lo mismo
 */

// subjectsRouter.get("/", getAllSubjects);
// subjectsRouter.post("/", createSubject);

subjectsRouter.route("/").get(getAllSubjects).post(createSubject);

// /subjects/asfsafa id = asfsafa en req.params.id
subjectsRouter
  .route("/:id")
  .get(getSubjectById)
  .patch(updateSubjectById)
  .delete(deleteSubjectById);

module.exports = subjectsRouter;
