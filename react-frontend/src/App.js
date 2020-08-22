import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      dependency_list=[]
      selectedFile: null,
      fileUrl: ''
    }
  }

  /*fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0], fileUrl: URL.createObjectURL(event.target.files[0]) })

    uploadHandler = () => {
      if (!this.state.selectedFile) {
        return
      }
      const formData = new FormData()
      formData.append('img', this.state.selectedFile, this.state.selectedFile.name)
      axios({
        method: 'post',
        url: 'http://localhost:8080/',
        data: formData,
        config: {
          headers: [
            { 'Content-Type': 'multipart/form-data' },
            { 'Access-Control-Allow-Origin': '*' }]
        }
      })
        .then((response) => {
          this.setState({ mopoChance: response.data })
        }
        )
        .catch(function (response) {
          //handle error
          console.log(response);
        })
    }
  }*/



  render() {
    return (
      <Segment style={{
        width: '50%', margin: 'auto', padding: '10px'
      }}>
        <Header style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>Dependency list</Header>

          <span>
            <Input
              type="file"
              onChange={this.fileChangedHandler}
              icon={<Icon name='upload' inverted circular link onClick={this.uploadHandler} disabled={!this.state.selectedFile} />} />
          </span>
      </Segment>
    )
  }
}
