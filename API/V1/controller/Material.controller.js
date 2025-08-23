const Material = require("../model/material.model.js");
const MaterialChild = require("../model/materialChild.model.js");
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper.js");
const validate = require("../middleware/validate.js");

module.exports.Post = async (req, res) => {
  try {
    const { title, course_id, position } = req.body;
    const requiredFields = ["title", "course_id", "position"];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (respondValidate == false) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }

    const materialObject = {
      title: title,
      course_id: course_id,
      position: parseInt(position),
      created_at: helper.timenow(),
    };

    const newMaterial = new Material(materialObject);
    await newMaterial.save();
    return res.json({
      status: true,
      type: "Material",
      error: null,
      data: null,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Material",
      error: 500,
      data: null,
    });
  }
};

module.exports.PostChildren = async (req, res) => {
  try {
    const { resource_id, title, link, position, file } = req.body;
    const requiredFields = ["resource_id", "title", "link", "position", "file"];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (respondValidate == false) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const childObject = {
      resource_id: resource_id,
      title: title,
      link: link,
      position: position,
      file: file,
      created_at: helper.timenow(),
    };
    const newChild = new MaterialChild(childObject);
    await newChild.save();

    return res.json({
      status: true,
      type: "Material",
      error: null,
      data: null,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }

    return res.json({
      status: false,
      type: "Material",
      error: 500,
      data: null,
    });
  }
};

module.exports.GetAll = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }

    const materials = await Material.find({
      course_id: id,
    })
      .sort({ position: 1 })
      .lean();

    for (const item of materials) {
      const child = await MaterialChild.find({
        resource_id: item._id,
      })
        .sort({ position: 1 })
        .lean();
      item.Child = child;
    }

    return res.json({
      status: true,
      type: "Material",
      error: null,
      data: materials,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Material",
      error: 500,
      data: null,
    });
  }
};
