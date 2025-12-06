import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./IntroMessageModal.module.css";
import { FiX, FiCalendar, FiChevronDown } from "react-icons/fi";
import Notification from "../../../../Common/Notification/Notification";

const IntroMessageModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    date: "",
    status: "",
    notes: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setNotification(null);
      setShowCalendar(false);

      if (initialData) {
        setFormData({
          date: initialData.date || "",
          status: initialData.status || "",
          notes: initialData.note || "",
        });
      } else {
        setFormData({
          date: "",
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

    if (!formData.date || !formData.date.trim()) {
      setNotification({
        type: "error",
        message: "Please select a date.",
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
          ? "Your introduction message has been updated successfully."
          : "Your introduction message has been recorded successfully.",
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
      date: "",
      status: "",
      notes: "",
    });
    setShowCalendar(false);
    setNotification(null);
    onClose();
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isPrevMonth: true,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isPrevMonth: false,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isPrevMonth: false,
      });
    }

    return days;
  };

  const formatDate = (year, month, day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${d}/${m}/${year}`;
  };

  const handleDateSelect = (day, isCurrentMonth, isPrevMonth) => {
    const year = currentMonth.getFullYear();
    let month = currentMonth.getMonth();

    if (!isCurrentMonth) {
      if (isPrevMonth) {
        month = month - 1;
        if (month < 0) {
          month = 11;
        }
      } else {
        month = month + 1;
        if (month > 11) {
          month = 0;
        }
      }
    }

    const selectedDate = formatDate(year, month, day);
    setFormData((prev) => ({
      ...prev,
      date: selectedDate,
    }));
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isToday = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  if (!isOpen) return null;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();
  const days = getDaysInMonth(currentMonth);

  return (
    <>
      <div className={styles.overlay} onClick={handleCancel}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {initialData
                ? "Edit Introduction Message"
                : "Add Introduction Message"}
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
            {/* Date */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Date</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="date"
                  className={styles.input}
                  placeholder="Select date to follow-up"
                  value={formData.date}
                  onClick={() => setShowCalendar(!showCalendar)}
                  readOnly
                  autoComplete="off"
                />
                <FiCalendar className={styles.inputIcon} />
              </div>

              {showCalendar && (
                <div className={styles.calendarDropdown}>
                  <div className={styles.calendarHeader}>
                    <button
                      type="button"
                      className={styles.monthBtn}
                      onClick={handlePrevMonth}
                    >
                      ‹
                    </button>
                    <span className={styles.monthYear}>
                      {monthName} {year}
                    </span>
                    <button
                      type="button"
                      className={styles.monthBtn}
                      onClick={handleNextMonth}
                    >
                      ›
                    </button>
                  </div>

                  <div className={styles.calendarGrid}>
                    <div className={styles.dayHeader}>Su</div>
                    <div className={styles.dayHeader}>Mo</div>
                    <div className={styles.dayHeader}>Tu</div>
                    <div className={styles.dayHeader}>We</div>
                    <div className={styles.dayHeader}>Th</div>
                    <div className={styles.dayHeader}>Fr</div>
                    <div className={styles.dayHeader}>Sa</div>

                    {days.map((dayObj, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`${styles.dayCell} ${
                          !dayObj.isCurrentMonth ? styles.dayCellOther : ""
                        } ${
                          isToday(dayObj.day, dayObj.isCurrentMonth)
                            ? styles.dayCellToday
                            : ""
                        }`}
                        onClick={() =>
                          handleDateSelect(
                            dayObj.day,
                            dayObj.isCurrentMonth,
                            dayObj.isPrevMonth
                          )
                        }
                      >
                        {dayObj.day}
                      </button>
                    ))}
                  </div>

                  <div className={styles.calendarFooter}>
                    <button
                      type="button"
                      className={styles.cancelCalendarBtn}
                      onClick={() => setShowCalendar(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={styles.setDateBtn}
                      onClick={() => setShowCalendar(false)}
                    >
                      Set Date
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <div className={styles.inputWrapper}>
                <select
                  name="status"
                  className={styles.select}
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="Done">Done</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
                <FiChevronDown className={styles.inputIcon} />
              </div>
            </div>

            {/* Notes */}
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

            {/* Actions */}
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveBtn}>
                Save Log
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

export default IntroMessageModal;
