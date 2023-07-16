import React from "react";

import styles from "./OutboundReport.module.css";

import { ReactComponent as ArrowIcon } from "../../assets/arrowIcon.svg";
import Modal from "./Modal";
import ShowOutboundReport from "./ShowOutboundReport";

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const OutboundReport = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [outboundList, setOutboundList] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState(false);
  const [selectedOutbound, setSelectedOutbound] = React.useState(null);

  React.useEffect(() => {
    getOutbound();
  }, []);

  async function getOutbound() {
    try {
      const response = await fetch("http://localhost:3000/transactions");
      const json = await response.json();

      if (response.ok) {
        setOutboundList(
          json.filter((item) => {
            return item.type === "saida";
          })
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleSearchChange({ target }) {
    setSearchValue(target.value);
  }

  function handleActiveModal(outbound) {
    setActiveModal(true);
    setSelectedOutbound(outbound);
  }

  function getMountNumber(value) {
    switch (value) {
      case "Jan":
        return "01";
      case "Fev":
        return "02";
      case "Mar":
        return "03";
      case "Abr":
        return "04";
      case "Mai":
        return "05";
      case "Jun":
        return "06";
      case "Jul":
        return "07";
      case "Ago":
        return "08";
      case "Set":
        return "09";
      case "Out":
        return "10";
      case "Nov":
        return "11";
      case "Dez":
        return "12";
      default:
        return "";
    }
  }

  function compareNumbers(a, b) {
    return b.id - a.id;
  }

  return (
    <section className="container">
      <div className="mainContainer">
        <div className={styles.topBox}>
          <select
            className={styles.selectSearch}
            name="search"
            id="search"
            value={searchValue}
            onChange={handleSearchChange}
          >
            <option value="" disabled>
              Selecione o mês
            </option>
            {months.map((mount, index) => {
              return (
                <option key={index} value={mount}>
                  {mount}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <div className={styles.listOutboundTitle}>
            <p>Data</p>
            <p>Pedido</p>
            <p>Solicitante</p>
          </div>
          <ul className={styles.listOutbound}>
            {searchValue === ""
              ? outboundList &&
                outboundList.sort(compareNumbers).map((outbound) => {
                  return (
                    <>
                      <li key={outbound.id} className={styles.item}>
                        <p>{outbound.outDate}</p>
                        <p>#{outbound.id}</p>
                        <div className={styles.rigthBoxItem}>
                          <p>{outbound.requester}</p>
                          <button
                            className={styles.openModalBtn}
                            onClick={() => handleActiveModal(outbound)}
                          >
                            <ArrowIcon />
                          </button>
                        </div>
                      </li>
                    </>
                  );
                })
              : outboundList
                  .filter((outbound) => {
                    return (
                      outbound.outDate.substring(5, 7) ===
                      getMountNumber(searchValue)
                    );
                  })
                  .sort(compareNumbers)
                  .map((outbound) => {
                    return (
                      <li key={outbound.id} className={styles.item}>
                        <p>{outbound.outDate}</p>
                        <p>#{outbound.id}</p>
                        <div className={styles.rigthBoxItem}>
                          <p>{outbound.requester}</p>
                          <button
                            className={styles.openModalBtn}
                            onClick={() => handleActiveModal(outbound)}
                          >
                            <ArrowIcon />
                          </button>
                        </div>
                      </li>
                    );
                  })}
          </ul>
        </div>
      </div>
      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        {selectedOutbound && (
          <ShowOutboundReport
            setActiveModal={setActiveModal}
            outbound={selectedOutbound}
          />
        )}
      </Modal>
    </section>
  );
};

export default OutboundReport;
