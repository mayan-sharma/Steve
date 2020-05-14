module.exports = function asyncHandler(res, err) {
  console.log(err);
  return res.status(500).json({
    message: "Internal server error",
  });
};
