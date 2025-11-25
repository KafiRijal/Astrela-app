// src/components/Login/SignInCard/SignInCard.jsx
import { useState } from "react";
import styles from "./SignInCard.module.css";

const SignInCard = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSignIn) {
      onSignIn({ email, password });
    } else {
      console.log("Sign in attempted:", { email, password });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <aside className={styles.cardWrap}>
      <form
        className={styles.card}
        onSubmit={handleSubmit}
        aria-label="Sign in"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Sign in to your account</h2>
          <p className={styles.subtitle}>Enter your email and password</p>
        </div>

        {/* Email Field */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            placeholder="xxx@gmail.com"
            value={email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
          />
        </div>

        {/* Password Field */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            placeholder="••••••"
            value={password}
            onChange={handlePasswordChange}
            required
            autoComplete="current-password"
          />
        </div>

        {/* Submit Button */}
        <div className={styles.actions}>
          <button className={styles.signinBtn} type="submit">
            Sign In
          </button>
        </div>

        {/* Note */}
        <div className={styles.note}>
          <p>No self-registration — contact admin to request access.</p>
        </div>
      </form>
    </aside>
  );
};

export default SignInCard;
