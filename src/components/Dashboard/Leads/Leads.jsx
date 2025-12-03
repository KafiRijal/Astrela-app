// src/components/Dashboard/Leads/Leads.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Leads.module.css";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

const Leads = ({ userRole = "sales" }) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("high-to-low");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - replace with API call
  const mockLeads = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: "Marsela",
    phone: "+62 812-4444-0004",
    score: Math.floor(Math.random() * 100) + 1,
    scorePercent: (Math.random() * 100).toFixed(1),
    priority: [
      "High Priority",
      "Medium Priority",
      "Low Mid Priority",
      "Lowest Priority",
    ][Math.floor(Math.random() * 4)],
    lastContact: "6/11/2025",
    followUp:
      i % 5 === 0
        ? "None"
        : i % 3 === 0
        ? "Schedule for 6/20"
        : "2 days remaining",
  }));

  // Sort leads
  const sortedLeads = [...mockLeads].sort((a, b) => {
    if (sortBy === "high-to-low") {
      return b.score - a.score;
    } else {
      return a.score - b.score;
    }
  });

  // Filter leads by search query
  const filteredLeads = sortedLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)
  );

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  // Handlers
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleViewDetail = (id) => {
    // Navigate to lead detail page
    navigate(`/dashboard/leads/${id}`);
  };

  const handleAddLead = () => {
    navigate("/dashboard/leads/create");
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/leads/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      alert(`Delete Lead ID: ${id} - Coming Soon!`);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getPriorityClass = (priority) => {
    if (priority.includes("High")) return styles.priorityHigh;
    if (priority.includes("Medium")) return styles.priorityMedium;
    if (priority.includes("Low Mid")) return styles.priorityLowMid;
    return styles.priorityLowest;
  };

  return (
    <div className={styles.leads}>
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.sortGroup}>
          <label className={styles.sortLabel}>sort by</label>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="high-to-low">Score (high → low)</option>
            <option value="low-to-high">Score (low → high)</option>
          </select>
        </div>

        <div className={styles.searchGroup}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Add Button - Only for Admin */}
      {userRole === "admin" && (
        <button className={styles.addBtn} onClick={handleAddLead}>
          <FiPlus /> Add Leads
        </button>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Score</th>
              <th>Label</th>
              <th>Last Contact</th>
              <th>Follow-Up</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id}>
                <td data-label="Name">{lead.name}</td>
                <td data-label="Phone">{lead.phone}</td>
                <td data-label="Score">{lead.scorePercent}%</td>
                <td data-label="Label">
                  <span
                    className={`${styles.priority} ${getPriorityClass(
                      lead.priority
                    )}`}
                  >
                    {lead.priority}
                  </span>
                </td>
                <td data-label="Last Contact">{lead.lastContact}</td>
                <td data-label="Follow-Up">
                  <span className={styles.followUp}>{lead.followUp}</span>
                </td>
                <td data-label="Actions">
                  <div className={styles.actions}>
                    {userRole === "sales" ? (
                      <button
                        className={styles.detailBtn}
                        onClick={() => handleViewDetail(lead.id)}
                      >
                        Detail
                      </button>
                    ) : (
                      <>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleViewDetail(lead.id)}
                          title="View"
                        >
                          <FiEye />
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleEdit(lead.id)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleDelete(lead.id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredLeads.length)}{" "}
          of {filteredLeads.length} data
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
    </div>
  );
};

export default Leads;
