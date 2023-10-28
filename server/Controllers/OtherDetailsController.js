const OtherDetailsModel = require("../Models/OtherDetailsModel");

const priceUpdateController = async (req, res) => {
  try {
    const { priceUpdated } = req.body;
    if (!priceUpdated) {
      res.status(400).send({ message: "Please provide a valid date" });
    } else {
      const price = await OtherDetailsModel.findOne();
      if (price) {
        price.priceUpdated = priceUpdated;
        await price.save();
      }
      res
        .status(200)
        .send({ success: true, message: "Price date updated successfully" });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while updating last price date",
      error: err.message,
    });
  }
};

const getPriceUpdateController = async (req, res) => {
  try {
    const price = await OtherDetailsModel.findOne();
    if (price) {
      res
        .status(200)
        .send({ success: false, message: "Price Date retrived", price });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Price date not found", error });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while getting last price date",
      error: err.message,
    });
  }
};

module.exports = { getPriceUpdateController, priceUpdateController };
