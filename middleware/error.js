module.export = function errorHandler(err) {
  console.log(err);
  return res.status(500).json({
    message: "Internal server error",
  });
};
