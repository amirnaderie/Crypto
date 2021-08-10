import React, { useState, useEffect} from "react";
import {getServices} from '../../services/serviceService'
import Table from '../common/table';
import {dateFormat,change_Array_Element_Value} from '../../utils/utilities'
import { paginate, sortItems } from "../../utils/paginate";

const AcceptServiceForm = () => {
    const [services, setServices] = useState(null);
   // const [sortColumn,SetsortColumn] = useState([{ path: "servicedate", order: "asc" },{ path: "servicetype", order: "desc" }]);
    
    const [columns,setColumns] = useState([
      { path: "user", label: "User" },
      { path: "brand", label: "Brand" },
      { path: "model", label: "Model" },
      { path: "servicetype", label: "ServiceType",sortorder:"" },
      { path: "servicedate", label: "ServiceDate",sortorder:"" },
      { path: "servicetime", label: "ServiceTime" },
      { path: "address", label: "Address" },
      { path: "tel", label: "Tel" },
      { path: "registerdate", label: "RegisterDate" },

        // {
        //   key: "like",
        //   content: movie => (
        //     <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        //   )
        // }
      ]);
    const  handleSort = sortColumn => {
     
      const Columns = [ ...columns ];
      const index =Columns.findIndex((item) => item.path === sortColumn.path);
       Columns[index].sortorder =sortColumn.sortorder;
      setColumns[Columns];
      const sorted = sortItems(services, [sortColumn.path], [sortColumn.sortorder]);
      setServices(sorted); 
      };
    
    useEffect(() => {
        async function fetchAPI() {
          const { data } = await getServices();
          let changedData=change_Array_Element_Value(data,undefined,undefined,'servicedate',x=>{return dateFormat(x);});
          changedData=change_Array_Element_Value(changedData,undefined,undefined,'registerdate',x=>{return dateFormat(x);});
          
          setServices(changedData);
        }
        fetchAPI();
      }, []);


    return (
        <div className="row justify-content-center ltr">
        <div className="col-lg-12 pt-5 ">
        {services &&
           ( <Table
              columns={columns}
              data={services}
              //sortColumn={sortColumn}
              onSort={handleSort}
            />)
       }
       </div>
       </div>
      );
}



export default AcceptServiceForm;