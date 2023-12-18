import { Link } from 'react-router-dom';

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
      <h1>{student.firstname + ' ' + student.lastname}</h1>
      <Link to={`/campus/${student.campus.id}`}>
        <h2>{student.campus.name}</h2>
      </Link>
      <p>Email: {student.email}</p>

      {isValidUrl(student.imageUrl) ? (
        <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} style={{ maxWidth: '100%' }} />
      ) : (
        <p style={{ color: 'red' }}>Invalid Image URL</p>
      )}

      <p>GPA: {student.gpa}</p>
      
      <Link to={`/editstudent/${student.id}`}>
        <h2> Edit Student </h2>
      </Link>  

      <Link to={'/students'}>
        <button onClick={() => deleteStudent(student.id)}> Delete Student </button>
      </Link>

    </div>
  );
};

export default StudentView;
