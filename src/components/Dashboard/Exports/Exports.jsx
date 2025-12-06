import { useState } from "react";
import styles from "./Exports.module.css";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEye,
  FiCalendar,
} from "react-icons/fi";

const Exports = ({ userRole = "admin" }) => {
  const [filters, setFilters] = useState({
    // Admin filters
    sales: "all",
    sortBy: "date-new-old",
    // Sales filters
    resource: "leads",
    status: "",
    // Common filters
    startDate: "",
    endDate: "",
  });

  // Column selection state for Sales role
  const [selectedColumns, setSelectedColumns] = useState({
    // Leads columns
    leadId: true,
    name: true,
    phone: true,
    score: true,
    lastContact: true,
    status: true,
    age: true,
    marital: true,
    // Call logs columns
    callId: true,
    leadIdCall: true,
    nameCall: true,
    date: true,
    duration: true,
    statusCall: true,
    notes: true,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const itemsPerPage = 5;

  // Mock sales data for Admin
  const salesList = [
    { id: "all", name: "All Sales" },
    { id: 1, name: "Marsela" },
    { id: 2, name: "Kafi Rijal" },
    { id: 3, name: "John Doe" },
  ];

  // Status options for Sales role
  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "subscription", label: "Subscription" },
    { value: "call-back-later", label: "Call Back Later" },
    { value: "not-interested", label: "Not Interested" },
  ];

  // Mock data for Admin
  const mockAdminData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    date: "04/12/2025",
    sales: "Marsela",
    calls: 50,
    conversions: 25,
    conversionRate: "50%",
  }));

  // Mock data for Sales - Leads
  const mockLeadsData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    leadId: `L-00${i + 1}`,
    name: "Marsela",
    phone: "+62 812-4444-0004",
    score: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low",
    lastContact: "6/11/2025",
    status:
      i % 3 === 0
        ? "Subscription"
        : i % 3 === 1
        ? "Call Back Later"
        : "Not Interested",
    age: 21 + (i % 10),
    marital: i % 2 === 0 ? "Married" : "Single",
  }));

  // Mock data for Sales - Call Logs
  const mockCallLogsData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    callId: `C-00${i + 1}`,
    leadId: `L-00${i + 1}`,
    name: "Marsela",
    date: "6/11/2025",
    duration: 180,
    status:
      i % 3 === 0
        ? "Subscription"
        : i % 3 === 1
        ? "Call Back Later"
        : "Not Interested",
    notes:
      i % 3 === 0 ? "Interested" : i % 3 === 1 ? "Call back next week" : "-",
  }));

  // Get current data based on role and resource
  const getCurrentData = () => {
    if (userRole === "admin") {
      return mockAdminData;
    }
    return filters.resource === "leads" ? mockLeadsData : mockCallLogsData;
  };

  const currentData = getCurrentData();

  // Pagination
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

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

  const handleDateSelect = (day, isCurrentMonth, isPrevMonth, type) => {
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

    if (type === "start") {
      setFilters((prev) => ({ ...prev, startDate: selectedDate }));
      setShowStartCalendar(false);
    } else {
      setFilters((prev) => ({ ...prev, endDate: selectedDate }));
      setShowEndCalendar(false);
    }
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

  // Handlers
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleColumnToggle = (column) => {
    setSelectedColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handlePreview = () => {
    if (!filters.startDate || !filters.endDate) {
      alert("Please select both start and end dates");
      return;
    }
    setShowPreview(true);
    setCurrentPage(1);
  };

  const handleExport = (format) => {
    if (!showPreview) {
      alert("Please preview data first");
      return;
    }
    console.log(`Exporting as ${format}`, filters);
    // TODO: Implement actual export logic
    alert(`Exporting data as ${format}...`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Get badge color for score/status
  const getBadgeClass = (value, type) => {
    if (type === "score") {
      if (value === "High") return styles.badgeHigh;
      if (value === "Medium") return styles.badgeMedium;
      return styles.badgeLow;
    }
    if (type === "status") {
      if (value === "Subscription") return styles.badgeSubscription;
      if (value === "Call Back Later") return styles.badgeCallBack;
      return styles.badgeNotInterested;
    }
  };

  return (
    <div className={styles.exports}>
      {/* Filter Card */}
      <div className={styles.filterCard}>
        <div className={styles.filterGrid}>
          {userRole === "admin" ? (
            <>
              {/* Admin Filters */}
              <div className={styles.filterGroup}>
                <label className={styles.label}>Sales</label>
                <select
                  className={styles.select}
                  value={filters.sales}
                  onChange={(e) => handleFilterChange("sales", e.target.value)}
                >
                  {salesList.map((sales) => (
                    <option key={sales.id} value={sales.id}>
                      {sales.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.label}>Sort by</label>
                <select
                  className={styles.select}
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="date-new-old">Date (new → old)</option>
                  <option value="conversions-high-low">
                    Conversions rate (high → low)
                  </option>
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Sales Filters */}
              <div className={styles.filterGroup}>
                <label className={styles.label}>Resource</label>
                <select
                  className={styles.select}
                  value={filters.resource}
                  onChange={(e) =>
                    handleFilterChange("resource", e.target.value)
                  }
                >
                  <option value="leads">Leads</option>
                  <option value="call-logs">Call Logs</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.label}>Status</label>
                <select
                  className={styles.select}
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Common Filters - Calendar */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>Starting Date</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.input}
                placeholder="Select date"
                value={filters.startDate}
                onClick={() => setShowStartCalendar(!showStartCalendar)}
                readOnly
                autoComplete="off"
              />
              <FiCalendar className={styles.inputIcon} />
            </div>

            {showStartCalendar && (
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
                          dayObj.isPrevMonth,
                          "start"
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
                    onClick={() => setShowStartCalendar(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={styles.setDateBtn}
                    onClick={() => setShowStartCalendar(false)}
                  >
                    Set Date
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.label}>End Date</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.input}
                placeholder="Select date"
                value={filters.endDate}
                onClick={() => setShowEndCalendar(!showEndCalendar)}
                readOnly
                autoComplete="off"
              />
              <FiCalendar className={styles.inputIcon} />
            </div>

            {showEndCalendar && (
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
                          dayObj.isPrevMonth,
                          "end"
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
                    onClick={() => setShowEndCalendar(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={styles.setDateBtn}
                    onClick={() => setShowEndCalendar(false)}
                  >
                    Set Date
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Column Selection for Sales Role - Checkboxes */}
        {userRole === "sales" && (
          <div className={styles.columnSection}>
            <label className={styles.label}>Column to include</label>
            <div className={styles.columnCheckboxes}>
              {filters.resource === "leads" ? (
                <>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.leadId}
                      onChange={() => handleColumnToggle("leadId")}
                    />
                    <span className={styles.checkboxText}>Lead ID</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.name}
                      onChange={() => handleColumnToggle("name")}
                    />
                    <span className={styles.checkboxText}>Name</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.phone}
                      onChange={() => handleColumnToggle("phone")}
                    />
                    <span className={styles.checkboxText}>Phone</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.score}
                      onChange={() => handleColumnToggle("score")}
                    />
                    <span className={styles.checkboxText}>Score</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.lastContact}
                      onChange={() => handleColumnToggle("lastContact")}
                    />
                    <span className={styles.checkboxText}>Last Contact</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.status}
                      onChange={() => handleColumnToggle("status")}
                    />
                    <span className={styles.checkboxText}>Status</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.age}
                      onChange={() => handleColumnToggle("age")}
                    />
                    <span className={styles.checkboxText}>Age</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.marital}
                      onChange={() => handleColumnToggle("marital")}
                    />
                    <span className={styles.checkboxText}>Marital</span>
                  </label>
                </>
              ) : (
                <>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.callId}
                      onChange={() => handleColumnToggle("callId")}
                    />
                    <span className={styles.checkboxText}>Call ID</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.leadIdCall}
                      onChange={() => handleColumnToggle("leadIdCall")}
                    />
                    <span className={styles.checkboxText}>Lead ID</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.nameCall}
                      onChange={() => handleColumnToggle("nameCall")}
                    />
                    <span className={styles.checkboxText}>Name</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.date}
                      onChange={() => handleColumnToggle("date")}
                    />
                    <span className={styles.checkboxText}>Date</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.duration}
                      onChange={() => handleColumnToggle("duration")}
                    />
                    <span className={styles.checkboxText}>Duration(s)</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.statusCall}
                      onChange={() => handleColumnToggle("statusCall")}
                    />
                    <span className={styles.checkboxText}>Status</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedColumns.notes}
                      onChange={() => handleColumnToggle("notes")}
                    />
                    <span className={styles.checkboxText}>Notes</span>
                  </label>
                </>
              )}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.previewBtn} onClick={handlePreview}>
            <FiEye /> Preview
          </button>
          <button
            className={styles.exportBtn}
            onClick={() => handleExport("CSV")}
          >
            <FiDownload /> Export CSV
          </button>
          <button
            className={styles.exportBtn}
            onClick={() => handleExport("XLSX")}
          >
            <FiDownload /> Export XLSX
          </button>
          <button
            className={styles.exportBtn}
            onClick={() => handleExport("PDF")}
          >
            <FiDownload /> Export PDF
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <div>
                <h3 className={styles.previewTitle}>Preview</h3>
                <p className={styles.rowCount}>{currentData.length} rows</p>
              </div>
              <p className={styles.columnNote}>
                Columns shown are those selected above
              </p>
            </div>
          </div>

          {/* Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {userRole === "admin" ? (
                    <>
                      <th>Date</th>
                      <th>Sales</th>
                      <th>Calls</th>
                      <th>Conversions</th>
                      <th>Conversion Rate</th>
                    </>
                  ) : filters.resource === "leads" ? (
                    <>
                      {selectedColumns.leadId && <th>Lead ID</th>}
                      {selectedColumns.name && <th>Name</th>}
                      {selectedColumns.phone && <th>Phone</th>}
                      {selectedColumns.score && <th>Score</th>}
                      {selectedColumns.lastContact && <th>Last Contact</th>}
                      {selectedColumns.status && <th>Status</th>}
                      {selectedColumns.age && <th>Age</th>}
                      {selectedColumns.marital && <th>Marital</th>}
                    </>
                  ) : (
                    <>
                      {selectedColumns.callId && <th>Call ID</th>}
                      {selectedColumns.leadIdCall && <th>Lead ID</th>}
                      {selectedColumns.nameCall && <th>Name</th>}
                      {selectedColumns.date && <th>Date</th>}
                      {selectedColumns.duration && <th>Duration(s)</th>}
                      {selectedColumns.statusCall && <th>Status</th>}
                      {selectedColumns.notes && <th>Notes</th>}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row) => (
                  <tr key={row.id}>
                    {userRole === "admin" ? (
                      <>
                        <td>{row.date}</td>
                        <td>{row.sales}</td>
                        <td>{row.calls}</td>
                        <td>{row.conversions}</td>
                        <td>{row.conversionRate}</td>
                      </>
                    ) : filters.resource === "leads" ? (
                      <>
                        {selectedColumns.leadId && <td>{row.leadId}</td>}
                        {selectedColumns.name && <td>{row.name}</td>}
                        {selectedColumns.phone && <td>{row.phone}</td>}
                        {selectedColumns.score && (
                          <td>
                            <span
                              className={`${styles.badge} ${getBadgeClass(
                                row.score,
                                "score"
                              )}`}
                            >
                              {row.score}
                            </span>
                          </td>
                        )}
                        {selectedColumns.lastContact && (
                          <td>{row.lastContact}</td>
                        )}
                        {selectedColumns.status && (
                          <td>
                            <span
                              className={`${styles.statusBadge} ${getBadgeClass(
                                row.status,
                                "status"
                              )}`}
                            >
                              {row.status}
                            </span>
                          </td>
                        )}
                        {selectedColumns.age && <td>{row.age}</td>}
                        {selectedColumns.marital && <td>{row.marital}</td>}
                      </>
                    ) : (
                      <>
                        {selectedColumns.callId && <td>{row.callId}</td>}
                        {selectedColumns.leadIdCall && <td>{row.leadId}</td>}
                        {selectedColumns.nameCall && <td>{row.name}</td>}
                        {selectedColumns.date && <td>{row.date}</td>}
                        {selectedColumns.duration && <td>{row.duration}</td>}
                        {selectedColumns.statusCall && (
                          <td>
                            <span
                              className={`${styles.badge} ${getBadgeClass(
                                row.status,
                                "status"
                              )}`}
                            >
                              {row.status}
                            </span>
                          </td>
                        )}
                        {selectedColumns.notes && <td>{row.notes}</td>}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, currentData.length)} of {currentData.length}{" "}
              data
            </div>

            <div className={styles.paginationControls}>
              <button
                className={styles.paginationBtn}
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                <FiChevronLeft /> Previous
              </button>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    className={`${styles.pageBtn} ${
                      currentPage === pageNumber ? styles.pageBtnActive : ""
                    }`}
                    onClick={() => goToPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                className={styles.paginationBtn}
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next <FiChevronRight />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Exports;
