import React, { useState } from "react";
import styles from "./SignInCard.module.css";

export default function SignInCard({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onSignIn) onSignIn({ email, password });
    else {
      // fallback: simple debugging behaviour
      console.log("SignIn:", { email, password });
    }
  }

  return (
    <aside className={styles.cardWrap}>
      <form className={styles.card} onSubmit={handleSubmit} aria-label="Sign in">
        <div className={styles.header}>
          <h2 className={styles.title}>Sign in to your account</h2>
          <p className={styles.subtitle}>Enter your email and password</p>
        </div>

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
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

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
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.signinBtn} type="submit">
            Sig In
          </button>
        </div>

        <div className={styles.note}>
          <p>No self-registration — contact admin to request access.</p>
        </div>
      </form>
    </aside>
  );
}
