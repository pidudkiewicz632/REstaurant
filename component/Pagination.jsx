import styles from "../styles/Pagination.module.scss";

const Pagination = ({ currentPage, range, totalPages, setCurrentPage }) => {
  const start = currentPage - range > 0 ? currentPage - range : 1;
  const end = currentPage + range < totalPages ? currentPage + range : totalPages;
  
  const pageNumbers = [...Array(end - start + 1).keys()].map((x) => x + start);

  return (
    <div className={styles.container}>
      <div className={styles.side}>
        {currentPage > 1 && (
          <button
            className={styles.item}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
        )}
      </div>
      <div className={styles.center}>
        {pageNumbers.map((pageNumber) => (
          <button
            className={`${styles.item} ${
              pageNumber === currentPage ? styles.active : ""
            }`}
            onClick={
              pageNumber !== currentPage
                ? () => setCurrentPage(pageNumber)
                : undefined
            }
            key={pageNumber}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <div className={styles.side}>
        {currentPage < totalPages && (
          <button
            className={styles.item}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
