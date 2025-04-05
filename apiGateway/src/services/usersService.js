const catchAsync = require("../utils/catchAsync");

const GetAllUsers = catchAsync(async (req, res, next) => {
  req.app.locals.usersClient.GetAllUsers({}, (error, response) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(response);
  });
});

const ReadUser = catchAsync(async (req, res, next) => {
  const { id } = req.user.data;
  const usersClient = req.app.locals.usersClient;

  usersClient.ReadUser({ id }, (error, response) => {
    if (error) {
      return next(error);
    }
    res.status(200).json(response);
  });
});

const CreateUser = catchAsync(async (req, res, next) => {
  const usersClient = req.app.locals.usersClient;

  usersClient.CreateUser({ ...req.body }, (error, response) => {
    if (error) {
      return next(error);
    }

    console.log(response);
    res.status(200).json(response);
  });
});

const UpdateUser = catchAsync(async (req, res, next) => {
  const usersClient = req.app.locals.usersClient;
  const { id } = req.params;

  usersClient.UpdateUser({ id, ...req.body }, (error, response) => {
    if (error) {
      return next(error);
    }

    console.log(response);
    res.status(200).json(response);
  });
});

const DeleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.user.data;
  const usersClient = req.app.locals.usersClient;

  usersClient.DeleteUser({ id }, (error, response) => {
    if (error) {
      return next(error);
    }
    res.status(200).json(response);
  });
});

const usersService = {
  GetAllUsers,
  ReadUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
};

module.exports = usersService;
