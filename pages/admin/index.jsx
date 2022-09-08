import Image from "next/image";
import styles from "../../styles/Admin.module.scss";
import api from "../../util/api";
import { useState } from "react";
import AddButton from "../../component/AddButton";
import AddProduct from "../../component/AddProduct";
import ProductFilter from "../../component/ProductFilter";
import OrdersFilter from "../../component/OrdersFilter";
import Pagination from "../../component/Pagination";
import { useRef } from "react";
import { useRouter } from "next/router";

const Admin = ({ orders, products }) => {
  const router = useRouter();
  const orderHeader = useRef();
  const productHeader = useRef();
  const itemsPerPage = 10;
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["payment", "preparing", "on the way", "delivered"];
  const [close, setClose] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [productsPagination, setProductsPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [ordersPagination, setOrdersPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const handleData = (data, edit) => {
    if (edit) {
      const newProductList = [...productList];
      const index = productList.findIndex(
        (product) => data._id === product._id
      );

      newProductList[index] = data;
      setProductList(newProductList);
    } else {
      setProductList([...productList, data]);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(
        "/api/products/" + id
      );
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.find((order) => id === order._id);
    const currentStatus = item.status;

    try {
      const res = await api.put("/api/orders/" + id, {
        status: currentStatus + 1,
      });

      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (product) => {
    setEditData({ ...product });
    setEdit(true);
    setClose(false);
  };

  const handleUpdateProducts = (data) => {
    setProductList([...data]);
    setProductsPagination({
      totalPages: Math.ceil(data.length / itemsPerPage),
      currentPage: 1,
    });
  };

  const handleUpdateOrders = (data) => {
    setOrderList([...data]);
    setOrdersPagination({
      totalPages: Math.ceil(data.length / itemsPerPage),
      currentPage: 1,
    });
  };

  const productsToPrint = () => {
    const end = productsPagination.currentPage * itemsPerPage;
    const start = end - itemsPerPage;

    return productList.slice(start, end);
  };

  const ordersToPrint = () => {
    const end = ordersPagination.currentPage * itemsPerPage;
    const start = end - itemsPerPage;

    return orderList.slice(start, end);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <div ref={productHeader} className={styles.head}>
            <h1 className={styles.title}>Products</h1>
            <AddButton setClose={setClose} />
          </div>
          <ProductFilter
            customStyles={styles}
            foodList={products}
            update={handleUpdateProducts}
          />
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsToPrint().map((product) => (
                <tr key={product._id} className={styles.tr}>
                  <td className={styles.image}>
                    <Image
                      src={product.img}
                      alt=""
                      width={50}
                      height={50}
                      objectFit="cover"
                    />
                  </td>
                  <td className={styles.productId}>
                    {product._id.slice(0, 5)}...
                  </td>
                  <td className={styles.name}>{product.title}</td>
                  <td className={styles.price}>{product.prices[0]} zł</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      View
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!productsToPrint().length && (
            <div className={styles.noResults}>
              <span>No Results</span>
            </div>
          )}
          <div className={styles.paginationContainer}>
            <Pagination
              currentPage={productsPagination.currentPage}
              setCurrentPage={(currentPage) => {
                setProductsPagination({
                  ...productsPagination,
                  currentPage,
                });
                productHeader.current.scrollIntoView();
              }}
              range={2}
              totalPages={productsPagination.totalPages}
            />
          </div>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title} ref={orderHeader}>
            Orders
          </h1>
          <OrdersFilter orderList={orders} update={handleUpdateOrders} />
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersToPrint().map((order) => (
                <tr key={order._id} className={styles.tr}>
                  <td className={styles.orderId}>{order._id.slice(0, 5)}...</td>
                  <td className={styles.customer}>{order.customer}</td>
                  <td className={styles.total}>{order.total} zł</td>
                  <td className={styles.method}>
                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                  </td>
                  <td className={styles.status}>{status[order.status]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => router.push(`/order/${order._id}`)}
                    >
                      View
                    </button>
                    <button
                      className={styles.stageButton}
                      onClick={() => {
                        handleStatus(order._id);
                      }}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!ordersToPrint().length && (
            <div className={styles.noResults}>
              <span>No Results</span>
            </div>
          )}
          <div className={styles.paginationContainer}>
            <Pagination
              currentPage={ordersPagination.currentPage}
              setCurrentPage={(currentPage) => {
                setOrdersPagination({
                  ...ordersPagination,
                  currentPage,
                });
                ordertHeader.current.scrollIntoView();
              }}
              range={2}
              totalPages={ordersPagination.totalPages}
            />
          </div>
        </div>
      </div>
      {!close && (
        <AddProduct
          setClose={setClose}
          setEdit={setEdit}
          handleData={handleData}
          edit={edit}
          productData={editData}
        />
      )}
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productsRes = await api.get("/api/products");
  const ordersRes = await api.get("/api/orders");

  return {
    props: {
      products: productsRes.data,
      orders: ordersRes.data,
    },
  };
};

export default Admin;
