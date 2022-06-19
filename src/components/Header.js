import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

function Header(props) {
  const qtyRef = useRef();
  const [paginationBtns, setPagBtns] = useState([]);
  const pageNumRefs = useRef([]);
  const searchInpRef = useRef("");

  useEffect(() => {
    const pagButtons = [];
    //Separating refs of page numbers
    pageNumRefs.current = pageNumRefs.current.slice(0, paginationBtns.length);

    props.qtyPagSetter(Number(qtyRef.current.value));
    pagButtons.push(...Array(props.pagBtns).keys());
    setPagBtns(pagButtons);
  }, [props]);

  const changePage = function (e) {
    props.pageSetter(Number(e.target.id));
    pageNumRefs.current.forEach((num) => {
      num.style.backgroundColor = "white";
    });
    pageNumRefs.current[e.target.id].style.backgroundColor =
      "rgb(128, 255, 213)";
  };

  const showResults = function () {
    props.keywordSetter(searchInpRef.current.value);
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        Paginated, Filterable People List in React
      </h1>
      <input
        onChange={showResults}
        ref={searchInpRef}
        placeholder="Enter keyword"
        className={styles.searchInp}
        type="text"
      />
      <div className={styles.paginationControl}>
        <button
          onClick={() => {
            if (props.currPage > 0) {
              props.pageSetter(props.currPage - 1);
              pageNumRefs.current.forEach((num) => {
                num.style.backgroundColor = "white";
              });
              pageNumRefs.current[props.currPage - 1].style.backgroundColor =
                "rgb(128, 255, 213)";
            }
          }}
          className={styles.paginationBtn}
        >
          {"<"}
        </button>
        {paginationBtns.map((num, i) => {
          return (
            <div
              ref={(el) => (pageNumRefs.current[i] = el)}
              onClick={changePage}
              key={num}
              id={num}
              className={styles.pageNum}
            >
              {num + 1}
            </div>
          );
        })}

        <button
          onClick={() => {
            if (props.currPage < paginationBtns.length - 1) {
              props.pageSetter(props.currPage + 1);
              pageNumRefs.current.forEach((num) => {
                num.style.backgroundColor = "white";
              });
              pageNumRefs.current[props.currPage + 1].style.backgroundColor =
                "rgb(128, 255, 213)";
            }
          }}
          className={styles.paginationBtn}
        >
          {">"}
        </button>
      </div>
      <div className={styles.qtySection}>
        <p>Qty:</p>
        <select
          onChange={() => {
            props.qtyPagSetter(Number(qtyRef.current.value));
            props.pageSetter(0);
            pageNumRefs.current[props.currPage].style.backgroundColor =
              "rgb(128, 255, 213)";
          }}
          defaultValue="3"
          ref={qtyRef}
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="100">all</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
