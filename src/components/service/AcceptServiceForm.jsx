import React, { useState, useEffect, useRef, useContext } from "react";
import { toast } from "react-toastify";
import { getServices, updateService } from "../../services/serviceService";
import Table from "../common/table";
import { dateFormat, change_Array_Element_Value,search_Allitems_in_Allobjects_Ofarray } from "../../utils/utilities";
import { sortItems } from "../../utils/paginate";
import { UserContext } from "../context/Context";
import { Fragment } from "react";

const AcceptServiceForm = () => {
  const { user } = useContext(UserContext);
  const [services, setServices] = useState(null);
  //const [searchedservices, setSearchedservices] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // const [sortColumn,SetsortColumn] = useState([{ path: "servicedate", order: "asc" },{ path: "servicetype", order: "desc" }]);
  const servicesRef = useRef();

  servicesRef.current = services;

  const [columns, setColumns] = useState([
    { path: "user", label: "User" },
    { path: "brand", label: "Brand" },
    { path: "model", label: "Model" },
    { path: "servicetype", label: "ServiceType", sortorder: "" },
    { path: "servicedate", label: "ServiceDate", sortorder: "" },
    { path: "servicetime", label: "ServiceTime" },
    { path: "address", label: "Address" },
    { path: "tel", label: "Tel" },
    { path: "registerdate", label: "RegisterDate" },

    {
      label: "State",
      key: "like",
      content: (service) => (
        <i
          onClick={() =>
            window.confirm(
              `Are you sure To ${
                service.servicestate === 1 ? `Accept` : `Release`
              } This Service?`
            ) && onLike(service)
          }
          style={{ cursor: "pointer" }}
          className={
            service.servicestate === 1
              ? "fa fa-thumbs-o-up fa-2x"
              : "fa fa-thumbs-up fa-2x"
          }
          aria-hidden="true"
        />
      ),
    },
  ]);

  const onLike = async (service) => {
    try {
      const Services = [...servicesRef.current];
      service.servicestate = service.servicestate === 1 ? 2 : 1;
      service.repairmanuserid = service.servicestate === 2 ? user._id : null;
      await updateService(service);
      setServices(Services);
    } catch (error) {
      toast.error("Error Occured", { position: toast.POSITION.TOP_LEFT });
    }
  };
  const handleSort = (sortColumn) => {
    const Columns = [...columns];
    const index = Columns.findIndex((item) => item.path === sortColumn.path);
    Columns[index].sortorder = sortColumn.sortorder;
    setColumns(Columns);
    const sorted = sortItems(
      services,
      [sortColumn.path],
      [sortColumn.sortorder]
    );
    setServices(sorted);
    
  };
const handleSearch=searchtext=>{
  setSearchQuery(searchtext);
}
const serachedServices=Services=>{
 return search_Allitems_in_Allobjects_Ofarray(Services,searchQuery);
}

  useEffect(() => {
    async function fetchAPI() {
      const { data } = await getServices();
      let changedData = change_Array_Element_Value(
        data,
        undefined,
        undefined,
        "servicedate",
        (x) => {
          return dateFormat(x);
        }
      );
      changedData = change_Array_Element_Value(
        changedData,
        undefined,
        undefined,
        "registerdate",
        (x) => {
          return dateFormat(x);
        }
      );

      setServices(changedData);
    }
    fetchAPI();
  }, []);

  return (
    <div className="row justify-content-center ltr">
      <div className="col-lg-12 pt-4 ">
        {services && (
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
              data={serachedServices(services)}
              //sortColumn={sortColumn}
              onSort={handleSort}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default AcceptServiceForm;
