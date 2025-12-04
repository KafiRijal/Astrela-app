import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.css";
import { FiUpload, FiX } from "react-icons/fi";

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    photo: null,
    photoPreview: null,
    name: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "File size must be less than 2MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result,
        }));
        setErrors((prev) => ({ ...prev, photo: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
      photoPreview: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    navigate("/dashboard/users");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("User Created Successfully!");
      navigate("/dashboard/users");
    }
  };

  return (
    <div className={styles.createUser}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          {/* Photo Upload */}
          <div className={styles.formGroupFull}>
            <label className={styles.label}>Photo</label>
            <div className={styles.photoUploadWrapper}>
              {formData.photoPreview ? (
                <div className={styles.photoPreviewContainer}>
                  <img
                    src={formData.photoPreview}
                    alt="Preview"
                    className={styles.photoPreview}
                  />
                  <button
                    type="button"
                    className={styles.removePhotoBtn}
                    onClick={handleRemovePhoto}
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <label className={styles.photoUploadLabel}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className={styles.photoInput}
                  />
                  <FiUpload className={styles.uploadIcon} />
                  <span className={styles.uploadText}>Upload Photo</span>
                  <span className={styles.uploadHint}>
                    Max size: 2MB (JPG, PNG)
                  </span>
                </label>
              )}
            </div>
            {errors.photo && (
              <span className={styles.error}>{errors.photo}</span>
            )}
          </div>

          {/* Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Name *</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          {/* Role */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Role *</label>
            <select
              name="role"
              className={styles.select}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.role && <span className={styles.error}>{errors.role}</span>}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Password *</label>
            <input
              type="password"
              name="password"
              className={styles.input}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              className={styles.input}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
