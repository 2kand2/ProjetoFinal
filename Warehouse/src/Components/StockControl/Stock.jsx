import React from "react";

import styles from "./Stock.module.css";

import ProductItem from "./ProductItem";
import Modal from "./Modal";
import AddProductItem from "./AddProductItem";

const Stock = () => {
  const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeModal, setActiveModal] = React.useState(false);

  React.useEffect(() => {
    fetchProdutos();
  }, []);

  async function fetchProdutos() {
    try {
      const stockResponse = await fetch("http://localhost:3000/stock");
      const stockJson = await stockResponse.json();

      const transactionsResponse = await fetch(
        "http://localhost:3000/transactions"
      );
      const transactionsJson = await transactionsResponse.json();

      const productFormat = formatProduct(stockJson, transactionsJson);

      setProducts(productFormat);
    } catch (error) {
      throw new Error(error);
    }
  }

  function formatProduct(jsonProduct, jsonTransactions) {
    const itemQuantities = jsonTransactions.reduce(
      (quantities, transaction) => {
        const { itemCode, quantity } = transaction;
        quantities[itemCode] = (quantities[itemCode] || 0) + quantity;
        return quantities;
      },
      {}
    );

    const productsWithQuantities = jsonProduct.map((product) => {
      return {
        ...product,
        totalQuantity: itemQuantities[product.itemCode] || 0,
      };
    });

    return productsWithQuantities;
  }

  function handleModal() {
    setActiveModal(true);
  }

  return (
    <section className="container">
      <div className="mainContainer">
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchbar}
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            placeholder="Pesquisa"
          />
          <button className={styles.button} onClick={handleModal}>
            Adicionar Item
          </button>
        </div>
        <ul className={styles.productList}>
          {searchTerm === ""
            ? products.map((product) => (
                <ProductItem
                  key={product.itemCode}
                  product={product}
                  setProducts={setProducts}
                  fetchProdutos={fetchProdutos}
                />
              ))
            : products
                .filter((product) =>
                  product.itemName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <ProductItem
                    key={product.itemCode}
                    product={product}
                    setProducts={setProducts}
                  />
                ))}
        </ul>
      </div>
      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <AddProductItem setActiveModal={setActiveModal} />
      </Modal>
    </section>
  );
};

export default Stock;
