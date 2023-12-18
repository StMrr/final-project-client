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

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
    // Initialize state
    constructor(props){
      super(props);
      this.state = {
        name: "",
        address: "",
        description: "",
        imageUrl: "",
        redirect: false,
        redirectId: null,
      };
    }

    componentDidMount() {
        this.props.fetchCampus(this.props.match.params.id)
        .then(campus => {
          this.setState({ campus });
        })
        .catch(error => {
          console.error("Error fetching campus data:", error);
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

    let campus = {
        id: this.props.match.params.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
    };

    // Add new campus in back-end database
    let newCampus = await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the new campus
    this.setState({
        name: "",
        imageUrl: "",
        address: "",
        description: "",
        redirect: true,
        redirectId: this.props.match.params.id
      });
  }


    render() {
        // Redirect to campus page after submit
        if (this.state.redirect) {
          // Assuming you have a route for displaying a campus by its ID
          return <Redirect to={`/campus/${this.props.match.params.id}`} />;
        }

        // Display the edit campus form via the corresponding View component
        return (
          <div>
            <Header />
            <EditCampusView
              campus={this.props.campus}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        );
      }
}


const mapState = (state) => {
    return {
      campus: state.campus,
    };
  };

const mapDispatch = (dispatch) => {
    return {
      fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
      editCampus: (campus) => dispatch(editCampusThunk(campus)),
    };
  };


export default connect(mapState, mapDispatch)(EditCampusContainer);