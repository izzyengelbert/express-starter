// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, _) => {
  console.error(err.stack);
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

export default errorMiddleware;
