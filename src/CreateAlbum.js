import React, { useState } from "react";
import axios from "axios";

let API_SERVER_URL = "http://34.170.41.219";

const CreateAlbum = (props) => {
  const [albumName, setAlbumName] = useState("");
  const [resp, setResp] = useState("");

  const onAlbumNameChange = (event) => {
    setAlbumName(event.target.value);
  };
  const onFileUpload = (event) => {
    let data = {
      albumName: albumName,
    };
    axios
      .post(API_SERVER_URL + "/album/create", data)
      .then((response) => {
        console.log(response.data);
        // Handle datasetResp
        setResp(response.data);
        props.rendercallback("tempdata");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h4>Album Create</h4>
      Album Name : <input type="text" onChange={onAlbumNameChange} />
      <br />
      <button onClick={onFileUpload}>Create</button>
      {resp != "" ? <div>{resp.message}</div> : ""}
    </div>
  );
};

export default CreateAlbum ;
