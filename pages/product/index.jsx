import { useMemo, useState } from "react";
import styles from "../../styles/Products.module.scss";
import FoodCard from "../../component/FoodCard";
import Image from "next/image";
import axios from "axios";
import Pagination from "../../component/Pagination";
import ProductFilter from "../../component/ProductFilter";

const Products = ({ foodList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 2;
  const [filtredProducts, setFiltredProducts] = useState([]);

  const handleUpdate = (data) => {
    setFiltredProducts([...data]);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    setCurrentPage(1);
  };

  const products = () => {
    const end = currentPage * itemsPerPage;
    const start = end - itemsPerPage;
    
    return filtredProducts.slice(start, end);
  };

  return (
    <div className={styles.container}>
      <ProductFilter foodList={foodList} update={handleUpdate} />
      <div className={styles.wrapper}>
        {products().map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
        {!products().length && <span className={styles.text}>No Results</span>}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        range={2}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Products;

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      foodList: res.data,
    },
  };
};
