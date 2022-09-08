import styles from "../styles/Featured.module.scss";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
  const [selectedImg, setSelectedImg] = useState(0);

  const images = [
    "/img/slider/festival.png",
    "/img/slider/pasta.png",
    "/img/slider/desserts.png",
  ];

  const imagesLen = images.length;

  const handleArrow = (dir) => {
    if (dir === "l") {
      setSelectedImg(selectedImg!== 0 ? selectedImg - 1 : imagesLen - 1);
    } else if (dir === "r") {
      setSelectedImg(selectedImg !== imagesLen - 1 ? selectedImg + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} onClick={() => handleArrow("l")}>
        <Image src="/img/left-arrow.svg" layout="fill" objectFit="contain"/>
      </div>
      <div className={styles.wrapper} style={{transform: `translateX(${-100 * selectedImg}vw)`}}>
        {images.map((image, index) => (
          <div key={index} className={styles.imgContainer}>
            <Image src={image} layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} onClick={() => handleArrow("r")}>
        <Image src="/img/right-arrow.svg" layout="fill" objectFit="contain"/>
      </div>
    </div>
  );
};

export default Featured;
