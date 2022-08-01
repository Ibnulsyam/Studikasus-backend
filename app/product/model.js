const mongose = require("mongoose");
const { model, Schema } = mongose;

const productSchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Panjang nama makanan minimal 3 karakter"],
      required: [true, "Nama makanan harus diisi"],
    },
    description: {
      type: String,
      minlength: [10, "Panjang descripsi minimal 10 karakter"],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    tags: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
