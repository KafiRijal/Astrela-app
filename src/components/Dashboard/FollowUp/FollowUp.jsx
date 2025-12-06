import { useState } from "react";
import styles from "./FollowUp.module.css";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import FollowUpModal from "./FollowUpModal/FollowUpModal";
import DeleteConfirmation from "../../Common/DeleteConfirmation/DeleteConfirmation";

const FollowUp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFollowUp, setEditingFollowUp] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    id: null,
  });
  const itemsPerPage = 10;

  // Mock data - replace with API call
  const mockFollowUps = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    leadId: (i % 3) + 1,
    leadName: "Marsela",
    phone: "+62 812-4444-0004",
    schedule: "6/11/2025",
    notes: "Discuss loan product X",
    status: ["Missed", "Scheduled", "Done"][i % 3],
  }));

  // Pagination
  const totalPages = Math.ceil(mockFollowUps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFollowUps = mockFollowUps.slice(startIndex, endIndex);

  // Handlers
  const handleAddFollowUp = () => {
    setEditingFollowUp(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const followUpToEdit = mockFollowUps.find((item) => item.id === id);
    setEditingFollowUp({
      id: followUpToEdit.id,
      leadId: followUpToEdit.leadId.toString(),
      leadName: followUpToEdit.leadName,
      date: followUpToEdit.schedule,
      status: followUpToEdit.status,
      notes: followUpToEdit.notes,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const handleConfirmDelete = () => {
    console.log(`Delete Follow-Up ID: ${deleteConfirm.id}`);
    // TODO: Implement delete API call
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const handleSaveFollowUp = (formData) => {
    if (editingFollowUp) {
      console.log("Update follow-up:", { ...formData, id: editingFollowUp.id });
      // TODO: Implement update API call
    } else {
      console.log("Create new follow-up:", formData);
      // TODO: Implement create API call
    }
    // Don't show alert - notification is handled in modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFollowUp(null);
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

  const getStatusClass = (status) => {
    if (status === "Missed") return styles.statusMissed;
    if (status === "Scheduled") return styles.statusScheduled;
    return styles.statusDone;
  };

  return (
    <div className={styles.followUp}>
      {/* Add Button */}
      <button className={styles.addBtn} onClick={handleAddFollowUp}>
        <FiPlus /> Add Follow-Up
      </button>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Schedule</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFollowUps.map((followUp) => (
              <tr key={followUp.id}>
                <td data-label="Name">{followUp.leadName}</td>
                <td data-label="Phone">{followUp.phone}</td>
                <td data-label="Schedule">{followUp.schedule}</td>
                <td data-label="Notes">{followUp.notes}</td>
                <td data-label="Status">
                  <span
                    className={`${styles.statusBadge} ${getStatusClass(
                      followUp.status
                    )}`}
                  >
                    {followUp.status}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className={styles.actions}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleEdit(followUp.id)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleDelete(followUp.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
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
          Showing {startIndex + 1} to {Math.min(endIndex, mockFollowUps.length)}{" "}
          of {mockFollowUps.length} data
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

      {/* Follow-Up Modal */}
      <FollowUpModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveFollowUp}
        initialData={editingFollowUp}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={deleteConfirm.isOpen}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="Delete Follow-up Schedule"
        message="Are you sure you want to permanently delete this follow-up?"
      />
    </div>
  );
};

export default FollowUp;
