import { getEndpoint } from "./endPoint";
import http from "./httpService";


//const apiEndpoint = process.env.REACT_APP_URL + "/genres";
const apiEndpoint = getEndpoint() + "/filetransfer";

export function getTransfered(data) {
  return http.get(apiEndpoint + "/gettransfered", {
    params: data,
  });
}
export async function getFile(filename) {
  const response = await http.get(
    apiEndpoint + "/getfile?filename=" + filename,
    { responseType: "blob" }
  );
  if (response.data.error) {
    console.error(response.data.error);
  }

  const fileURL = window.URL.createObjectURL(new Blob([response.data]));
  const fileLink = document.createElement("a");
  fileLink.href = fileURL;
  // const fileName = response.headers['content-disposition'].substring(22, 52);
  fileLink.setAttribute("download", filename);
  document.body.appendChild(fileLink);
  fileLink.click();
  fileLink.remove();
}

export function updateTransfered(id) {
  try {
    return http.put(`${apiEndpoint}/${id}`);
  } catch (error) {
    throw error;
  }
}

export const addNewItemSocket = (socket,id,item) => {
	return (dispatch) => {
		let postData = {
				id:id+1,
				item:item,
				completed:false
		     }
	    socket.emit('addItem',postData)		
	}	
}
