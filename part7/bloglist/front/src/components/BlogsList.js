import CreateBlog from "./CreateBlog";
import Blog from "./Blog";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogsReducer";
import { ListGroup } from "react-bootstrap";

const BlogsList = () => {
  const dispatch = useDispatch();

  const allBlogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  });

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <CreateBlog />
      <ListGroup>
        {allBlogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Blog blog={blog} username={user.username} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default BlogsList;
