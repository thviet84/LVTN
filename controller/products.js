const Products = require("../models/products.js");
const fs = require("fs");

const replaceSpacesWithHyphens = (filename) => {
  return filename.replace(/\s+/g, "-");
};

// create
exports.create = async (req, res, next) => {
  try {
    let folderPath =
      "D:/LVTN/Source_mau/LVTN-saling-cars/frontend/public/image/SanPham";
    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    } catch (err) {
      console.error(err);
    }

    // Replace spaces with hyphens in the file name
    const filename = replaceSpacesWithHyphens(req.files.file.name);

    req.files?.file.mv(`${folderPath}/${filename}`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occurred" });
      }
    });

    req.body.status = true;
    req.body.delete = false;
    req.body.image = filename;

    const cars = await Products.create({ ...req.body });
    res.status(200).json({
      status: "create products success",
      data: { cars },
    });
  } catch (error) {
    next(error);
  }
};

// update
exports.update = async (req, res, next) => {
  try {
    var update = {};
    if (!req.files?.file) {
      update = req.body;
    } else {
      // Replace spaces with hyphens in the file name
      const filename = replaceSpacesWithHyphens(req.files.file.name);

      update = { ...req.body, image: filename };

      let folderPath =
        "D:/LVTN/Source_mau/LVTN-saling-cars/frontend/public/image/SanPham";

      req.files.file.mv(`${folderPath}/${filename}`, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error occurred" });
        }
      });
    }

    const cars = await Products.findByIdAndUpdate(
      req.params.id,
      { ...update },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: { cars },
    });
  } catch (error) {
    next(error);
  }
};
//update status
exports.updateStatus = async (req, res, next) => {
  try {
    const cars = await Products.findById(req.params.id);
    cars.status = !cars.status;
    await cars.save();
  } catch (error) {
    next(error);
  }
};
//delete
exports.delete = async (req, res, next) => {
  try {
    const cars = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "deleted",
    });
  } catch (error) {
    next(error);
  }
};
//get all
exports.getAll = async (req, res, next) => {
  try {
    var cars = [];
    const temp = await Products.find().populate("type").populate("nhanvien");
    cars = temp.filter((e) => e.deleted != true);
    res.status(200).json({
      status: "success",
      results: cars.length,
      data: { cars },
    });
  } catch (error) {
    res.json(error);
  }
};
//get one
exports.getOne = async (req, res, next) => {
  try {
    const cars = await Products.findById(req.params.id).populate("type");
    res.status(200).json({
      status: "success",
      data: { cars },
    });
  } catch (error) {
    res.json(error);
  }
};
