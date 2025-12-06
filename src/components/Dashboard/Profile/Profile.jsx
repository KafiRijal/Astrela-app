import { useState } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    inApp: true,
    email: false,
  });

  // Mock user data - replace with actual data from auth context
  const userData = {
    name: "Marsela",
    role: "Sales",
    email: "marselasela@gmail.com",
    avatar: "M",
    quickStats: {
      conversion: 40,
      totalCalls: 55,
    },
    account: {
      lastLogin: "2025-11-06 10:42",
      device: "Chrome - Windows",
    },
  };

  const handleNotificationToggle = (type) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    // TODO: Save preferences to backend
    console.log("Notification preferences updated:", {
      ...notificationPreferences,
      [type]: !notificationPreferences[type],
    });
  };

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        {/* Left Section - User Info */}
        <div className={styles.leftSection}>
          {/* User Card */}
          <div className={styles.userCard}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>{userData.avatar}</div>
            </div>
            <h2 className={styles.userName}>{userData.name}</h2>
            <p className={styles.userRole}>{userData.role}</p>

            <div className={styles.aboutSection}>
              <h3 className={styles.sectionTitle}>About</h3>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Full name</span>
                <span className={styles.infoValue}>{userData.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{userData.email}</span>
              </div>
            </div>

            <div className={styles.quickStats}>
              <h3 className={styles.sectionTitle}>Quick Stats</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>
                    {userData.quickStats.conversion}
                  </div>
                  <div className={styles.statLabel}>Conversion</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>
                    {userData.quickStats.totalCalls}
                  </div>
                  <div className={styles.statLabel}>Total Calls</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Preferences */}
        <div className={styles.rightSection}>
          {/* Notification Preferences */}
          <div className={styles.preferencesCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Notification Preferences</h3>
              <p className={styles.cardSubtitle}>
                Choose how you receive reminders
              </p>
            </div>

            <div className={styles.preferenceItem}>
              <div className={styles.preferenceInfo}>
                <h4 className={styles.preferenceTitle}>In-app notifications</h4>
                <p className={styles.preferenceDescription}>
                  Receive reminders inside the app
                </p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notificationPreferences.inApp}
                  onChange={() => handleNotificationToggle("inApp")}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            {/* <div className={styles.preferenceItem}>
              <div className={styles.preferenceInfo}>
                <h4 className={styles.preferenceTitle}>Email notifications</h4>
                <p className={styles.preferenceDescription}>
                  Receive follow-up reminders via email
                </p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notificationPreferences.email}
                  onChange={() => handleNotificationToggle("email")}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div> */}
          </div>

          {/* Account Info */}
          <div className={styles.accountCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Account</h3>
              <p className={styles.cardSubtitle}>Security & session</p>
            </div>

            <div className={styles.accountInfo}>
              <div className={styles.accountItem}>
                <span className={styles.accountLabel}>Last login</span>
                <span className={styles.accountValue}>
                  {userData.account.lastLogin}
                </span>
              </div>
              <div className={styles.accountItem}>
                <span className={styles.accountLabel}>Device</span>
                <span className={styles.accountValue}>
                  {userData.account.device}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
