const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err.errors && err.errors.length > 0) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    res.status(400).json({ message: "Invalid request" });
  }
};

module.exports = validateRequest;