import { useMatch } from "react-router-dom";
import { saveCommentInBack } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Button, InputGroup, Form } from "react-bootstrap";

const AddCommentForm = () => {
  const dispatch = useDispatch();
  const match = useMatch("/blogs/:id");

  const addComment = (event) => {
    event.preventDefault();
    dispatch(
      saveCommentInBack(match.params.id, {
        comment: event.target.comment.value,
      })
    );
    event.target.comment.value = "";
    dispatch(showNotification("comment added successfully", "success"));
  };

  return (
    <form onSubmit={addComment}>
      <InputGroup size="sm" className="mb-3">
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          name="comment"
        />
      </InputGroup>
      <Button type="submit" variant="secondary">
        add comment
      </Button>
    </form>
  );
};

export default AddCommentForm;
