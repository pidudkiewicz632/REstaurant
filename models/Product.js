import mongoose from "mongoose";
import { categories } from "../util/product"

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 60,
      validate: {
        validator: function (v) {
          console.log(";;;; " + v);
          return /^[a-zA-Z0-9 -]*$/.test(v);
        },
        message: (props) => "Illegal characters were used!" + a,
      },
    },
    desc: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9 .,-:]*$/.test(value);
        },
        message: "Illegal characters were used!",
      },
    },
    categories: {
      type: [{
        type: String,
        enum: categories,
        default: "New"
      }],
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [
        {
          type: Number,
          min: 0.01,
          required: true,
        },
      ],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 3;
        },
        message: "All prices are required!",
      },
    },
    //TODO: to extraOptions
    extraOption: {
      type: [
        {
          text: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            validate: [
              {
                validator: function (value) {
                  return /^[a-zA-Z0-9 -]*$/.test(value);
                },
                message: "Illegal characters were used!",
              },
            ],
          },
          price: {
            type: Number,
            min: 0.01,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
