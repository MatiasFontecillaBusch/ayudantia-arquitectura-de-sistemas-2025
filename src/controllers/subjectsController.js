const subjects = [
  { id: 0, name: "Arquitectura de Sistemas" },
  { id: 1, name: "Redes de Computadores" },
  { id: 2, name: "Proyecto Integrador Gestión TI" },
  { id: 3, name: "Gestión de Proyectos TI" },
];
let currentId = 4;

// req tiene el cuerpo, parámetros e id por ejemplo
// req.body
// req.params
// req.query
// res es la respuesta tiene status, json, etc.
const getAllSubjects = (req, res) => {
  res.status(200).json(subjects);
};

const createSubject = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Debe ingresar un nombre" });
  }
  const nuevaAsignatura = { name, id: currentId };
  currentId++;
  subjects.push(nuevaAsignatura);
  return res.status(201).json(nuevaAsignatura);
};

const getSubjectById = (req, res) => {
  // req.paras.id es el valor que este en una URL
  // /subjects/4 entonces req.paras.id = 4
  const subject = subjects.find((a) => a.id === parseInt(req.params.id));
  if (!subject) {
    return res.status(404).json({ error: "Asignatura no encontrada" });
  }

  res.json(subject);
};

const updateSubjectById = (req, res) => {
  const subject = subjects.find((a) => a.id === parseInt(req.params.id));
  if (!subject)
    return res.status(404).json({ error: "Asignatura no encontrada" });

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Se requiere el nuevo name" });
  }

  subject.name = name;
  res.json(subject);
};

const deleteSubjectById = (req, res) => {
  const index = subjects.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Asignatura no encontrada" });
  }

  subjects.splice(index, 1);
  res.status(204).end();
};

module.exports = {
  getAllSubjects,
  createSubject,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
};
