import { useEffect, useState } from "react";
import userService from "../services/users";
import { useMatch } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const User = () => {
  const match = useMatch("/users/:id");

  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.getUserById(match.params.id).then((user) => setUser(user));
  });

  if (!user) {
    return null;
  } else {
    return (
      <ListGroup>
        <h2>{user.name}</h2>
        <h4>
          <em>added blogs</em>
        </h4>
        <ul>
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id} variant="dark">
              {blog.title}
            </ListGroup.Item>
          ))}
        </ul>
      </ListGroup>
    );
  }
};

export default User;
