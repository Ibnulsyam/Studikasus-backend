const mongose = require("mongoose");
const { model, Schema } = mongose;

const tagSchema = Schema({
  name: {
    type: String,
    minlength: [3, "Panjang category minimal 3 karakter"],
    maxlength: [20, "Panjang category maximal 20 karakter"],
    required: [true, "Nama category harus diisi"],
  },
});

module.exports = model("Tag", tagSchema);
