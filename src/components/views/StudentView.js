/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, editStudent } = props;

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.campus.name}</h3>
      <p>Email: {student.email}</p>
      <p>Image URL: {student.imageUrl}</p>
      <p>GPA: {student.gpa}</p>
      <Link to={`/editstudent/${student.id}`}>
      <button>Edit Student</button>
      </Link>
    </div>
  );
};

export default StudentView;
