const Course = ({ course }) => {
    const items = course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
    const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  
    return <div>
      <h1>{course.name}</h1>
      {items}
      <p><b>total of {sum} exercises</b></p>
    </div>
  }

export default Course;
