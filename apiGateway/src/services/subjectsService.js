const catchAsync = require("../utils/catchAsync");

// res es la respuesta tiene status, json, etc.
const GetAllSubjects = catchAsync(async (req, res, next) => {
  req.app.locals.subjectsClient.GetAllSubjects({}, (error, response) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(response);
  });
});

const createSubject = catchAsync(async (req, res, next) => {
  const subjectsClient = req.app.locals.subjectsClient;

  subjectsClient.createSubject({ ...req.body }, (error, response) => {
    if (error) {
      return next(error);
    }

    console.log(response);
    res.status(200).json(response);
  });
});

const ReadSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subjectsClient = req.app.locals.subjectsClient;

  subjectsClient.ReadSubject({ id }, (error, response) => {
    if (error) {
      return next(error);
    }
    res.status(200).json(response);
  });
});

const UpdateSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subjectsClient = req.app.locals.subjectsClient;

  console.log(req);
  subjectsClient.UpdateSubject({ id, ...req.body }, (error, response) => {
    if (error) {
      return next(error);
    }

    res.status(200).json(response);
  });
});

const DeleteSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subjectsClient = req.app.locals.subjectsClient;

  subjectsClient.DeleteSubject({ id }, (error, response) => {
    if (error) {
      return next(error);
    }
    res.status(204).end();
  });
});

const subjectsService = {
  GetAllSubjects,
  createSubject,
  ReadSubject,
  UpdateSubject,
  DeleteSubject,
};

module.exports = subjectsService;
