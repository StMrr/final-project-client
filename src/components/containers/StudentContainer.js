import Header from './Header';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentThunk, deleteStudentThunk } from '../../store/thunks';
import { StudentView } from '../views';

class StudentContainer extends Component {
  // Get student data from the back-end database
  componentDidMount() {
    // Getting student ID from the URL
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Render Student view by passing student data as props to the corresponding View component
  render() {
    const { student, deleteStudent } = this.props;
    const hasCampus = !!student.campusId; // Check if campusId exists

    return (
      <div>
        <Header />
        <StudentView student={student} deleteStudent={deleteStudent} hasCampus={hasCampus} />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    student: state.student, // Get the State object from Reducer "student"
  };
};
// The "mapDispatch" argument is used to dispatch Actions (Redux Thunks) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    deleteStudent: (studentId) => dispatch(deleteStudentThunk(studentId)),
  };
};

// Export store-connected container by default
// StudentContainer uses the "connect" function to connect to the Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(StudentContainer);
