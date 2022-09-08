import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OrderSchema.virtual("products", {
  ref: "OrderProduct",
  localField: "_id",
  foreignField: "order",
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
