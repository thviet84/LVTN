const mongoose = require("mongoose");
const importCouponSchema = new mongoose.Schema(
  {
    total: Number,
    nhanvien: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admins",
    },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        name: { type: String, trim: true },
        price: { type: Number },
        image: { type: String, trim: true },
        describe: { type: String, trim: true },
        soluong: { type: Number },
        giatien: { type: Number },
        status: { type: Boolean },
        ghichu: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const ImportCoupon = mongoose.model("importCoupon", importCouponSchema);
module.exports = ImportCoupon;
