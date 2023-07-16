import React from "react";

import styles from "./Inbound.module.css";

import { ReactComponent as CloseImg } from "../../assets/removeicon.svg";

const Inbound = () => {
  const [products, setProducts] = React.useState(null);
  const [productName, setProductName] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [inboundItems, setInboundItems] = React.useState([]);

  React.useEffect(() => {
    getProducts();
  }, []);

  function handleSelect({ target }) {
    setProductName(target.value);
  }
  function handleQuantity({ target }) {
    setQuantity(target.value);
  }

  function handleSaveInbound() {
    if (inboundItems.length > 0) {
      let confirmou = confirm("Você deseja realizar esta entrada?");
      if (confirmou) {
        postInbound();
        setProductName("");
        setQuantity(1);
        setInboundItems([]);
      }
    } else {
      alert("Adicione items e as suas quantidades para salvar!");
    }
  }

  function getDate() {
    const data = new Date();

    const ano = String(data.getFullYear());
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
  }

  function postInbound() {
    const date = getDate();

    const dataPost = {
      items: [...inboundItems],
      type: "entrada",
      entryDate: date,
    };

    async function fetchPostInbound() {
      try {
        const responseProdutos = await fetch(
          `http://localhost:3000/transactions`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(dataPost),
          }
        );

        if (responseProdutos.ok) {
          console.log("Entrada inserida com sucesso");
        } else {
          console.log(
            "Erro ao atualizar a requisição",
            responseProdutos.status
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchPostInbound();
  }

  function handleAddItem() {
    if (productName !== "" && quantity > 0) {
      setInboundItems((inboundItems) => {
        if (inboundItems.find((element) => element.name === productName)) {
          alert("Item já inserido");
          return inboundItems;
        }
        return [...inboundItems, { name: productName, quantity }];
      });
    }
  }

  function handleRemoveItem(itemName) {
    setInboundItems(
      inboundItems.filter((item) => {
        return item.name !== itemName;
      })
    );
  }

  async function getProducts() {
    try {
      const resposeProduct = await fetch("http://localhost:3000/stock");
      const jsonProduct = await resposeProduct.json();

      if (resposeProduct.ok) {
        setProducts(jsonProduct);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <section className="container">
      <div className={`mainContainer ${styles.inboundCoitainer}`}>
        <div className={styles.topContainer}>
          <div className={styles.boxItemsLeft}>
            <select
              className={styles.select}
              value={productName}
              name="items"
              onChange={handleSelect}
            >
              <option value="" disabled>
                Selecione um item
              </option>
              {products &&
                products.map((product) => {
                  return (
                    <option key={product.itemCode} value={product.itemName}>
                      {product.itemName}
                    </option>
                  );
                })}
            </select>
            <input
              className={styles.quantity}
              type="number"
              name="quantity"
              value={quantity}
              onChange={handleQuantity}
              min={1}
            />
          </div>
          <div className={styles.boxItemsRight}>
            <button className={styles.button} onClick={handleAddItem}>
              Adicionar
            </button>
            <button className={styles.button} onClick={handleSaveInbound}>
              Salvar
            </button>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <ul className={styles.listItemInbound}>
            {inboundItems &&
              inboundItems.map((item) => {
                return (
                  <li key={item.name} className={styles.item}>
                    <div className={styles.leftItem}>
                      <p>{item.name}</p>
                      <p>{item.expiryDate}</p>
                    </div>
                    <div className={styles.rightItem}>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() => handleRemoveItem(item.name)}
                        className={styles.removeBtn}
                      >
                        <CloseImg />
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Inbound;
