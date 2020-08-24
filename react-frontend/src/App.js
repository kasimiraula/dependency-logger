import React from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import {initializeDependencies} from './reducers/dependencyReducer'
import DependencyList from './components/DependencyList'
import Dependency from './components/Dependency'

class App extends React.Component {

  componentWillMount = async () => {
    await this.props.initializeDependencies()
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
  }

  <Togglable buttonLabel="Add new blog">
    <BlogForm/>
  </Togglable>
  */

  render() {

    const dependencyByName = (package_name) =>
      (this.props.dependencies.find(d => d.package === package_name))

    return (
      <div className='container'>
      <Router>
      <div>
      <h2>dependency app</h2>
         <div>
           <Route exact path="/" render={() => <DependencyList/>} />
           <Route exact path="/dependencies/:id" render={({match}) => <Dependency key={match.params.id} dependency={dependencyByName(match.params.package)} />}/>
         </div>
         </div>
       </Router>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
    return {
      dependencies: state.dependencies
    }
}

export default connect(
  mapStateToProps,
  {initializeDependencies}
)(App)
