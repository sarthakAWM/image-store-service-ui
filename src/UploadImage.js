import axios from 'axios';

import React,{Component} from 'react';

let API_SERVER_URL = "http://localhost:8080"

class UploadImage extends Component {

	state = {
	// Initially, no file is selected
    albumName: null,
	selectedFile: null
	};

    

    onAlbumNameChange = event => {
	
        // Update the state
        console.log(event.target.value)
        this.setState({ albumName: event.target.value });
        
        };
        
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append(
		"file",
		this.state.selectedFile
	);
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
	
	// Request made to the backend api
	// Send formData object
	axios.post(API_SERVER_URL+"/image/album/"+this.state.albumName+"/upload", formData);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			<p>File Name: {this.state.selectedFile.name}</p>

			<p>File Type: {this.state.selectedFile.type}</p>

			<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	
	render() {
	
	return (
		<div>
			<h4>
			Image Upload
			</h4>
			<div>
                Album Name : <input type='text' onChange={this.onAlbumNameChange} /><br/>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
		{this.fileData()}
		</div>
	);
	}
}

export default UploadImage;
