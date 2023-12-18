/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteStudent, deleteCampus} = props;

  if(campus === null){
    return <Redirect to={`/campuses`} />;
  }

  //Check if there are students
  if (!campus.students.length) {
    return (
      <div>
      <img src={campus.imageUrl} alt="College" width="500" height="400"></img>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <h3>There are no students for this campus. Try adding one using the button below.</h3>
      <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      </div>
    );
  };

  // Render a single Campus view with list of its students
  return (
    <div>
      <img src={campus.imageUrl} alt="College" width="500" height="400"></img>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/editcampus/${campus.id}`}>
      <button>Edit</button>
      </Link>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button onClick={() => deleteStudent(student.id)}>Delete Student</button>
          </div>
        );
      })}
      <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
    </div>
  );
};

export default CampusView;
