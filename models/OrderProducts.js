import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderProductSchema = new mongoose.Schema(
  {
    order: {
      type: ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.models.OrderProduct ||
  mongoose.model("OrderProduct", OrderProductSchema);
