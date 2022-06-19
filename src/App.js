import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Table from "./components/Table";

function App() {
  const people = [];
  const [accounts, setAccounts] = useState([]);
  const [qtyPagination, setQtyPagination] = useState(3);
  const [paginationBtns, setPaginationBtns] = useState();
  const [page, setPage] = useState(0);
  const [searchKey, setSearchKey] = useState("");

  const createNewObj = function (data) {
    const dataObj = {
      avatarIcon: data.avatar.url,
      id: data.id,
      email: data.email,
      name: data.firstName,
      surname: data.lastName,
      company: data.company.name,
      department: data.company.department,
      startIn: data.company.startDate,
    };
    people.push(dataObj);
  };

  useEffect(() => {
    const getData = async function () {
      const res = await fetch("http://apis.chromeye.com:9191/people");
      const data = await res.json();
      data.forEach((person) => {
        createNewObj(person);
      });
      setAccounts(people);
    };
    getData();
  }, []);

  return (
    <div className="App">
      <Header
        qtyPagSetter={setQtyPagination}
        pagBtns={paginationBtns}
        pageSetter={setPage}
        currPage={page}
        keywordSetter={setSearchKey}
      />
      <Table
        qtyPag={qtyPagination}
        results={accounts}
        pagBtnsSetter={setPaginationBtns}
        pageNum={page}
        keyword={searchKey}
      />
    </div>
  );
}

export default App;
