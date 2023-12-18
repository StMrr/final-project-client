/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import NewCampusView from '../views/NewStudentView';
import { addCampusThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstname: '',
        lastname: '',
        address: '',
        description: '',
        imageUrl: '',
        addressError: '' // New state for address error message
      };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
   

        if (name === "address") {
            var addressRegex = /^[0-9A-Za-z\s\.,#\-]+$/;
            var result_address = addressRegex.test(value);

            if(!result_address) {
                this.setState({ addressError: "Invalid address format"});
                return false;
            }
            else {
                this.setState({addressError: ''});
                // console.log("Address is valid:", address);
                // return true;
            }     
        }
        this.setState({[name]: value,});
            
    }


handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.addressError) {
        // If there's a address error, do not proceed with form submission
        return;
      }

    
      let campus = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl
      };

      let newStudent = await this.props.addCampus(campus);

    this.setState({
      firstname: '',
      lastname: '',
      address: '',
      description: '',
      imageUrl: '',
      addressError: ''
    });
  };


    componentWillUnmount() {
    this.setState({ addressError: ''});
  }

  render() {
    if (this.state) {
      return <Redirect to={`/campus/${this.state.addressError}`} />;
    }

  return (
    <div>
      <Header />
      <NewCampusView
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        addressError={this.state.addressError} // Pass the address error to the view
      />
    </div>
  );
}

const mapDispatch = (dispatch) => {
    return {
      addCampus: (campus) => dispatch(addCampusThunk(campus)),
    };
  };
  
  export default connect('', mapDispatch)(NewCampusContainer);