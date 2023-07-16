import React from "react";

import styles from "./ProductItem.module.css";
import { ReactComponent as Edit } from "../../assets/editicon.svg";

import Modal from "./Modal";
import EditProductItem from "./EditProductItem";

const ProductItem = ({ product, setProducts, fetchProdutos }) => {
  const [activeModal, setActiveModal] = React.useState(false);

  function handleEdit() {
    setActiveModal(true);
  }

  return (
    <li className={styles.item}>
      <p>{product.itemName}</p>
      <div className={styles.boxAttributes}>
        <p>{product.totalQuantity}</p>
        <button onClick={handleEdit} className={styles.button}>
          <Edit />
        </button>
      </div>
      <Modal setActiveModal={setActiveModal} activeModal={activeModal}>
        <EditProductItem
          setActiveModal={setActiveModal}
          item={product.itemCode}
          idProduct={product.id}
          setProducts={setProducts}
          fetchProdutos={fetchProdutos}
        />
      </Modal>
    </li>
  );
};

export default ProductItem;
