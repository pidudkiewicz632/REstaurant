import api from "../util/api";
import Image from "next/image";
import { useState } from "react";
import AddButton from "../component/AddButton";
import AddProduct from "../component/AddProduct";
import Featured from "../component/Featured";
import FoodList from "../component/FoodList";
import styles from "../styles/Home.module.scss";

export default function Home({ foodList, admin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <FoodList foodList={foodList} />
      {!close && <AddProduct setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await api.get("/api/products");

  return {
    props: {
      foodList: res.data,
      admin,
    },
  };
};
