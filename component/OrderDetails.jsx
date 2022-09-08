import { useState } from "react";
import styles from "../styles/OrderDetails.module.scss";

const OrderDetails = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay {total} zł on delivery.</h1>
        <div className={styles.item}>
          <label htmlFor="fullname" className={styles.label}>
            Name Surname
          </label>
          <input
            type="text"
            id="fullname"
            placeholder="John Doe"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          ></input>
        </div>
        <div className={styles.item}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="+4 545 657 656"
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
        </div>
        <div className={styles.item}>
          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <textarea
            rows={5}
            cols={50}
            type="text"
            id="address"
            placeholder="Dluga 42/6, Szczecin"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
