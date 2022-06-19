import styles from "./Table.module.css";
import { useEffect, useState } from "react";
import acountIcon from "../icons/account-icon.png";

function Table(props) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const peopleByQty = [];
    let searchAccounts = [[]];
    //Checking if keyword exists the display results else display from API
    if (props.keyword !== "") {
      props.results.forEach((account) => {
        if (account.name.toLowerCase().includes(props.keyword)) {
          searchAccounts[0].push(account);
        } else if (account.surname.toLowerCase().includes(props.keyword))
          searchAccounts[0].push(account);
      });
      setPeople(searchAccounts);
    } else if (props.keyword === "") {
      //Display results from API
      const sliceAccounts = function (num) {
        for (let i = 0; i < props.results.length; i += Number(num)) {
          peopleByQty.push(props.results.slice(i, i + num));
        }
        setPeople(peopleByQty);
      };
      sliceAccounts(props.qtyPag);
    }

    props.pagBtnsSetter(peopleByQty.length);
  }, [props]);

  return (
    <div className={styles.tableContainer}>
      <table width="100%" className={styles.mainTable}>
        <tbody>
          <tr className={styles.fixedRow}>
            <td>Avatar</td>
            <td>ID</td>
            <td>Name</td>
            <td>Surname</td>
            <td>Email</td>
            <td>Company</td>
            <td>Department</td>
            <td>Started-in</td>
          </tr>

          {people[props.pageNum]
            ? people[props.pageNum].map((person) => {
                return (
                  <tr key={person.id} className={styles.personRow}>
                    <td className={styles.acountIcon}>
                      <img className={styles.acountIcon} src={acountIcon} />
                    </td>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.surname}</td>
                    <td>{person.email}</td>
                    <td>{person.company}</td>
                    <td>{person.department}</td>
                    <td>{person.startIn}</td>
                  </tr>
                );
              })
            : people.map((person) => {
                return (
                  <tr key={person.id} className={styles.personRow}>
                    <td className={styles.acountIcon}>
                      <img className={styles.acountIcon} src={acountIcon} />
                    </td>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.surname}</td>
                    <td>{person.email}</td>
                    <td>{person.company}</td>
                    <td>{person.department}</td>
                    <td>{person.startIn}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
