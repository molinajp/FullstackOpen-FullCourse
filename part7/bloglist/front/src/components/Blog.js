import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";

const Blog = ({ blog }) => {
  return (
    <Navbar bg="light">
      <Container>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}{" "}
        </Link>
      </Container>
    </Navbar>
  );
};

export default Blog;
