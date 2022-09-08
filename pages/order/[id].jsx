import styles from "../../styles/Order.module.scss";
import Image from "next/image";
import axios from "axios";

const Order = ({order}) => {
  const status = order.status;
  console.log(order.products)

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr className={styles.tr} key={product._id}>
                  <td>
                    <div className={styles.image}>
                      <Image
                        src={product.product.img}
                        alt=""
                        width={50}
                        height={50}
                        objectFit="cover"
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{product.product.title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {product.extras?.map((extra) => (
                        <span key={extra._id}>{extra.text}</span>
                      ))}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>{product.price}</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.total}>
                      {product.price * product.quantity} zł
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.customer}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td>
                  <span className={styles.total}>{order.total} zł</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/bill.svg" width={30} height={30} />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image src="/img/check.png" width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/cooking.svg" width={30} height={30} />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image src="/img/check.png" width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/delivery-man.svg" width={30} height={30} />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image src="/img/check.png" width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.svg" width={30} height={30} />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image src="/img/check.png" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> {order.total} zł
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b> 0 zł
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b> {order.total} zł
          </div>
          <button className={styles.button}>PAID</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/orders/${params.id}`
  );

  return {
    props: {
      order: res.data,
    },
  };
};

export default Order;
