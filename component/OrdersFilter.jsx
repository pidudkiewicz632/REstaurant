import styles from "../styles/OrderFilters.module.scss";
import { useState, useMemo, useEffect } from "react";

const OrdersFilter = ({ orderList, update }) => {
  const methods = ["cash", "paid"];
  const status = ["payment", "preparing", "on the way", "delivered"];
  const defaultPriceRange = { from: 0, to: 1300 };
  const [searchName, setSearchName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [sort, setSort] = useState(1);
  const [selectedMethods, setSelectedMethods] = useState({
    paid: true,
    cash: true,
  });
  const [selectedStatus, setSelectedStatus] = useState({
    payment: true,
    preparing: true,
    delivered: true,
    "on the way": true,
  });
  const [priceRange, setPriceRange] = useState({ from: 0, to: 1300 });

  const sortOptions = [
    {
      name: "Customer Desc",
      value: 0,
      fun: (data) => data.sort((a, b) => b.customer.localeCompare(a.title)),
    },
    {
      name: "Customer Asc",
      value: 1,
      fun: (data) =>
        data.sort((a, b) => b.customer.localeCompare(a.title)).reverse(),
    },
    {
      name: "Total Desc",
      value: 2,
      fun: (data) => data.sort((a, b) => b.total - a.total),
    },
    {
      name: "Total Asc",
      value: 3,
      fun: (data) => data.sort((a, b) => a.total - b.total),
    },
  ];

  const handlePrice = (e) => {
    const value = e.target.value
      ? e.target.value
      : defaultPriceRange[e.target.name];
    setPriceRange({ ...priceRange, [e.target.name]: value });
  };

  const handleMethodChange = (e) => {
    setSelectedMethods({
      ...selectedMethods,
      [e.target.name]: e.target.checked,
    });
  };

  const handleMethodStatus = (e) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const filtredList = useMemo(() => {
    const filter = orderList.filter((order) => {
      return (
        order._id.toLowerCase().includes(orderId.toLowerCase()) &&
        order.customer.toLowerCase().includes(searchName.toLowerCase()) &&
        order.total <= priceRange.to &&
        order.total >= priceRange.from &&
        selectedMethods[methods[order.method]] &&
        selectedStatus[status[order.status]]
      );
    });

    return filter;
  }, [searchName, selectedMethods, priceRange, selectedStatus, orderId]);

  useEffect(() => {
    const data = sortOptions[sort].fun(filtredList);
    update(data);
  }, [filtredList, sort]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Order ID"
        onChange={(e) => setOrderId(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Customer"
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
      <div className={styles.checkboxWrapper}>
        <span className={styles.text}>Payment: </span>
        {methods.map((item) => (
          <div key={item} className={styles.checkboxItem}>
            <label htmlFor={item}>{item}</label>
            <input
              type="checkbox"
              name={item}
              value={item}
              checked={selectedMethods[item]}
              onChange={handleMethodChange}
            />{" "}
            |
          </div>
        ))}
      </div>
      <div className={styles.checkboxWrapper}>
        <span className={styles.text}>Status: </span>
        {status.map((item) => (
          <div key={item} className={styles.checkboxItem}>
            <label htmlFor={item}>{item}</label>
            <input
              type="checkbox"
              name={item}
              value={item}
              checked={selectedStatus[item]}
              onChange={handleMethodStatus}
            />{" "}
            |
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersFilter;
