// src/components/Dashboard/LeadDetail/LeadDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./LeadDetail.module.css";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with API call based on ID
  const [lead] = useState({
    id: id,
    name: "Marsela",
    phone: "+62 812-4444-0004",
    email: "marsela@gmail.com",
    age: 32,
    gender: "Female",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    score: 82,
    priority: "High Priority",
    status: "Married",
    education: "Bachelor",
    lastContact: "6/11/2025",
    followUp: "Schedule for 6/20",
    probabilityScore: {
      value: 82,
      details: {
        targetEngagement: "Most responsive",
        previousCredit: "8+ loan over many completed",
        creditScore: "Good",
        incomeStability: "Stable income (5+ years in same job)",
        spendingBehavior: "Moderate spending, low debt-to-income ratio",
        highestProducts: "Credit Card, Personal Loan",
      },
    },
    notes: [
      {
        id: 1,
        date: "6/10/2025",
        note: "Sent whatsapp introduction, waiting reply",
        status: "Done",
      },
      {
        id: 2,
        date: "6/11/2025",
        note: "Sent product brochure via email",
        status: "Done",
      },
      {
        id: 3,
        date: "6/12/2025",
        note: "Best product brochure via email",
        status: "Done",
      },
    ],
    callLogs: [
      {
        id: 1,
        date: "7/11/2025",
        note: "Very interested",
        status: "Interested",
      },
      {
        id: 2,
        date: "7/12/2025",
        note: "Currently busy, please call again next week",
        status: "Callback Later",
      },
    ],
  });

  const handleBack = () => {
    navigate("/dashboard/leads");
  };

  const handleEdit = () => {
    alert(`Edit Lead ID: ${id} - Coming Soon!`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      alert(`Delete Lead ID: ${id} - Coming Soon!`);
      navigate("/dashboard/leads");
    }
  };

  const handleAddNote = () => {
    alert("Add Note - Coming Soon!");
  };

  const handleAddCallLog = () => {
    alert("Add Call Log - Coming Soon!");
  };

  const handleEditNote = (noteId) => {
    alert(`Edit Note ID: ${noteId} - Coming Soon!`);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      alert(`Delete Note ID: ${noteId} - Coming Soon!`);
    }
  };

  const handleEditCallLog = (logId) => {
    alert(`Edit Call Log ID: ${logId} - Coming Soon!`);
  };

  const handleDeleteCallLog = (logId) => {
    if (window.confirm("Are you sure you want to delete this call log?")) {
      alert(`Delete Call Log ID: ${logId} - Coming Soon!`);
    }
  };

  return (
    <div className={styles.leadDetail}>
      {/* Header Actions */}
      <div className={styles.headerActions}>
        <button className={styles.backBtn} onClick={handleBack}>
          <FiArrowLeft /> Back
        </button>
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={handleEdit}>
            <FiEdit2 /> Edit
          </button>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      {/* Overview & Demographics */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview & Demographics</h2>
        <div className={styles.card}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Name</span>
              <span className={styles.infoValue}>{lead.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Phone</span>
              <span className={styles.infoValue}>{lead.phone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{lead.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Address</span>
              <span className={styles.infoValue}>{lead.address}</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Age</span>
              <span className={styles.statValue}>{lead.age}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Gender</span>
              <span className={styles.statValue}>{lead.gender}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Marital Status</span>
              <span className={styles.statValue}>{lead.status}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Education Level</span>
              <span className={styles.statValue}>{lead.education}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Probability Score */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Probability Score
          <span className={styles.badge}>High Priority</span>
        </h2>
        <div className={styles.card}>
          <div className={styles.scoreContainer}>
            <div className={styles.scoreCircle}>
              <div className={styles.scoreInner}>
                <span className={styles.scoreValue}>
                  {lead.probabilityScore.value}%
                </span>
              </div>
            </div>
            <div className={styles.scoreDetails}>
              <h3 className={styles.detailsTitle}>Details:</h3>
              <ul className={styles.detailsList}>
                <li>
                  <strong>Target engagement:</strong>{" "}
                  {lead.probabilityScore.details.targetEngagement}
                </li>
                <li>
                  <strong>Previous credit:</strong>{" "}
                  {lead.probabilityScore.details.previousCredit}
                </li>
                <li>
                  <strong>Credit score status:</strong>{" "}
                  {lead.probabilityScore.details.creditScore}
                </li>
                <li>
                  <strong>Income stability:</strong>{" "}
                  {lead.probabilityScore.details.incomeStability}
                </li>
                <li>
                  <strong>Spending behavior:</strong>{" "}
                  {lead.probabilityScore.details.spendingBehavior}
                </li>
                <li>
                  <strong>Highest suitable products:</strong>{" "}
                  {lead.probabilityScore.details.highestProducts}
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.recommendation}>
            <strong>Recommendation:</strong> Follow up quickly within 24 hours.
          </div>
        </div>
      </div>

      {/* Introduction Message */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Introduction Message</h2>
        <div className={styles.card}>
          <div className={styles.messageBox}>
            <p>Message (via sms, call follow, use, CPA, e-mail)</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Notes</h2>
          <button className={styles.addBtn} onClick={handleAddNote}>
            + Add new notes
          </button>
        </div>
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lead.notes.map((note) => (
                <tr key={note.id}>
                  <td>{note.date}</td>
                  <td>{note.note}</td>
                  <td>
                    <span className={styles.statusDone}>{note.status}</span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleEditNote(note.id)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleDeleteNote(note.id)}
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
      </div>

      {/* Call Log History */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Call Log History</h2>
          <button className={styles.addBtn} onClick={handleAddCallLog}>
            + Add call logs
          </button>
        </div>
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lead.callLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td>{log.note}</td>
                  <td>
                    <span className={styles.statusInterested}>
                      {log.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleEditCallLog(log.id)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleDeleteCallLog(log.id)}
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
      </div>
    </div>
  );
};

export default LeadDetail;
