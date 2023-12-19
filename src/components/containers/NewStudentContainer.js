import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      campusId: null,
      email: '',
      imageUrl: '',
      gpa: '',
      redirect: false,
      redirectId: null,
      gpaError: '',
      campusError: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'gpa') {
      // Check if the GPA is a valid float between 0.0 and 4.0
      const gpaFloat = parseFloat(value);
      if (isNaN(gpaFloat) || gpaFloat < 0.0 || gpaFloat > 4.0) {
        this.setState({ gpaError: 'Invalid GPA. Please enter a float between 0.0 and 4.0' });
        return;
      } else {
        // Clear the GPA error if the input is valid
        this.setState({ gpaError: '' });
      }
    }

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.gpaError) {
      // If there's a GPA error, do not proceed with form submission
      return;
    }

    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      campusId: this.state.campusId,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
    };

    try {
      // Wrap the code that might throw an error in a try block
      let newStudent = await this.props.addStudent(student);

      this.setState({
        firstname: '',
        lastname: '',
        campusId: null,
        email: '',
        imageUrl: '',
        gpa: '',
        redirect: true,
        redirectId: newStudent.id,
      });
    } catch (error) {
      console.error(`Error submitting student: ${error.message}`);
      this.setState({ campusError: 'Error: Unable to add student. Please try again with a new campusId.' });
    }
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <NewStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          gpaError={this.state.gpaError} // Pass the GPA error to the view
          campusError={this.state.campusError}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addStudent: (student) => dispatch(addStudentThunk(student)),
  };
};

export default connect(null, mapDispatch)(NewStudentContainer);
