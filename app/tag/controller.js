const Tag = require("./model");

const index = async (req, res, next) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const tag = await Tag.find().skip(parseInt(skip)).limit(parseInt(limit));
    return res.json(tag);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = new Tag(payload);
    await tag.save();
    return res.json(tag);
  } catch (err) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        field: err.errors,
      });
    }

    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    let tag = await Tag.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(tag);
  } catch (err) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        field: err.errors,
      });
    }

    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    let tag = await Tag.findByIdAndDelete(id);
    return res.json(tag);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
