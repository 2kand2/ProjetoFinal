import React from "react";

import styles from "./Outbound.module.css";

import { ReactComponent as CloseImg } from "../../assets/removeicon.svg";

const Outbound = () => {
  const [products, setProducts] = React.useState(null);
  const [requesters, setRequesters] = React.useState([]);
  const [requester, setRequester] = React.useState("");
  const [itemOutbound, setItemOutbound] = React.useState("");
  const [quantityOutbound, setQuantityOutbound] = React.useState(1);
  const [outBoundItems, setOutboundItems] = React.useState([]);

  React.useEffect(() => {
    getProducts();
    getRequester();
  }, []);

  function getDate() {
    const data = new Date();

    const ano = String(data.getFullYear());
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
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

  async function getRequester() {
    try {
      const resposeRequester = await fetch("http://localhost:3000/requester");
      const jsonRequester = await resposeRequester.json();

      if (resposeRequester.ok) {
        setRequesters(jsonRequester);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleRequestSelect({ target }) {
    setRequester(target.value);
  }
  function handleItemSelect({ target }) {
    setItemOutbound(target.value);
  }
  function handleInputQuantity({ target }) {
    setQuantityOutbound(target.value);
  }

  function handleSaveOutbound() {
    if (outBoundItems.length > 0 && requester !== "") {
      let confirmou = confirm("Você deseja realizar esta saida?");
      if (confirmou) {
        postOutbound();
        setRequester("");
        setItemOutbound("");
        setQuantityOutbound(1);
        setOutboundItems([]);
      }
    } else {
      alert("Adicione items, quantidades e o nome do solicitante para salvar!");
    }
  }

  function postOutbound() {
    const date = getDate();

    const dataPost = {
      items: [...outBoundItems],
      type: "saida",
      requester,
      outDate: date,
    };

    async function fetchPostOutbound() {
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
          console.log("Saída inserida com sucesso");
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
    fetchPostOutbound();
  }

  function handleAddItem() {
    if (itemOutbound !== "" && quantityOutbound > 0) {
      setOutboundItems((outBoundItems) => {
        if (outBoundItems.find((element) => element.name === itemOutbound)) {
          alert("Item já inserido");
          return outBoundItems;
        }
        return [...outBoundItems, { name: itemOutbound, quantityOutbound }];
      });
    }
  }

  function handleRemoveItem(itemName) {
    setOutboundItems(
      outBoundItems.filter((item) => {
        return item.name !== itemName;
      })
    );
  }

  return (
    <section className="container">
      <div className="mainContainer">
        <div className={styles.header}>
          <div className={styles.boxLeft}>
            <select
              className={styles.select}
              onChange={handleRequestSelect}
              value={requester}
            >
              <option value="" disabled>
                Selecione um solicitante
              </option>
              {requesters &&
                requesters.map((requester) => {
                  return (
                    <option key={requester.id} value={requester.name}>
                      {requester.name}
                    </option>
                  );
                })}
            </select>
            <select
              className={styles.selectItems}
              onChange={handleItemSelect}
              value={itemOutbound}
            >
              <option value="" disabled>
                Selecione um item
              </option>
              {products &&
                products.map((product) => {
                  return (
                    <option
                      key={product.itemName}
                      className=""
                      value={requester.name}
                    >
                      {product.itemName}
                    </option>
                  );
                })}
            </select>
            <input
              className={styles.quantity}
              type="number"
              min={1}
              value={quantityOutbound}
              onChange={handleInputQuantity}
            />
          </div>
          <div className={styles.boxRight}>
            <button className={styles.button} onClick={handleAddItem}>
              Adicionar
            </button>
            <button className={styles.button} onClick={handleSaveOutbound}>
              Salvar
            </button>
          </div>
        </div>
        <div className={styles.mainBox}>
          <ul className={styles.listItemOutbound}>
            {outBoundItems &&
              outBoundItems.map((item) => {
                return (
                  <li key={item.name} className={styles.item}>
                    <div className={styles.leftItem}>
                      <p>{item.name}</p>
                      <p>{item.expiryDate}</p>
                    </div>
                    <div className={styles.rightItem}>
                      <p>{item.quantityOutbound}</p>
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

export default Outbound;
