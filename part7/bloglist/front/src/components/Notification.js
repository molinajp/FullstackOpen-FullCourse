import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  if (notification === null) {
    return null;
  }
  return (
    <div className="container">
      {notification.message && (
        <Alert variant={notification.cssClassName}>
          {notification.message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
