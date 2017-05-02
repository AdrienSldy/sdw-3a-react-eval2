import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Users from './Users';
import Projects from './Projects';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      projects: [],
      currentUser: null
    };
  }

  componentDidMount() {
    this.UserList();
    this.ProjectList();
  }

  UserList(){
    return $.getJSON('/api/users')
    .then((data) => {
      let state = this.state;
      state.users = data
      this.setState(state)
    });
  }

  ProjectList(){
    if (this.state.currentUser){
      return $.getJSON('/api/user/'+this.state.currentUser._id+'/projects')
      .then((data) => {
        let state = this.state;
        state.projects = data
        this.setState(state)
      });
    } else {
      return $.getJSON('/api/projects')
      .then((data) => {
        let state = this.state;
        state.projects = data
        this.setState(state)
      });
    }
  }

  selectUser(user){
    let state = this.state;
    state.currentUser = user
    this.setState(state)

    this.ProjectList()
  }

  unselectUser(){
    let state = this.state;
    state.currentUser = null
    this.setState(state)

    this.ProjectList()
  }

// Service User

  postUser(fd){
    let formData = {
        name: $('#name').val(),
        age: $('#age').val()
      }

    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(() => {
      this.UserList()
    })
  }

  putUser(id){
    let formData = {
        _id: id,
        name: $('#'+id+'name').val(),
        age: $('#'+id+'age').val()
      }

    fetch('/api/user/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(() => {
      this.UserList()
    })
  }
  
  deleteUser(id){
    fetch('/api/user/' + id, {
      method: 'DELETE'
    }).then(() => {
      this.UserList()
    })
  }


// Service Project

 postProject(){
      let formData = {
        creator: this.state.currentUser,
        title: $('#title').val(),
        description: $('#description').val()
      }

      fetch('/api/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(() => {
      this.ProjectList()
    })
  }

  putProject(id){
    let formData = {
        title: $('#'+id+'title').val(),
        description: $('#'+id+'description').val()
      }

    fetch('/api/project/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(() => {
      this.ProjectList()
    })
  }

  deleteProject(id){
    fetch('/api/project/' + id, {
      method: 'DELETE'
    }).then(() => {
      this.ProjectList()
    })
  }

 
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Projects and users - A single page app</h2>
        </div>
          <Users users={this.state.users} putUser={this.putUser.bind(this)} deleteUser={this.deleteUser.bind(this)} selectUser={this.selectUser.bind(this)} postUser={this.postUser.bind(this)}/>

          <Projects currentUser={this.state.currentUser} projects={this.state.projects} postProject={this.postProject.bind(this)} unselectUser={this.unselectUser.bind(this)} putProject={this.putProject.bind(this)} deleteProject={this.deleteProject.bind(this)}/>
      </div>
    );
  }
}

export default App;