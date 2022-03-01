import React, { useState, useEffect, Fragment } from "react";
import { getCryptos } from "../../services/cryptoService";
import {search_Allitems_in_Allobjects_Ofarray} from "../../utils/utilities";
import Table from "../common/table";
import { sortItems } from "../../utils/paginate";
import { AppContext } from "../context/Context";

const CryptoForm = () => {
  const [crypto, setCrypto] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dimensions, setDimensions] = React.useState({height: window.innerHeight,width: window.innerWidth});

  const [columns, setColumns] = useState([
    { path: "asset_id", label: "ID", sortorder: "" },
    { path: "name", label: "Name", sortorder: "" },
    { path: "price_usd", label: "Price", sortorder: "" },
    { path: "rate", label: "Rate",sortorder: ""  }
      
  ]);

 
  useEffect(() => {
    async function fetchAPI() {
    try {
      const { data } = await getCryptos();
      setCrypto(data);
    } catch (error) {
      
    } 
      
    }
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
        
      });
    }
    window.addEventListener("resize", handleResize);
    fetchAPI();
    
  }, []);
  

  const serachedTransfers = (Crypto) => {
    return search_Allitems_in_Allobjects_Ofarray(Crypto, searchQuery);
  };


  const handleSearch = (searchtext) => {
    setSearchQuery(searchtext);
  };

  const handleSort = (sortColumn) => {
    const Columns = [...columns];
    const index = Columns.findIndex((item) => item.path === sortColumn.path);
    Columns[index].sortorder = sortColumn.sortorder;
    setColumns(Columns);
    const sorted = sortItems(
        crypto,
      [sortColumn.path],
      [sortColumn.sortorder]
    );
    setCrypto(sorted);
  };

  return (
    <div className="mx-2 ">
      <div className="col-lg-12 pt-4 ">
      <AppContext.Provider value={{ dimensions }}>
        {crypto && (
          <Fragment>
            <input
              type="text"
              name="query"
              className="form-control my-1"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.currentTarget.value)}
            />
            <Table
              columns={columns}
              data={serachedTransfers(crypto)}
              //sortColumn={sortColumn}
              onSort={handleSort}
              func={(item,col) => col==="rate"? (item[col]>0?" text-success ":" text-danger "):null}
            />
          </Fragment>
        )}
        </AppContext.Provider>
      </div>
      
    </div>
  );
};

export default CryptoForm;
