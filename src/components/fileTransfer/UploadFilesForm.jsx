import axios from 'axios';
import React,{useState} from 'react';
import { toast } from "react-toastify";

import {getEndpoint} from "../../services/endPoint"; 

const UploadFilesForm = () => {
  
const [selectedFile,setSelectedFile]=useState(null);
  
     
    // On file select (from the pop up) 
   const onFileChange = event => { 
      // Update the state 
      setSelectedFile(event.target.files[0] ); 
    }; 
     
    // On file upload (click the upload button) 
    const onFileUpload = async() => { 
     try {
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "myFile", 
        selectedFile, 
        selectedFile.name 
      ); 
     
      // Details of the uploaded file 
      //console.log(this.state.selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 
     var retval=await axios.post(getEndpoint() + "/filetransfer", formData); 
     if (retval.status===200)
       if (retval.data.status===true)
         await toast.success('File is Uploaded', {position: toast.POSITION.TOP_LEFT}); 
     } catch (error) {
      toast.error('Error In Uploading File', {position: toast.POSITION.TOP_LEFT}); 
     }
               
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    const fileData = () => { 
      if (selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {selectedFile.name}</p> 
            <p>File Type: {selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {selectedFile.lastModifiedDate.toDateString()} 
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
            <h1> 
              GeeksforGeeks 
            </h1> 
            <h3> 
              File Upload using React! 
            </h3> 
            <div> 
                <input type="file" onChange={onFileChange} /> 
                <button onClick={onFileUpload}> 
                  Upload! 
                </button> 
            </div> 
          {fileData()} 
        </div> 
      ); 
     
  } 
  
  export default UploadFilesForm; 