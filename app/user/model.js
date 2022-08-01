const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

let userSchema = Schema(
  {
    full_name: {
      type: String,
      required: [true, "Nama harus diisi"],
      minlength: [3, "Panjang harus antara 3 - 255 karakter"],
      maxlength: [255, "Panjang harus antara 3 - 255 karakter"],
    },

    customer_id: {
      type: Number,
    },

    email: {
      type: String,
      required: [true, "Email harus diisi"],
      maxlength: [255, "Email  maximal 255 karakter"],
    },

    password: {
      type: String,
      required: [true, "Password harus diisi"],
      minlength: [8, "Password minimal 8 karakter"],
      maxlength: [255, "Password maximal 255 karakter"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    token: [String],
  },
  { timestemps: true }
);

userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email yang valid`
);

userSchema.path("email").validate(
  async function (value) {
    try {
      //(1) lakukan pencarian ke -collection_ User berdasarkan 'email'
      const count = await this.model("User").count({ email: value });

      //(2) kode ini mengidikasikan bahwa jika user ditemukan maka akan mengembalikan 'false' jika tidak ditemukan mengemabalikan true
      //jika "false" maka validasi gagal
      //jika "true" maka validasi berhasil
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);
