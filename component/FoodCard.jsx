import Image from "next/image";
import styles from "../styles/FoodCard.module.scss";
import Link from "next/link";

const FoodCard = ({ food }) => {
  return (
    <Link href={`/product/${food._id}`}>
      <div className={styles.container}>
        <Image src={food.img} alt="" width="500" height="500" />
        <h1 className={styles.title}>{food.title}</h1>
        <p className={styles.price}>{food.prices[0]} zł</p>
        <p className={styles.desc}>{food.desc}</p>
      </div>
    </Link>
  );
};

export default FoodCard;
