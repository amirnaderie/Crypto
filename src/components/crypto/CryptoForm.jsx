import React, { useState, useEffect, Fragment,useRef } from "react";
import { Button } from "react-bootstrap";
import { getCryptos,deleteCrypto } from "../../services/cryptoService";
import {search_Allitems_in_Allobjects_Ofarray} from "../../utils/utilities";
import Table from "../common/table";
import { sortItems } from "../../utils/paginate";
import { AppContext } from "../context/Context";
import ModalComponenet, {ModalHeader,ModalBody,ModalFooter} from "./modal";
import CrudForm from "./CrudForm";



const CryptoForm = () => {
  const [crypto, setCrypto] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dimensions, setDimensions] = React.useState({height: window.innerHeight,width: window.innerWidth});
  const [modalShow,setModalShow]=useState(false);

  const [columns, setColumns] = useState([
    { path: "asset_id", label: "ID", sortorder: "" },
    { path: "name", label: "Name", sortorder: "" },
    { path: "price_usd", label: "Price", sortorder: "" },
    { path: "rate", label: "Rate",sortorder: ""  },
    {
      label: "Action",
      key: "action",
      content: asset => (
        <i style={{cursor: "pointer"}} className="fa fa-trash fa-3" aria-hidden="true"  onClick={() => 
          window.confirm(`Are you sure to Delete ${asset.asset_id} ?`)&& handleDelete(asset)
         } >
          
        </i>
      )
    }
      
  ]);
  const cryptoRef = useRef();
  cryptoRef.current = crypto;
  


  const handleDelete = async (asset) => {
    try {
      await deleteCrypto(asset._id);
      const trf = [...cryptoRef.current];
      const index = trf.indexOf(asset);
      if (index > -1) {
        trf.splice(index, 1); // 2nd parameter means remove one item only
        setCrypto(trf);
      }
     
    } catch (error) {
      console.log('Error')
    }
  };
 
  useEffect(() => {
    async function fetchAPI() {
    try {
      fetchData()
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
  
const fetchData =async () =>{
  const { data } = await getCryptos();
  setCrypto(data);
} 
  const serachedTransfers = (Crypto) => {
    return search_Allitems_in_Allobjects_Ofarray(Crypto, searchQuery);
  };


  const handleSearch = (searchtext) => {
    setSearchQuery(searchtext);
  };

const toggle=()=>{
  setModalShow(!modalShow);
}

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
const spinner=()=>{
  return ( <div class="animation">
  <div class="btLoader"></div>
  <p>Please Wait ... </p> 
</div>)
}
  return (
    <div className="mx-2 ">
      <div className="col-lg-12 ">
      <AppContext.Provider value={{ dimensions }}>
        {crypto ? (
          <Fragment>
        <button className="btn btn-primary mybtn bg-secondary pull-right my-2" style={{backgroundImage: "url(" +  process.env.PUBLIC_URL  + "/images/addition.png)"}} tabIndex="1" onClick={toggle}>
          
        </button>
          <ModalComponenet show={modalShow} onHide={toggle}>
          <ModalHeader></ModalHeader>
          <ModalBody>
         
            <CrudForm onhide={toggle} parentcallback={fetchData}></CrudForm>
          </ModalBody>
          {/* <ModalFooter onHide={this.toggle}>
            <Button variant="primary" onClick={toggle}>
              Save Changes
            </Button>
          </ModalFooter> */}
        </ModalComponenet>
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
        ):spinner()}
        </AppContext.Provider>
      </div>
      
    </div>
  );
};

export default CryptoForm;
