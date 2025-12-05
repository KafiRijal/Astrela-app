// src/components/Common/DeleteConfirmation/DeleteConfirmation.jsx
import { createPortal } from "react-dom";
import styles from "./DeleteConfirmation.module.css";
import { FiX } from "react-icons/fi";

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  message = "Are you sure you want to permanently delete this item?",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={handleConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirmation;
