import React, { Component } from 'react';



class ApiService {
  getAllAlbums() {
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return axios.get();
}

}
export default new ApiService();