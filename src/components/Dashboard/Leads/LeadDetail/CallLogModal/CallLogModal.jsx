import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./CallLogModal.module.css";
import { FiX, FiChevronDown } from "react-icons/fi";
import Notification from "../../../../Common/Notification/Notification";

const CallLogModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  leadName = "",
  leadPhone = "",
}) => {
  const [formData, setFormData] = useState({
    duration: "",
    status: "",
    notes: "",
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Clear notification when modal opens
      setNotification(null);

      if (initialData) {
        setFormData({
          duration: initialData.duration || "",
          status: initialData.status || "",
          notes: initialData.note || "",
        });
      } else {
        setFormData({
          duration: "",
          status: "",
          notes: "",
        });
      }
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!formData.duration || !formData.duration.toString().trim()) {
      setNotification({
        type: "error",
        message: "Please enter call duration.",
      });
      return;
    }

    if (isNaN(formData.duration) || parseFloat(formData.duration) < 0) {
      setNotification({
        type: "error",
        message: "Duration must be a valid positive number.",
      });
      return;
    }

    if (!formData.status || !formData.status.trim()) {
      setNotification({
        type: "error",
        message: "Please select a status.",
      });
      return;
    }

    if (!formData.notes || !formData.notes.trim()) {
      setNotification({
        type: "error",
        message: "Please enter notes.",
      });
      return;
    }

    try {
      onSave(formData);
      setNotification({
        type: "success",
        message: initialData
          ? "Your call log has been updated successfully."
          : "Your call log has been recorded successfully.",
      });
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const handleNotificationClose = () => {
    const wasSuccess = notification?.type === "success";
    setNotification(null);
    if (wasSuccess) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setFormData({
      duration: "",
      status: "",
      notes: "",
    });
    setNotification(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleCancel}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {initialData ? `Edit Call Log` : `Call Log — ${leadName}`}
            </h2>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleCancel}
            >
              <FiX />
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.phoneDisplay}>
              <span className={styles.phoneLabel}>Phone:</span>
              <span className={styles.phoneNumber}>{leadPhone}</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Duration (seconds)</label>
              <input
                type="number"
                name="duration"
                className={styles.input}
                placeholder="0"
                value={formData.duration}
                onChange={handleChange}
                min="0"
                autoComplete="off"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <div className={styles.inputWrapper}>
                <select
                  name="status"
                  className={styles.select}
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Call Back Later">Call Back Later</option>
                </select>
                <FiChevronDown className={styles.inputIcon} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Notes</label>
              <textarea
                name="notes"
                className={styles.textarea}
                placeholder="Free text notes. . ."
                value={formData.notes}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {notification &&
        createPortal(
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={handleNotificationClose}
          />,
          document.body
        )}
    </>
  );
};

export default CallLogModal;
