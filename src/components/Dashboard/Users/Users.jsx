// src/components/Dashboard/Users/Users.jsx
import { useState } from "react";
import styles from "./Users.module.css";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data - replace with API call
  const mockUsers = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    photo: `https://ui-avatars.com/api/?name=User+${
      i + 1
    }&background=052643&color=fff`,
    userId: i < 15 ? `S-00${i + 1}` : `A-00${i - 14}`,
    name: i < 15 ? "Marsela" : "Kafi Rijal",
    role: i < 15 ? "Sales" : "Admin",
    email: i < 15 ? "marselasela@gmail.com" : "kafirijal@gmail.com",
    password: "••••••••••",
  }));

  // Filter users by search query
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Handlers
  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleAddUser = () => {
    alert("Add User - Coming Soon!");
  };

  const handleEdit = (id) => {
    alert(`Edit User ID: ${id} - Coming Soon!`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      alert(`Delete User ID: ${id} - Coming Soon!`);
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

  return (
    <div className={styles.users}>
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchGroup}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name, email, or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Add Button */}
      <button className={styles.addBtn} onClick={handleAddUser}>
        <FiPlus /> Add User
      </button>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Photo</th>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td data-label="Photo">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className={styles.userPhoto}
                  />
                </td>
                <td data-label="ID">{user.userId}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Role">
                  <span className={styles.roleBadge}>{user.role}</span>
                </td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Password">{user.password}</td>
                <td data-label="Actions">
                  <div className={styles.actions}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleEdit(user.id)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleDelete(user.id)}
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
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)}{" "}
          of {filteredUsers.length} data
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

export default Users;
