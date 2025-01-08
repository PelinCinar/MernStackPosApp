const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

//!Get All Category
router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find(); //vt içerisinde verileri bize tek tek getirmesi için find. Categoryi bul categoriese at sonrasında categories içerisindekileri getirmesini yzdr
    // res.send(categories); //bulduklarını getirmesi için yazdık
    res.status(200).json(categories);
  } catch (error) {
      res.status(500).json(error);
  }
});

//!Create
router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body); //input alanı içerisindeki değerlerimiz body olark algılanıyor örenğşin yani bodyle yakalayıp newcategorye atıyoruz.
    await newCategory.save(); //save diyerek veritabına kaydetmesini söylüyoruz
    res.status(200).json("Item added succcessfully."); //mesjaa fırlattık
  } catch (error) {
      res.status(500).json(error);
  }
});

//!Update
router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body); //burada bodyden değer gönderdik
    res.status(200).json("Item updated succcessfully.");
  } catch (error) {
      res.status(500).json(error);
  }
});

//!Delete
router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("Item deleted succcessfully.");
  } catch (error) {
      res.status(500).json(error);
  }
});

module.exports = router; //server içerisinde çağırmak lazım bu exportladıks
