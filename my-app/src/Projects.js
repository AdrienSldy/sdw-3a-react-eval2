import React, { Component } from 'react';

class Projects extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const projects = this.props.projects.map((item, i) => {
      return (
      <div>
        <input defaultValue={item.title} id={item._id + "title"}/>
        <input defaultValue={item.description} id={item._id + "description"}/>
        <button onClick={() => this.props.editProject(item._id)}>Editer</button>
        <button onClick={() => this.props.deleteProject(item._id)}>Delete</button> 
      </div>)
    });

    return (
      <div className="Projects">
          <br />
          <h4>Projects</h4>
          <button onClick={() => this.props.deselectUser()}>Déselectionner le user</button>
          <br />
          <br />
          {projects}
          <br />
          <form id="projectForm">
            <input type="text" name="title" placeholder="Title" id="title"/>
            <input type="text" name="description" placeholder="Description" id="description"/>
            <a onClick={() => this.props.addProject()}>Ajouter</a>
          </form>
      </div>
    );
  }
}

export default Projects;