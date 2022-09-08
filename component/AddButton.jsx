import styles from "../styles/AddButton.module.scss"

const AddButton = ({setClose}) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>Add New Product</div>
  )
}

export default AddButton