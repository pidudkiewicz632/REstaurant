import { useEffect, useMemo, useState, lazy } from "react";
import defaultStyles from "../styles/ProductFilter.module.scss";
import { categories as defaultCategories } from "../util/product";


const categories = [...defaultCategories];
categories.unshift("All");

const ProductFilter = ({ foodList, update, customStyles }) => {
  const defaultPriceRange = { from: 0, to: 1300 };
  const [searchName, setSearchName] = useState("");
  const [priceRange, setPriceRange] = useState({ from: 0, to: 1300 });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState(1);
  const styles = customStyles ? customStyles : defaultStyles;

  const handlePrice = (e) => {
    const value = e.target.value
      ? e.target.value
      : defaultPriceRange[e.target.name];
    setPriceRange({ ...priceRange, [e.target.name]: value });
  };

  const sortOptions = [
    {
      name: "Name Desc",
      value: 0,
      fun: (data) => data.sort((a, b) => b.title.localeCompare(a.title)),
    },
    {
      name: "Name Asc",
      value: 1,
      fun: (data) =>
        data.sort((a, b) => b.title.localeCompare(a.title)).reverse(),
    },
    {
      name: "Price Desc",
      value: 2,
      fun: (data) => data.sort((a, b) => b.prices[0] - a.prices[0]),
    },
    {
      name: "Price Asc",
      value: 3,
      fun: (data) => data.sort((a, b) => a.prices[0] - b.prices[0]),
    },
  ];

  const filtredList = useMemo(() => {
    const filter = foodList.filter((food) => {
      return (
        food.title.toLowerCase().includes(searchName.toLowerCase()) &&
        food.prices[0] <= priceRange.to &&
        food.prices[0] >= priceRange.from &&
        (selectedCategory === "All" ||
          food.categories.indexOf(selectedCategory) > -1)
      );
    });

    return filter;
  }, [searchName, priceRange, foodList, selectedCategory]);

  useEffect(() => {
    const data = sortOptions[sort].fun(filtredList);
    update(data);
  }, [sort, filtredList]);

  return (
    <div className={styles.productFilterContainer}>
      <div className={styles.filterContainer}>
        <input
          className={styles.input}
          placeholder="Name"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="number"
          name="from"
          className={styles.price}
          placeholder="Start Price"
          onChange={handlePrice}
        />
        <input
          type="number"
          name="to"
          className={styles.price}
          placeholder="End Price"
          onChange={handlePrice}
        />
        <select
          className={styles.select}
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          {sortOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div
            key={category}
            className={`${styles.category} ${
              selectedCategory === category ? styles.categoryActive : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
