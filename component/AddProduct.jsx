import styles from "../styles/AddProduct.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { productValidation } from "../util/validation";
import { categories } from "../util/product";
import { useMemo } from "react";

const AddProduct = ({ setClose, handleData, edit, productData, setEdit }) => {
  const defaultValidationStates = {
    file: {
      state: null,
      message: "",
    },
    title: {
      state: null,
      message: "",
    },
    desc: {
      state: null,
      message: "",
    },
    prices: {
      state: null,
      message: "",
    },
    extraOptions: {
      state: null,
      message: "",
    },
    categories: {
      state: null,
      message: "",
    }
  };

  const defaultSelectedCategories = categories.reduce(
    (a, v) => ({ ...a, [v]: false }),
    {}
  );

  console.log(defaultSelectedCategories);

  const [data, setData] = useState({
    file: "",
    title: "",
    desc: "",
    prices: ["", "", ""],
    extraOptions: [],
    categories: defaultSelectedCategories,
  });

  const [extra, setExtra] = useState(null);
  const [validationStates, setValidationStates] = useState(
    defaultValidationStates
  );

  useEffect(() => {
    setValidationStates(defaultValidationStates);
    if (edit) {
      productData?.categories.forEach(
        (category) => (defaultSelectedCategories[category] = true)
      );

      setData({
        ...data,
        title: productData.title,
        desc: productData.desc,
        prices: productData.prices,
        extraOptions: productData.extraOption,
        categories: { ...defaultSelectedCategories },
      });
    }
  }, []);

  const handleDeleteExtra = (name) => {
    const newExtras = data.extraOptions.filter(
      (option) => option.text !== name
    );

    setData({ ...data, extraOptions: newExtras });
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    const state = productValidation.extra(extra);
    setValidationStates({ ...validationStates, extraOptions: state });
    if (state.state) {
      setData({ ...data, extraOptions: [...data.extraOptions, extra] });
    }
  };

  const changePrice = (e, index) => {
    const currentPrices = [...data.prices];
    currentPrices[index] = e.target.value;

    const state = productValidation.price(e.target.value);

    setValidationStates({ ...validationStates, prices: state });

    setData({ ...data, prices: currentPrices });
  };

  const handleCategoriesChange = (e) => {
    const newSelectedCategories = { ...data.categories };
    newSelectedCategories[e.target.name] = e.target.checked;

    const state = productValidation.categories(newSelectedCategories);

    setValidationStates({ ...validationStates, categories: state });

    setData({ ...data, categories: { ...newSelectedCategories } });
  };

  const handleInput = (e) => {
    const value = e.target.name === "file" ? e.target.files[0] : e.target.value;
    const state = productValidation[e.target.name](value);

    setValidationStates({ ...validationStates, [e.target.name]: state });
    setData({ ...data, [e.target.name]: value });
  };

  const handleCreate = async () => {
    let isValid = true;
    let newValidationStates = {};

    try {
      for (let key of Object.keys(data)) {
        let state = productValidation[key](data[key]);

        if (key === "file" && edit && !data.file && productData.img) {
          state = {
            state: true,
            message: "",
          };
        }

        if (!state.state) {
          isValid = false;
        }

        newValidationStates[key] = state;
      }

      setValidationStates({ ...newValidationStates });

      if (isValid) {
        const defaultUrl = "http://localhost:3000/api/products/";
        const [method, url] = edit
          ? ["PUT", defaultUrl + productData?._id]
          : ["POST", defaultUrl];

        let imgUrl = productData?.img;

        if (data.file) {
          const reqData = new FormData();

          reqData.append("file", data.file);
          reqData.append("upload_preset", "uploads");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dtbxn3uui/image/upload",
            reqData
          );

          imgUrl = uploadRes.data.url;
        }

        const { title, desc, prices, extraOptions } = data;

        const categories = Object.entries(data.categories)
          .filter(([key, value]) => {
            return value;
          })
          .map(([key, value]) => key);

        const product = {
          title,
          desc,
          prices,
          extraOptions,
          categories,
          img: imgUrl,
        };

        const res = await axios({
          method: method,
          url: url,
          data: product,
        });

        setClose(true);

        if (handleData) {
          handleData({ ...res.data }, edit);
        }

        if (setEdit) {
          setEdit(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setClose(true)}>
          X
        </span>
        <h1>Add New Product</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input name="file" type="file" onChange={(e) => handleInput(e)} />
          {validationStates.file.state === false && (
            <span className={styles.error}>
              {validationStates.file.message}
            </span>
          )}
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            name="title"
            className={styles.input}
            type="text"
            onChange={(e) => handleInput(e)}
            value={data.title}
          />
          {validationStates.title.state === false && (
            <span className={styles.error}>
              {validationStates.title.message}
            </span>
          )}
        </div>
        <div className={styles.item}>
          <span className={styles.text}>Categories: </span>
          <div className={styles.checkboxes}>
            {categories.map((category) => (
              <div key={category} className={styles.checkboxItem}>
                <label htmlFor={category}>{category}</label>
                <input
                  type="checkbox"
                  name={category}
                  value={category}
                  checked={data.categories[category]}
                  onChange={handleCategoriesChange}
                />
              </div>
            ))}
          </div>
          {validationStates.categories.state === false && (
            <span className={styles.error}>
              {validationStates.categories.message}
            </span>
          )}
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            name="desc"
            rows={4}
            type="text"
            className={styles.textarea}
            onChange={(e) => handleInput(e)}
            value={data.desc}
          />
          {validationStates.desc.state === false && (
            <span className={styles.error}>
              {validationStates.desc.message}
            </span>
          )}
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <div className={styles.priceInputs}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="small"
                onChange={(e) => changePrice(e, 0)}
                value={data.prices[0]}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="medium"
                onChange={(e) => changePrice(e, 1)}
                value={data.prices[1]}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="large"
                onChange={(e) => changePrice(e, 2)}
                value={data.prices[2]}
              />
            </div>
            {validationStates.prices.state === false && (
              <span className={styles.error}>
                {validationStates.prices.message}
              </span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <div className={styles.extraInputs}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="text"
                placeholder="Item"
                name="text"
                onChange={handleExtraInput}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleExtraInput}
              />
              <button className={styles.extraButton} onClick={handleExtra}>
                Add
              </button>
            </div>
            {validationStates.extraOptions.state === false && (
              <span className={styles.error}>
                {validationStates.extraOptions.message}
              </span>
            )}
          </div>
          <div className={styles.extraItems}>
            {data.extraOptions.map((option) => (
              <div key={option.text} className={styles.extraItem}>
                <span>{option.text}</span>
                <div
                  className={styles.delete}
                  onClick={() => handleDeleteExtra(option.text)}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
