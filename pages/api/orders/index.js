import dbConnect from "../../../util/mongoDb";
import Order from "../../../models/Order";
import OrderProduct from "../../../models/OrderProducts";

const handler = async (req, res) => {
  const { method } = req;

  const db = await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    const { address, customer, method, total, products } = req.body;
    const orderData = { address, customer, method, total };

    const session = await db.startSession();

    try {
      await session.startTransaction();

      const order = new Order(orderData);

      await order.save({session});

      const productsToCreate = products.map(
        (product) => {
          return {
            order: order._id,
            product: product._id,
            quantity: product.quantity,
            price: product.price,
          };
        }
      );

      console.log(productsToCreate);

      await OrderProduct.create(productsToCreate, {session});

      await session.commitTransaction();

      res.status(201).json(order);
    } catch (err) {
      console.log("----------------------------------------------------------------------------------------------------------------------------------------")
      console.log(err);
      console.log(
        "----------------------------------------------------------------------------------------------------------------------------------------"
      );
      await session.abortTransaction();
      res.status(500).json(err);
    } finally {
      session.endSession();
    }
  }
};

export default handler;
