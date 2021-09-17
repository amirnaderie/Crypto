import React, { useState,Fragment,useEffect,useContext } from 'react';
import Table from "../common/table";
import moment from "moment-jalaali";
import {
  search_Allitems_in_Allobjects_Ofarray,
  addCommas,
  removeNonNumeric,
  change_Array_Element_Value,
  dateFormat,
} from "../../utils/utilities";
import { sortItems } from "../../utils/paginate";
import {getTransfered} from "../../services/filetransferService";
import Select from "../common/select";
import DatePicker1 from './../common/datepicker';
import { getUser } from "../../services/userService";
import SelectSearch from "./../common/selectsearch";
import Input from '../common/input/input';
import { UserContext } from "../context/Context";

const initialFormState = {
  send1receive2: 0,
  otherid:0,
  datefrom:new Date().toLocaleDateString("en-ZA"),
  dateto:new Date().toLocaleDateString("en-ZA"),
  filename:''
 };

 const initialDateClick = {
  datefrom:false,
  dateto:false,
 };

const FileTransferedForm = () => {
    const { user } = useContext(UserContext);

    const [columns, setColumns] = useState([
    { path: "filename", label: "FileName" },
    { path: "senderuserid.name", label: "SenderName", sortorder: "" },
    { path: "recieveruserid.name", label: "RecieverName", sortorder: "" },
    { path: "transferdate", label: "TransferDate", sortorder: "" },
    { path: "transfertime", label: "TransferTime" },
    { path: "size", label: "Size" },
    { path: "desc", label: "Description" },
  ]);
  const [iswaiting, setWaiting] = useState(false);
  const [transfered, setTrsnafered] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(null);
  const [form, setForm] = useState({...initialFormState });
  const [dateclick,setDateClick]= useState({...initialDateClick})

  const typetransfers=[{label:'Send',value:1},{label:'Recieve',value:2}]

  useEffect(() => {
    async function fetchAPI() {
      const newValue = { id:user._id};
      setForm((form) => ({ ...form, ...newValue }));
      const { data } = await getUser();
      setUsers(data);
    }
    fetchAPI();
  }, []);


// On file upload (click the upload button)
const gettransfered = async (e) => {
    try {
      e.preventDefault();
      setWaiting(true);
      // Create an object of formData
      const newValue = { datefrom : dateclick.datefrom?form.datefrom: "",dateto : dateclick.dateto?form.dateto: "" };
      const formdata={ ...form, ...newValue };
      var {data} = await getTransfered(formdata);
      let changedData = change_Array_Element_Value(
        data,
        undefined,
        undefined,
        "transferdate",
        (x) => {
          return dateFormat(x);
        }
      );
   
      setTrsnafered(changedData);
    } catch (error) {
     console.log(error);
    }
    setWaiting(false);
  };
  
  const setSelect = ({ currentTarget: input }) => {
    const newValue = { [input.name]: parseInt(input.value, 10) };
    return setForm((form) => ({ ...form, ...newValue }));
  };
  
  const setInput = (e) => {
    const {name,value}=e.target;
    const newValue = { [name]: value };
    return setForm((form) => ({ ...form, ...newValue }));
  };

  const serachedTransfers = (Transfers) => {
    return search_Allitems_in_Allobjects_Ofarray(Transfers, searchQuery);
  };
  
  const setSelectSearch = async (inputName, inputNameValue) => {
    const newValue = { [inputName]: inputNameValue[0].value };
    setForm((form) => ({ ...form, ...newValue }));

  
   };

  const handleSearch = (searchtext) => {
    setSearchQuery(searchtext);
  };
  const handledateclick=(name,isclicked)=>{
    const newValue = { [name]:isclicked};
    setDateClick((dateclick) => ({ ...dateclick, ...newValue }));
   
  }
  const handleSort = (sortColumn) => {
    const Columns = [...columns];
    const index = Columns.findIndex((item) => item.path === sortColumn.path);
    Columns[index].sortorder = sortColumn.sortorder;
    setColumns(Columns);
    const sorted = sortItems(
      transfered,
      [sortColumn.path],
      [sortColumn.sortorder]
    );
    setTrsnafered(sorted);
  };

    return (
        <div>
      <h1 className="text-dark">File Transfer Form</h1>

      {/* <div className="row direction sub-main-w3 justify-content-left align-items-center">  */}
      <form className="direction sub-main-w3" >
      <div className="row ">
      <div className=" col-lg-2">
            <Select
              tabIndex="1"
              name="send1receive2"
              id="send1receive2"
              labelcolor="text-info"
              value={form.send1receive2}
              label="SendOrRecieve"
              options={typetransfers}
              onChange={setSelect}
              optionlabel="label"
              optionvalue="value"
              placeholder="Select ..."
            />
          </div>
          <div className=" col-lg-3 ">
          <SelectSearch
            tabIndex="0"
            options={users}
            name="otherid"
            labelcolor="text-info"
            label="UserName"
            changehandle={setSelectSearch}
            value={form.otherid}
            // autoFocus="true"
          ></SelectSearch>
        </div>
          <div className="col-lg-2">
            <DatePicker1
              TabIndex="4"
              name="datefrom"
              label="FromDate"
              labelcolor="text-info"
              value={moment(form.datefrom, "YYYY/MM/DD")}
              isGregorian={true}
              onChange={(value)=>{ setForm((form) => ({...form,...{ datefrom: value.format("YYYYMMDD") },}))}}
              timePicker={false}
              handleclick={handledateclick}
            />
          </div>
          <div className="col-lg-2">
            <DatePicker1
              TabIndex="5"
              name="dateto"
              label="ToDate"
              labelcolor="text-info"
              value={moment(form.dateto, "YYYY/MM/DD")}
              isGregorian={true}
              onChange={(value)=>{ setForm((form) => ({...form,...{ dateto: value.format("YYYYMMDD") },}))}}
              timePicker={false}
              handleclick={handledateclick}
            />
          </div>
          <div className="col-lg-3">
            <Input
              tabIndex="6"
              name="filename"
              type="textare"
              labelcolor="text-info"
              onChange={setInput}
              label="FileName"
              value={form.filename}
              effect={false}
            />
          </div>
      <div className=" col-lg-2 mb-2 ">
        <button className="btn btn-primary" tabIndex="8" disabled={form.send1receive2===0}  onClick={gettransfered}>
        Search
              <i className={"fa fa-spinner fa-spin mx-1 " + (iswaiting?"visible":"invisible")} ></i>
            </button>
        </div>

    <div className="col-lg-12 pt-4 ">
    {transfered && (
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
          data={serachedTransfers(transfered)}
          //sortColumn={sortColumn}
          onSort={handleSort}
        />
      </Fragment>
    )}
  </div>
  </div>
  </form>
  </div>
   );
}



export default FileTransferedForm;