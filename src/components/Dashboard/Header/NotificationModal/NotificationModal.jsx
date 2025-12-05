// src/components/Dashboard/Header/NotificationModal/NotificationModal.jsx

import styles from "./NotificationModal.module.css";
import { FiX } from "react-icons/fi";

const NotificationModal = ({
  isOpen,
  onClose,
  notifications = [],
  onUpdate, // <-- NEW: callback ke parent
}) => {
  if (!isOpen) return null;

  const handleMarkAsRead = (id) => {
    const updated = notifications.map((notif) =>
      notif.id === id ? { ...notif, isRead: true } : notif
    );
    onUpdate(updated);
  };

  const handleMarkAsUnread = (id) => {
    const updated = notifications.map((notif) =>
      notif.id === id ? { ...notif, isRead: false } : notif
    );
    onUpdate(updated);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Notifications</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close notifications"
          >
            <FiX />
          </button>
        </div>

        <div className={styles.content}>
          {notifications.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>No notifications</p>
            </div>
          ) : (
            <div className={styles.notificationList}>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`${styles.notificationItem} ${
                    notif.isRead ? styles.read : styles.unread
                  }`}
                >
                  <div className={styles.notificationRow}>
                    <div className={styles.notificationContent}>
                      <h3 className={styles.notificationTitle}>
                        {notif.title}
                      </h3>
                      <p className={styles.notificationMessage}>
                        {notif.message}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`${styles.markBtn} ${
                        notif.isRead ? styles.markUnread : styles.markRead
                      }`}
                      onClick={() =>
                        notif.isRead
                          ? handleMarkAsUnread(notif.id)
                          : handleMarkAsRead(notif.id)
                      }
                    >
                      {notif.isRead ? "Mark as unread" : "Mark as read"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
