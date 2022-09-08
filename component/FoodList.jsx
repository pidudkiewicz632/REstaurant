import { useMemo, useState } from "react";
import styles from "../styles/FoodList.module.scss";
import FoodCard from "./FoodCard";
import { useRouter } from "next/router";

const FoodList = ({ foodList }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Best place to eat italian food</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec
        dictum purus. Donec nisi sem, mattis in hendrerit a, sagittis at felis.
        Proin cursus suscipit lacus, ut efficitur ligula dapibus quis. Sed
        venenatis in leo at sodales. Fusce eu feugiat tellus. Sed consectetur
        tristique lorem, a elementum erat aliquam vitae. Suspendisse et
        tristique quam. In risus mi, mattis vel ultrices facilisis, egestas in
        orci. Fusce feugiat lobortis vehicula.
      </p>
      <div className={styles.wrapper}>
        {foodList.slice(0, 8).map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
      <button className={styles.button} onClick={()=> router.push("/product")}>
        <span className={styles.text}>More</span>
      </button>
    </div>
  );
};

export default FoodList;
