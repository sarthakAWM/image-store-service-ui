import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import CreateImage from './CreatImage';
import UploadImage from './UploadImage';
import CreateAlbum from './CreateAlbum';
import DeleteAlbum from './DeleteAlbum';
let API_SERVER_URL = "http://34.170.41.219"

function App() {

  const [albumsData, setAlbumsData] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [imageData, setImageData] = useState([]);
  const [tempState, setTempState] = useState("");

  const rendercallback = (value) => {
    setTempState(value); 
  }

  useEffect(() => {
    axios.get(API_SERVER_URL+'/album').then((response) => {
      setAlbumsData(response.data.data);
      console.log(response.data.data)
    });
  } );

  const showAlert = (e) => {
    setCurrentAlbum(e.target.innerHTML);
  }
  const navigatToCreate = () => {
    Navigate("/uploadImage")
  }

  const navigatToupload =  () => {
    Navigate("/uploadImage")
  }

  var list = []
for(var [entried, value] of  Object.entries(albumsData)){
  console.log(value)
     list.push(<div key={entried} style={{margin: '1rem', color: 'blue'}}> {Number(entried)+1}. <a onClick={showAlert}>{value}</a></div>)
}

let imageURL = API_SERVER_URL+"/image/album/fav/image/new.png"
  return (<div style={{marginLeft: '1rem'}}>
    <div className="App">
      <h2>IMAGE STORE SERVICE UI</h2>
    </div>
    {/* <Link to="/createImage">CreateImage</Link>
    <br/>
     <Link to="/uploadImage">UploadImage</Link> */}
     <div style={{display: 'flex'}}>
     <CreateImage albumData={albumsData}/>
     <div style={{borderLeft: '2px solid black', margin: '4rem'}}></div>
     <CreateAlbum rendercallback={rendercallback}/>
     </div>
     <hr></hr>
     <UploadImage albumData={albumsData} />
    <hr></hr>

    <div style={{display: 'flex'}}>
   
    <div>
    <h3 style={{margin: '3rem'}}>Albums List</h3>
    {
     albumsData.length != 0 ?
    <ul>
      {list}
    </ul> : ""}
    </div>
    <div style={{borderLeft: '2px solid black', margin: '4rem'}}></div>
    <DeleteAlbum albumData={albumsData}/>
    </div>
  <hr/>
 {currentAlbum != "" ? <ImageWithName key={currentAlbum} albumName={currentAlbum}/> : ""}
  
    {/* <img style={{height: '200px', width: '200px'}}
      src={imageURL}
      alt="new"
      /> */}
  </div>
  );
}



const ImageWithName = (props) => {
 const [imageData, setImageData] = useState([]);


 useEffect(() => {
  axios.get(API_SERVER_URL+'/image/album/'+props.albumName+"/all").then((response) => {
    setImageData(response.data.data);
    console.log(response.data.data)
  });
}, []);

const showAlert = () => {
  alert("I'm an alert");
}

var list = []
for(var [entried, value] of  Object.entries(imageData)){
  console.log(value)
    let imageURL = API_SERVER_URL+"/image/album/"+props.albumName+"/image/"+value;
     list.push(<a href={imageURL} target="_blank" ><div key={entried} style={{margin: '1rem'}}>{Number(entried)+1}. {value}</div></a>)
}

      return (
        <div>
          <h3 style={{margin: '3rem'}}>Images in {props.albumName} Album</h3>
          {
     imageData.length != 0 ?
    <ul>
      {list}
    </ul> : ""}
        </div>

      )
}



export default App;


