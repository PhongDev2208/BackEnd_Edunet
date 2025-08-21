const Categories = require("../model/categories.model");

module.exports.GetAll = async (req, res) => {
  try {
    const dataCategories = await Categories.find({
      deleted: false,
    });
    return res.json({
      status: true,
      type: "User",
      error: null,
      data: dataCategories,
    });
  } catch (error) {
    return res.json({
      status: false,
      type: "User",
      error: 5000,
      data: null,
    });
  }
};
