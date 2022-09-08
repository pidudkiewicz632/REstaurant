import styles from "../styles/Navbar.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.callButton}>
            <Image
              src="/img/phone-call.svg"
              alt="Order Phone"
              width="32"
              height="32"
            />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>ORDER NOW</div>
            <div className={styles.text}>432 324 324</div>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href="/">
              <li className={styles.listItem}>Home</li>
            </Link>
            <Link href="/product">
              <li className={styles.listItem}>Products</li>
            </Link>
            <Image src="/img/banner.svg" width="400" height="170" alt="baner"/>
            <li className={styles.listItem}>Blog</li>
            <li className={styles.listItem}>Contact</li>
          </ul>
        </div>
        <div className={styles.item}>
          <Link href="/cart">
            <div className={styles.cart}>
              <Image src="/img/shopping-cart.svg" width="80" height="80" />
              <div className={styles.cartCounter}>{quantity}</div>
            </div>
          </Link>
          <div className={styles.menu} onClick={() => setOpen(true)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.sidebar} ${
          open ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.close} onClick={() => setOpen(false)}></div>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Image src="/img/logo.svg" width="70px" height="70px" />
          </li>
          <Link href="/">
            <li className={styles.listItem}>Home</li>
          </Link>
          <Link href="/product">
            <li className={styles.listItem}>Products</li>
          </Link>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
