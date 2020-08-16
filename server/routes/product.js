const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

let upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장해준다
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    // 검색 상품 정보를 가져옴
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, productInfo });
      });
  } else {
    // 모든 상품 정보를 가져옴
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, productInfo });
      });
  }
});

router.get("/product_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type == "array") {
    productIds = productIds.map((item) => JSON.parse(item).id);
  }

  console.log("backend", productIds);
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).send(product);
    });
});

module.exports = router;
