import React, { useState, useEffect, Fragment, useRef } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { toast } from "react-toastify";
import { getCryptos, deleteCrypto } from "../../services/cryptoService";
import { search_Allitems_in_Allobjects_Ofarray } from "../../utils/utilities";
import Table from "../common/table";
import { sortItems } from "../../utils/paginate";
import { AppContext } from "../context/Context";
import ModalComponenet, { ModalHeader, ModalBody } from "./modal";
import CrudForm from "./CrudForm";

const CryptoForm = () => {
  const [cryptos, setCryptos] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSpinner, setShowSpinner] = useState(true);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [modalShow, setModalShow] = useState(false);
  const [cryptoRec, setCryptoRec] = useState(null);
  const [columns, setColumns] = useState([
    { path: "asset_id", label: "ID", sortorder: "" },
    { path: "name", label: "Name", sortorder: "" },
    { path: "price_usd", label: "Price", sortorder: "" },
    { path: "rate", label: "Rate", sortorder: "" },
    {
      label: "Action",
      key: "action",
      content: (asset) => (
        <span>
          <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => <Tooltip {...props}>Delete</Tooltip>}
            placement="bottom"
          >
            <i
              style={{ cursor: "pointer" }}
              className="fa fa-trash fa-2x mx-2"
              aria-hidden="true"
              onClick={() =>
                window.confirm(`Are you sure to Delete ${asset.asset_id} ?`) &&
                handleDelete(asset)
              }
            ></i>
          </OverlayTrigger>
          <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => <Tooltip {...props}>Edit</Tooltip>}
            placement="bottom"
          >
          <i
            style={{ cursor: "pointer" }}
            className="fa fa-edit fa-2x mx-2 "
            aria-hidden="true"
            onClick={() => handleUpdate(asset)}
          ></i>
          </OverlayTrigger>
        </span>
      ),
    },
  ]);
  const cryptosRef = useRef();
  cryptosRef.current = cryptos;

  const handleDelete = async (asset) => {
    try {
      await deleteCrypto(asset._id);
      const trf = [...cryptosRef.current];
      const index = trf.indexOf(asset);
      if (index > -1) {
        trf.splice(index, 1); // 2nd parameter means remove one item only
        setCryptos(trf);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const handleUpdate = (asset) => {
    try {
      setCryptoRec(asset);
      toggle(1);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    async function fetchAPI() {
              fetchData();
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

  const fetchData = async () => {
    try {
      const { data } = await getCryptos();
      setCryptos(data);
      setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);
      toast.error("Connection Error", { position: toast.POSITION.TOP_LEFT,type:toast.TYPE.ERROR });
    }
    
  };

  const serachedTransfers = (Crypto) => {
    return search_Allitems_in_Allobjects_Ofarray(Crypto, searchQuery);
  };

  const handleSearch = (searchtext) => {
    setSearchQuery(searchtext);
  };

  const toggle = (isUpdate) => {
    if (!(isUpdate === 1)) setCryptoRec(null);
    setModalShow(!modalShow);
  };

  const updateOrInsertCrypto = ({ data: cryptorec }) => {
    const trf = [...cryptosRef.current];
    const index = trf.findIndex((item) => item._id === cryptorec._id);
    let newCrytpo = null;
    if (index >= 0) {
      trf[index] = cryptorec;
      newCrytpo = [...trf];
    } else {
      newCrytpo = [...trf, cryptorec];
    }

    setCryptos(newCrytpo);
  };

  const handleSort = (sortColumn) => {
    const Columns = [...columns];
    const index = Columns.findIndex((item) => item.path === sortColumn.path);
    Columns[index].sortorder = sortColumn.sortorder;
    setColumns(Columns);
    const sorted = sortItems(
      cryptos,
      [sortColumn.path],
      [sortColumn.sortorder]
    );
    setCryptos(sorted);
  };

  const spinner = () => {
    return (
      <div className="animation">
        <div className="btLoader"></div>
        <p>Please Wait ... </p>
      </div>
    );
  };

  return (
    <div className="mx-2 ">
      <div className="col-lg-12 ">
        <AppContext.Provider value={{ dimensions }}>
          {cryptos && (
            <Fragment>
              <button
                className="btn btn-primary mybtn bg-secondary pull-right my-2"
                style={{
                  backgroundImage:
                    "url(" + process.env.PUBLIC_URL + "/images/addition.png)",
                }}
                tabIndex="1"
                onClick={toggle}
              ></button>
              <ModalComponenet show={modalShow} onHide={toggle}>
                <ModalHeader></ModalHeader>
                <ModalBody>
                  <CrudForm
                    onhide={toggle}
                    parentcallback={updateOrInsertCrypto}
                    updateCrypto={cryptoRec}
                  ></CrudForm>
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
                data={serachedTransfers(cryptos)}
                //sortColumn={sortColumn}
                onSort={handleSort}
                func={(item, col) =>
                  col === "rate"
                    ? item[col] > 0
                      ? " text-success "
                      : " text-danger "
                    : null
                }
              />
            </Fragment>
          )} 
          {showSpinner&& (
            spinner()
          )}
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default CryptoForm;
