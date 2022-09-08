import api from "../../util/api"
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.scss";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      console.log(api.post)
      await api.post("/api/login", {
        username,
        password,
      });

      router.push("/admin");
    } catch (err) {
      console.log(err);
        setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
              </button>
              {error && <span className={styles.error}>Wrong credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
