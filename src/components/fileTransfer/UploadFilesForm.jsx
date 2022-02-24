import axios from "axios";
import React, { useState, useContext, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import { applyMiddleware } from "redux";

import { getEndpoint } from "../../services/endPoint";
import SelectSearch from "./../common/selectsearch";
import { UserContext } from "../context/Context";
import { getUser } from "../../services/userService";
import Table from "../common/table";
import {
  search_Allitems_in_Allobjects_Ofarray,
  addCommas,
  removeNonNumeric,
  change_Array_Element_Value,
  dateFormat,
} from "../../utils/utilities";
import { sortItems } from "../../utils/paginate";
import Input from "../common/input/input";
import './fileTransfer.css';

const UploadFilesForm = () => {
  const { user, socket } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [users, setUsers] = useState(null);
  const [recivereuser, setRecivereuser] = useState(0);
  const [desc, setDesc] = useState("");
  const [transfered, setTrsnafered] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [iswaiting, setWaiting] = useState(false);

  const [columns, setColumns] = useState([
    { path: "filename", label: "FileName" },
    { path: "recieverName", label: "RecieverName", sortorder: "" },
    { path: "transferdate", label: "TransferDate", sortorder: "" },
    { path: "transfertime", label: "TransferTime" },
    { path: "size", label: "Size" },
    { path: "desc", label: "Description" },
  ]);

  useEffect(() => {
    async function fetchAPI() {
      const { data } = await getUser();
      setUsers(data);
    }
    fetchAPI();
  }, []);

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const emitsocket = (e) => {
    e.preventDefault();
    socket.emit("addItem", "test Socket From Client");
  };
  // On file upload (click the upload button)
  const onFileUpload = async () => {
    try {
      setWaiting(true);
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append("myFile", selectedFile, selectedFile.name);

      formData.append("senderuserid", user._id);
      formData.append("recieveruserid", recivereuser);
      formData.append("desc", desc);
      // Details of the uploaded file
      //console.log(this.state.selectedFile);

      // Request made to the backend api
      // Send formData object
      var retval = await axios.post(getEndpoint() + "/filetransfer", formData);
      if (retval.status === 200)
        if (retval.data.status === true) {
          let Trnsfered = [];
          if (transfered) Trnsfered = [...transfered];

          const maskdata = {
            ...retval.data.data,
            size:
              addCommas(
                removeNonNumeric(Math.round(retval.data.data.size / 1024))
              ) + " K",
          };

          Trnsfered.push(maskdata);

          let changedData = change_Array_Element_Value(
            Trnsfered,
            undefined,
            undefined,
            "transferdate",
            (x) => {
              return dateFormat(x);
            }
          );
          setTrsnafered(changedData);
          await toast.success("File is Uploaded", {
            position: toast.POSITION.TOP_LEFT,
          });
        } else if (retval.data.message === "File exists")
          await toast.error("File Exists", {
            position: toast.POSITION.TOP_LEFT,
          });
        else
          await toast.error("Error In Uploading File", {
            position: toast.POSITION.TOP_LEFT,
          });
    } catch (error) {
      toast.error("Error In Uploading File", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
    setWaiting(false);
  };
  const handleSearch = (searchtext) => {
    setSearchQuery(searchtext);
  };
  const setSelectSearch = (inputName, inputNameValue) => {
    return setRecivereuser(inputNameValue[0].value);
  };
  const setInput = (e) => {
    const { name, value } = e.target;
    setDesc(value);
  };
  const serachedTransfers = (Transfers) => {
    return search_Allitems_in_Allobjects_Ofarray(Transfers, searchQuery);
  };

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

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>
            Size:{" "}
            {addCommas(removeNonNumeric(Math.round(selectedFile.size / 1024)))}{" "}
            K
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <h1 className="text-dark">File Transfer Form</h1>

      <div className="row direction sub-main-w3 justify-content-left align-items-center">
        <div className=" col-lg-3 ">
          <SelectSearch
            tabIndex="0"
            options={users}
            name="recieveruser"
            labelcolor="text-info"
            label="RecieverUser"
            changehandle={setSelectSearch}
            value={recivereuser}
            // autoFocus="true"
          ></SelectSearch>
        </div>
        <div className="col-lg-2 mb-5 mt-lg-4">
          <label className="file-upload">
            <input type="file" onChange={onFileChange} />
            Choose Files
          </label>
        </div>
        <div className="col-lg-5">
          <Input
            tabIndex="1"
            name="desc"
            type="textare"
            labelcolor="text-info"
            onChange={setInput}
            label="Description"
            value={desc}
            effect={false}
          />
        </div>
        <div className=" col-lg-2 mb-5 mt-lg-4">
          <button
            className="btn btn-primary"
            tabIndex="8"
            disabled={!recivereuser || !selectedFile}
            onClick={onFileUpload}
          >
            Send File
            <i
              className={
                "fa fa-spinner fa-spin mx-1 " +
                (iswaiting ? "visible" : "invisible")
              }
            ></i>
          </button>
        </div>
        <div className=" col-lg-2 mb-5 mt-lg-4">
          <button className="btn btn-primary" tabIndex="8" onClick={emitsocket}>
            Send Socket Message
            <i
              className={
                "fa fa-spinner fa-spin mx-1 " +
                (iswaiting ? "visible" : "invisible")
              }
            ></i>
          </button>
        </div>
        <div className={"expander " +  (selectedFile ? "expanded":"")} id="expander">
          <div className="expander-content">{fileData()}</div>
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
    </div>
  );
};

export default UploadFilesForm;
