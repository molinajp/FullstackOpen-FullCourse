import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { showNotification } from "../reducers/notificationReducer";
import UsersView from "./UsersView";
import LoginForm from "./LoginForm";
import BlogsList from "./BlogsList";
import User from "./User";
import BlogDetails from "./BlogDetails";
import Notification from "./Notification";
import { Button, Navbar, Nav, Badge } from "react-bootstrap";

const Presentation = () => {
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const padding = {
    paddingRight: 5,
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
    dispatch(showNotification(`goodbye ${user.name}`, "success"));
  };

  if (user !== null) {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link to="/" style={padding}>
                  blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users" style={padding}>
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <em style={padding}>{user.name} logged in </em>
              </Nav.Link>
              <Button id="logout" onClick={handleLogout}>
                logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <h1>
          <Badge bg="secondary">Blogs app</Badge>
        </h1>
        <Notification />
        <Routes>
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/" element={<BlogsList />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          <Badge bg="secondary">Blogs app</Badge>
        </h1>
        <Notification />
        <LoginForm />
      </div>
    );
  }
};

export default Presentation;
