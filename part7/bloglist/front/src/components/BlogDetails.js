import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import {
  likeForABlog,
  deleteABlog,
  initializeBlogs,
} from "../reducers/blogsReducer";
import AddCommentForm from "./AddCommentForm";
import { Button, Alert } from "react-bootstrap";

const BlogDetails = () => {
  const dispatch = useDispatch();

  const username = useSelector(({ user }) => user.username);

  const match = useMatch("/blogs/:id");

  const blog = useSelector(({ blogs }) =>
    blogs.find((b) => b.id === match.params.id)
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const styleForButton = () => {
    if (blog.user.username !== username) {
      return { display: "none" };
    }
  };

  const likeBlog = (blog) => {
    dispatch(likeForABlog(blog));
    dispatch(
      showNotification(`blog ${blog.title} by ${blog.author} liked`, "success")
    );
  };

  const deleteBlog = (blog) => {
    dispatch(deleteABlog(blog));
    navigate("/");
    dispatch(
      showNotification(
        `blog ${blog.title} by ${blog.author} has been successfully removed`,
        "success"
      )
    );
  };

  if (!blog) {
    return null;
  } else {
    return (
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <Alert variant="light">
          <Alert.Link href={blog.url}>{blog.url}</Alert.Link>
        </Alert>
        <div>
          <em>likes {blog.likes}</em>
          <Button onClick={() => likeBlog(blog)} variant="success">
            like
          </Button>
        </div>
        <div>
          <em>added by {blog.user.name}</em>
        </div>
        <div>
          <Button
            style={styleForButton()}
            onClick={() => deleteBlog(blog)}
            variant="danger"
          >
            remove
          </Button>
        </div>
        <h3>comments</h3>
        <AddCommentForm />
        {blog.comments.length !== 0 ? (
          <div>
            <ul>
              {blog.comments.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        ) : (
          <h4>no comments on this blog yet</h4>
        )}
      </div>
    );
  }
};

export default BlogDetails;
