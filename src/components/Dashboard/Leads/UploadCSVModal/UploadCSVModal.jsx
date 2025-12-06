import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./UploadCSVModal.module.css";
import { FiX, FiUpload } from "react-icons/fi";
import Notification from "../../../Common/Notification/Notification";

const UploadCSVModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setNotification(null);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setNotification({
          type: "error",
          message: "Only CSV files are allowed.",
        });
        setSelectedFile(null);
        e.target.value = "";
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setNotification({
          type: "error",
          message: "File size must be less than 10MB.",
        });
        setSelectedFile(null);
        e.target.value = "";
        return;
      }

      setSelectedFile(file);
      setNotification(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setNotification({
        type: "error",
        message: "Please select a CSV file to upload.",
      });
      return;
    }

    try {
      // TODO: Implement actual upload logic here
      console.log("Uploading file:", selectedFile);

      if (onUpload) {
        onUpload(selectedFile);
      }

      setNotification({
        type: "success",
        message: "Leads have been uploaded successfully.",
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
    setSelectedFile(null);
    setNotification(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleCancel}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.title}>Upload Leads (CSV)</h2>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleCancel}
            >
              <FiX />
            </button>
          </div>

          <div className={styles.content}>
            <p className={styles.description}>
              Please upload a CSV file following the required format.
            </p>

            <div className={styles.uploadArea}>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className={styles.fileInput}
                id="csvFileInput"
              />
              <label htmlFor="csvFileInput" className={styles.uploadLabel}>
                <FiUpload className={styles.uploadIcon} />
                <span className={styles.uploadText}>
                  {selectedFile ? selectedFile.name : "Choose file"}
                </span>
              </label>
            </div>

            <p className={styles.fileInfo}>
              Only .csv files are allowed. Max size: 10MB.
            </p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
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

export default UploadCSVModal;
