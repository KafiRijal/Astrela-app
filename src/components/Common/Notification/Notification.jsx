// src/components/Common/Notification/Notification.jsx
import { useEffect } from "react";
import styles from "./Notification.module.css";
import { FiCheck, FiX } from "react-icons/fi";

const Notification = ({
  type = "success",
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    if (type === "success") {
      return <FiCheck className={styles.icon} />;
    }
    return <FiX className={styles.icon} />;
  };

  const getTitle = () => {
    if (type === "success") {
      return "Log Saved";
    }
    return "Error Saving Log";
  };

  const getMessage = () => {
    if (message) return message;
    if (type === "success") {
      return "Your call log has been recorded successfully.";
    }
    return "Something went wrong. Please try again.";
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.notification} ${styles[type]}`}>
        <div className={styles.iconWrapper}>{getIcon()}</div>
        <h3 className={styles.title}>{getTitle()}</h3>
        <p className={styles.message}>{getMessage()}</p>
        <button className={styles.okBtn} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Notification;
