/*==================================================
EditCampusViewContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    // Initialize state
    constructor(props){
      super(props);
      this.state = {
        firstname: "",
        lastname: "",
        email: "",
        imageUrl: "",
        gpa: "",
        campusId: null,
        redirect: false,
        redirectId: null,
      };
    }

    componentDidMount() {
        this.props.fetchStudent(this.props.match.params.id)
        .then(student => {
          this.setState({ student });
        })
        .catch(error => {
          console.error("Error fetching student data:", error);
        });
    }

    // Capture input data when it is entered
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Take action after user click the submit button
    handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.

        let student = {
            id: this.props.match.params.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            campusId: this.state.campusId,
            email: this.state.email,
            gpa: this.state.gpa,
            imageUrl: this.state.imageUrl
        };

        // Edit student in the back-end database
        let updatedStudent = await this.props.editStudent(student);

        // Update state, and trigger redirect to show the updated student
        this.setState({
            firstname: "",
            lastname: "",
            email: "",
            gpa: "",
            imageUrl: "",
            campusId: null,
            redirect: true,
            redirectId: this.props.match.params.id
        });
    }

    render() {
        // Redirect to student page after submit
        if (this.state.redirect) {
            // Assuming you have a route for displaying a student by its ID
            return <Redirect to={`/student/${this.props.match.params.id}`} />;
        }

        // Display the edit student form via the corresponding View component
        return (
            <div>
                <Header />
                <EditStudentView
                    student={this.props.student}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        student: state.student,
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);