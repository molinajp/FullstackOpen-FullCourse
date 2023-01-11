import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewBlog } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";
import { Button } from "react-bootstrap";

const CreateBlog = () => {
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [visibilityForm, setVisibilityForm] = useState(false);

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    toggleVisibility();
    dispatch(addNewBlog(newBlog));
    dispatch(
      showNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success"
      )
    );
  };

  const toggleVisibility = () => {
    setVisibilityForm(!visibilityForm);
    if (!visibilityForm) {
      setNewAuthor("");
      setNewTitle("");
      setNewUrl("");
    }
  };

  if (!visibilityForm) {
    return (
      <Button onClick={toggleVisibility} id="new-note" variant="primary">
        new note
      </Button>
    );
  } else {
    return (
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:{" "}
          <input
            id="title"
            value={newTitle}
            onChange={handleNewTitle}
            placeholder="title"
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            value={newAuthor}
            onChange={handleNewAuthor}
            placeholder="author"
          />
        </div>
        <div>
          url:{" "}
          <input
            id="url"
            value={newUrl}
            onChange={handleNewUrl}
            placeholder="url"
          />
        </div>
        <div>
          <Button type="submit" id="create-blog" variant="success">
            create
          </Button>
        </div>
        <div>
          <Button type="button" onClick={toggleVisibility} variant="warning">
            cancel
          </Button>
        </div>
      </form>
    );
  }
};

export default CreateBlog;
