const getDate = (req, res, next) => {
  const currentDate = new Date();

  currentDate.setTime(
    currentDate.getTime()
  );

  req.currentDate = currentDate;

  return next();
};

export default getDate;
