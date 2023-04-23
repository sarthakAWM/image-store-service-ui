import React, { Component, useState } from "react";
import axios from "axios";

let API_SERVER_URL = "http://34.170.41.219"

const CreateImage = () => {

    const [imageName, setImageName] = useState("")
    const [albumName, setalbumName] = useState("")
    const [initials, setinitials] = useState("")
    const [size, setsize] = useState("")
    const [colour, setcolour] = useState("")
    const [resp, setResp] = useState("")

const onAlbumNameChange = event => {
    setalbumName(event.target.value)
}
const onImageNameChange = event => {
    setImageName(event.target.value)
}
const onColourNameChange = (colour, event) => {
    setcolour(colour.hex)
}
const onSizeNameChange = event => {
    setsize(event.target.value)
}
const onInitNameChange = event => {
    setinitials(event.target.value)
    }

    const onFileUpload = event => {

        let data = {
            "imageName": imageName,
            "size": size,
            "initals" : initials, 
            "colour": colour
        }
        axios.post(API_SERVER_URL+"/image/album/"+albumName, data)
          .then((response) => {
            console.log(response.data);
              // Handle datasetResp
              setResp(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
    }
  return (
    <div>
     <h4>Image Create</h4>
      Album Name : <input type="text" onChange={onAlbumNameChange} />
      <br />
      Image Name : <input type="text" onChange={onImageNameChange} />
      <br />
      color Name : <input type="text" onChange={onColourNameChange} />
      <br />
      size Name  : <input type="number" onChange={onSizeNameChange} />
      <br />
      Initials   : <input type="text" onChange={onInitNameChange} />
      <br />
      <button onClick={onFileUpload}>Create</button>
      {resp != "" ? <div>{resp.message}</div> : ""}
    </div>
  );
};
export default CreateImage;
