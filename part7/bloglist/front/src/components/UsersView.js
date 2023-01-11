import { useEffect, useState } from "react";
import usersService from "../services/users";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const UsersView = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    usersService.getAllUsers().then((users) => setUsers(users));
  }, []);

  if (users !== null) {
    return (
      <div>
        <h2>Users</h2>
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default UsersView;
