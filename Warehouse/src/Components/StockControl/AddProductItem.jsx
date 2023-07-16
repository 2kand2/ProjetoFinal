import React from "react";

import styles from "./AddProductItem.module.css";

import UseForm from "../../Hooks/UseForm";

const AddProductItem = ({ setActiveModal }) => {
  const nome = UseForm();
  const [tipoItem, setTipoItem] = React.useState("");

  function handleSelect({ target }) {
    setTipoItem(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (nome.value !== "" && tipoItem !== "") {
      alert("Produto adicionado ao estoque");
      setActiveModal(false);
    }
  }

  function closeModal() {
    setActiveModal(false);
  }

  return (
    <div className={styles.editContainer}>
      <div className={styles.boxTitle}>
        <h3>Adicionar Item</h3>
      </div>
      <div className={styles.boxInput}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={nome.value}
              onChange={nome.onChange}
              onBlur={nome.onBlur}
              required
            />
            {nome.error && <span className={styles.error}>{nome.error}</span>}
          </div>
          <div className={styles.input}>
            <label htmlFor="type">Tipo do Item</label>
            <select
              name="nameType"
              id="type"
              value={tipoItem}
              onChange={handleSelect}
              required
            >
              <option value="" disabled>
                selecione uma opção
              </option>
              <option value="CONSUMABLE">Consumível</option>
              <option value="PATRIMONY">Patrimônio</option>
            </select>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={closeModal}>
              Cancelar
            </button>
            {nome.error ? (
              <button className={styles.button} disabled>
                Enviar
              </button>
            ) : (
              <button className={styles.button}>Enviar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductItem;
