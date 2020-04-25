module.export = function asyncHandler(err) {
  console.log(err);
  return res.status(500).json({
    message: "Internal server error",
  });
};
