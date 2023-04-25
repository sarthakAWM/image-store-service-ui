import React, { useState, useEffect } from "react";
import axios from "axios";

let API_SERVER_URL = "http://34.170.41.219";


const DeleteAlbum = (props) => {
    // const [apiDataValue, setApiDataValue] = useState([]);
    const [value, setValue] = useState("");
    const [resp, setResp] = useState("");
  
    // useEffect(() => {
    //   axios.get(API_SERVER_URL+'/album').then((response) => {
    //       setApiDataValue(response.data.data);
    //   });
    // }, []);
  
  
    const onFileDelete = () => {
      let data = {
      };
      axios
        .delete(API_SERVER_URL + "/album/"+value, data)
        .then((response) => {
          setResp(response.data);
          props.rendercallback("s");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
   const onChange = (event) => {
      setValue(event.target.value);
   }
  
    return (
      <div>
        <h3>Delete Album</h3>
        <div className="form-group">
          <strong>Select Album to delete</strong>
          <br/>
          <select
            className="form-control"
            name="select album"
            onChange={onChange}
            style={{marginRight: '1rem'}}
          >
            <option defaultValue>Select</option>
            {props.albumData.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button onClick={onFileDelete}>Delete</button>
        {resp != "" ? <div>{resp.message}</div> : ""}
        </div>
  
      </div>
    );
  };

  export default DeleteAlbum ;
