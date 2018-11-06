import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { _loadPets, _deletePet, _createPet, _updatePet } from './services/PetService';
import Pet from './components/Pet';
import Form from './components/Form';

class App extends Component {
  constructor() {
    super();

    this.state = {
      pets : [{_id: 1, name: 'fido'}, {_id: 2, name: 'snowflake'}],
      name : 'will',
      edit_id : ''
    }

    // this.editPet = this.editPet.bind(this);
  }

  // deletePet() {
  //   alert('hi');
  // }

  deletePet = (event) => {

    //in button below add a data attribute with the pet's id

    var id = event.target.getAttribute('data-id');

    return _deletePet(id).then(deletedPetId => {

            let pets = this.state.pets.filter(pet => pet._id !== deletedPetId)

            this.setState({pets})
          })

    //and in deletePet, write the fetch call to delete the Pet


    //so you click a button, you refresh and it's gone

    //12:05
  }

  createPet = (event) => {
    event.preventDefault();

    let name = event.target.children[0].value;
    let type = event.target.children[1].value;

    return _createPet(name, type).then(rj => {
        let pets = [...this.state.pets, rj];
        this.setState({pets})
      })
  }

  updatePet = (event) => {
    event.preventDefault();

    let form = event.target;

    let updatedId = this.state.edit_id;
    let name = form.children[0].value;
    let type = form.children[1].value;

    return _updatePet(updatedId, name, type).then(updatedPet => {

      let pets = this.state.pets.map(oldPet => {
        //if the pet in this.state.pets is not the pet we updated then leave it alone
        if (oldPet._id != updatedId) return oldPet;
        else return updatedPet;
      })

      this.setState({pets})
    })
  }

  editPet = (event) => {
    event.preventDefault();

    let name = event.target.getAttribute('data-name');
    let type = event.target.getAttribute('data-type');

    this.setState({
      edit_id : event.target.getAttribute('data-id')
    }, function(){

      let form = document.querySelector('#editForm');

      form.children[0].value = name;
      form.children[1].value = type;

    })


  }

  hideEditForm = (event) => {
    event.preventDefault();

    this.setState({edit_id : ""})
  }

  componentDidMount() {
    return _loadPets()
      .then(resultingJSON => this.setState({pets : resultingJSON}))
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. {this.state.edit_id}
          </p>

          <h1>{ this.state.name }</h1>

          <Form func={this.createPet} submitButton="make pet" />

          {(this.state.edit_id != "") && <Form cssId="editForm" func={this.updatePet} submitButton="update pet" />}

          {(this.state.edit_id != "") && <a href="#" onClick={this.hideEditForm}>hide edit form</a>}

          {this.state.pets.map((x) => <Pet _id={x._id} name={x.name} type={x.type} delete={this.deletePet} edit={this.editPet} />)}

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;