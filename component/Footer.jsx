import Image from "next/image";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/logo.svg" layout="fill" objectFit="contain"/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>Lorem ipsum</h2>
        </div>
        <div className={styles.card}>
          <h2 className={styles.title}>Find our restaurant</h2>
          <p className={styles.text}>
            ul. Długa 43, Szczecin <br /> 754-454-654
          </p>
          <p className={styles.text}>
            ul. Długa 43, Szczecin <br /> 754-454-654
          </p>
          <p className={styles.text}>
            ul. Długa 43, Szczecin <br /> 754-454-654
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Working Hours</h1>
          <p className={styles.text}>
            Monday - Friday <br/> 10:00 - 22:00
          </p>
          <p className={styles.text}>
            Saturday - Sunday <br/> 10:00 - 1:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
