const mongoose = require("mongoose"); // mongoose modülünü (ki bu bir dış kütüphanedir) projenize dahil ediyorsunuz.

const BillSchema = mongoose.Schema(
  {
    customerName: { type: String, require: true },
    customerPhoneNumber: { type: String, require: true },
    paymentMode: { type: String, require: true },
    cartItems: { type: Array, require: true }, //birden fazla eleamn döndüreceğiz diye array diye type alıyoruz
    subTotal: { type: Number, require: true }, //toplama .çıkartma yapcaz yauh
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
  },
  { timestamps: true } // Burada timestamps ekliyoruz
);

const Bill = mongoose.model("bills", BillSchema);

module.exports = Bill;
