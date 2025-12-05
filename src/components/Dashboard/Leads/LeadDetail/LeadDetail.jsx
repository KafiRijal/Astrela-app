// src/components/Dashboard/LeadDetail/LeadDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./LeadDetail.module.css";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import IntroMessageModal from "./IntroMessageModal/IntroMessageModal";
import CallLogModal from "./CallLogModal/CallLogModal";
import DeleteConfirmation from "../../../Common/DeleteConfirmation/DeleteConfirmation";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editingCallLog, setEditingCallLog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    id: null,
    type: null, // 'intro' or 'calllog'
  });

  // Mock data - replace with API call based on ID
  const [lead] = useState({
    id: id,
    name: "Marsela",
    phone: "+62 812-4444-0004",
    email: "marselasela@gmail.com",
    address: "Jl. Setu Indah No. 7A, Cimanggis Depok",
    age: 21,
    job: "Manager",
    maritalStatus: "Married",
    education: "Bachelor",
    score: 82,
    priority: "High Priority",
    probabilityScore: {
      value: 82,
      summary:
        "The segment with the highest engagement, most responsive, fresh, and has strong economic momentum. Very easy to convert due to long interactions, low fatigue, and high willingness to accept financial products.",
      details: [
        "Highest duration (1669 seconds) → very high engagement",
        "Previous lowest (0.13) → fresh and rarely contacted",
        "Lowest outcome failure → clean campaign history",
        "Predominantly blue-collar & stable workers",
        "Best economic indicators (high Euribor and employment)",
        "Highest loan_yes → open to banking products",
      ],
      recommendation: "Follow up quickly within 24 hours",
    },
    introductionMessages: [
      {
        id: 1,
        date: "6/11/2025",
        note: "Sent WhatsApp introduction, waiting reply",
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
        date: "6/11/2025",
        note: "Sent product brochure via email",
        status: "Done",
      },
    ],
    callLogs: [
      {
        id: 1,
        date: "7/11/2025",
        duration: "180",
        note: "Very Interested",
        status: "Subscription",
      },
      {
        id: 2,
        date: "1/11/2025",
        duration: "120",
        note: "Currently busy, please contact again next week.",
        status: "Call Back Later",
      },
    ],
  });

  // Animate score circle on mount
  useEffect(() => {
    const targetScore = lead.score;
    const duration = 1500;
    const steps = 60;
    const increment = targetScore / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        setProgress(targetScore);
        clearInterval(timer);
      } else {
        setProgress(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [lead.score]);

  const handleBack = () => {
    navigate("/dashboard/leads");
  };

  // Introduction Message Handlers
  const handleAddIntroMessage = () => {
    setEditingMessage(null);
    setIsIntroModalOpen(true);
  };

  const handleEditIntroMessage = (msgId) => {
    const messageToEdit = lead.introductionMessages.find(
      (msg) => msg.id === msgId
    );
    setEditingMessage(messageToEdit);
    setIsIntroModalOpen(true);
  };

  // Use centralized delete flow that opens confirmation modal
  const handleDelete = (id, type) => {
    setDeleteConfirm({ isOpen: true, id, type });
  };

  const handleConfirmDelete = () => {
    console.log(
      `Delete ${
        deleteConfirm.type === "intro" ? "Introduction Message" : "Call Log"
      } ID: ${deleteConfirm.id}`
    );
    // TODO: Implement delete API call based on deleteConfirm.type and deleteConfirm.id
    setDeleteConfirm({ isOpen: false, id: null, type: null });
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirm({ isOpen: false, id: null, type: null });
  };

  // Previously separate delete handlers now delegate to handleDelete
  const handleDeleteIntroMessage = (msgId) => {
    handleDelete(msgId, "intro");
  };

  const handleDeleteCallLog = (logId) => {
    handleDelete(logId, "calllog");
  };

  const handleSaveIntroMessage = (formData) => {
    if (editingMessage) {
      // TODO: Implement update API call
      console.log("Update message:", { ...formData, id: editingMessage.id });
    } else {
      // TODO: Implement create API call
      console.log("Create new message:", formData);
    }
    // Don't show alert - notification is handled in modal
    // Modal will close automatically after notification
  };

  const handleCloseIntroModal = () => {
    setIsIntroModalOpen(false);
    setEditingMessage(null);
  };

  // Call Log Handlers
  const handleAddCallLog = () => {
    setEditingCallLog(null);
    setIsCallLogModalOpen(true);
  };

  const handleEditCallLog = (logId) => {
    const logToEdit = lead.callLogs.find((log) => log.id === logId);
    setEditingCallLog(logToEdit);
    setIsCallLogModalOpen(true);
  };

  const handleSaveCallLog = (formData) => {
    if (editingCallLog) {
      // TODO: Implement update API call
      console.log("Update call log:", { ...formData, id: editingCallLog.id });
    } else {
      // TODO: Implement create API call
      console.log("Create new call log:", formData);
    }
    // Don't show alert - notification is handled in modal
    // Modal will close automatically after notification
  };

  const handleCloseCallLogModal = () => {
    setIsCallLogModalOpen(false);
    setEditingCallLog(null);
  };

  // Calculate circle stroke
  const circumference = 2 * Math.PI * 85;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.leadDetail}>
      {/* Back Button */}
      <div className={styles.headerActions}>
        <button className={styles.backBtn} onClick={handleBack}>
          <FiArrowLeft /> Back
        </button>
      </div>

      {/* Overview & Demographics */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview & Demographics</h2>
        <div className={styles.card}>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Name</span>
              <span className={styles.infoSeparator}>:</span>
              <span className={styles.infoValue}>{lead.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Phone</span>
              <span className={styles.infoSeparator}>:</span>
              <span className={styles.infoValue}>{lead.phone}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoSeparator}>:</span>
              <span className={styles.infoValue}>{lead.email}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Address</span>
              <span className={styles.infoSeparator}>:</span>
              <span className={styles.infoValue}>{lead.address}</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Age</span>
              <span className={styles.statValue}>{lead.age}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Job</span>
              <span className={styles.statValue}>{lead.job}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Marital</span>
              <span className={styles.statValue}>{lead.maritalStatus}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Education</span>
              <span className={styles.statValue}>{lead.education}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Probability Score */}
      <div className={styles.section}>
        <div className={styles.card}>
          <div className={styles.scoreHeader}>
            <h2 className={styles.sectionTitle}>Probability Score</h2>
            <span className={styles.badge}>{lead.priority}</span>
          </div>

          <div className={styles.summarySection}>
            <h3 className={styles.summaryTitle}>Summary :</h3>
            <p className={styles.summaryText}>
              {lead.probabilityScore.summary}
            </p>
          </div>

          <div className={styles.scoreContainer}>
            <div className={styles.scoreCircleWrapper}>
              <svg className={styles.scoreCircleSvg} viewBox="0 0 200 200">
                <circle
                  className={styles.scoreCircleBackground}
                  cx="100"
                  cy="100"
                  r="85"
                />
                <circle
                  className={styles.scoreCircleProgress}
                  cx="100"
                  cy="100"
                  r="85"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                  }}
                />
              </svg>
              <div className={styles.scoreValue}>
                <span className={styles.scoreNumber}>{progress}%</span>
              </div>
            </div>

            <div className={styles.scoreDetails}>
              <h3 className={styles.detailsTitle}>Details :</h3>
              <ul className={styles.detailsList}>
                {lead.probabilityScore.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.recommendation}>
            <strong>Recommendations :</strong>
            <br />
            {lead.probabilityScore.recommendation}
          </div>
        </div>
      </div>

      {/* Introduction Message */}
      <div className={styles.section}>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <h2 className={styles.tableTitle}>Introduction Message</h2>
              <span className={styles.tableSubtitle}>
                Messages for non-call follow-ups (WA, & email)
              </span>
            </div>
            <button className={styles.addBtn} onClick={handleAddIntroMessage}>
              + Add Introduction Message
            </button>
          </div>

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
              {lead.introductionMessages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.date}</td>
                  <td>{msg.note}</td>
                  <td>
                    <span className={styles.statusBadge}>{msg.status}</span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleEditIntroMessage(msg.id)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleDeleteIntroMessage(msg.id)}
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
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <h2 className={styles.tableTitle}>Call Log History</h2>
              <span className={styles.tableSubtitle}>
                Past call interactions
              </span>
            </div>
            <button className={styles.addBtn} onClick={handleAddCallLog}>
              + Add Call Log
            </button>
          </div>

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
                    <span className={styles.statusBadge}>{log.status}</span>
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

      {/* Introduction Message Modal */}
      <IntroMessageModal
        isOpen={isIntroModalOpen}
        onClose={handleCloseIntroModal}
        onSave={handleSaveIntroMessage}
        initialData={editingMessage}
      />

      {/* Call Log Modal */}
      <CallLogModal
        isOpen={isCallLogModalOpen}
        onClose={handleCloseCallLogModal}
        onSave={handleSaveCallLog}
        initialData={editingCallLog}
        leadName={lead.name}
        leadPhone={lead.phone}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={deleteConfirm.isOpen}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title={
          deleteConfirm.type === "intro"
            ? "Delete Introduction Message"
            : "Delete Call Log"
        }
        message={`Are you sure you want to permanently delete this ${
          deleteConfirm.type === "intro" ? "introduction message" : "call log"
        }?`}
      />
    </div>
  );
};

export default LeadDetail;
