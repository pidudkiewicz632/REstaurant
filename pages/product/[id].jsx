import styles from "../../styles/Product.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/cartSlice";
import axios from "axios";


const Product = ({ food }) => {
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(food.prices[0]);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  }

  const handleSize = (sizeIndex) => {
    const diffrence = food.prices[sizeIndex] - food.prices[size];

    setSize(sizeIndex);
    changePrice(diffrence);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id))
    }
  };

  const handleClick = () => {
    dispatch(addProduct({...food, extras, price, quantity}));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={food.img} layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{food.title}</h1>
        <span className={styles.price}>{price} ZŁ</span>
        <p className={styles.desc}>{food.desc}</p>
        <h3 className={styles.choose}>Choose your size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/pizza-slice.png" layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/pizza-slice.png" layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/pizza-slice.png" layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {food.extraOption.map((option) => (
            <div className={styles.option} key={option._id}>
              {option.id}
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={quantity} className={styles.quantity} onChange={changeQuantity} />
          <button className={styles.button} onClick={handleClick}>Add to Card</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );

  return {
    props: {
      food: res.data,
    },
  };
};

export default Product;
