// src/components/Dashboard/EditLead/EditLead.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditLead.module.css";

const EditLead = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with API call based on ID
  const mockLeadData = {
    name: "Marsela",
    phoneNumber: "+62 812-4444-0004",
    age: "32",
    job: "management",
    maritalStatus: "married",
    education: "university.degree",
    hasCreditDefault: "no",
    bankBalance: "5000",
    hasHousingLoan: "yes",
    hasPersonalLoan: "no",
    preferredContactType: "cellular",
    lastContactDay: "mon",
    lastContactMonth: "jan",
    callDuration: "300",
    campaignContacts: "5",
    daysSincePreviousContact: "10",
    previousCampaignContacts: "3",
    previousCampaignOutcome: "success",
    employmentVariationRate: "1.4",
    consumerPriceIndex: "93.2",
    consumerConfidenceIndex: "-42.0",
    euribor3Month: "4.857",
    numberEmployed: "5191.0",
    subscription: "yes",
  };

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    job: "",
    maritalStatus: "",
    education: "",
    hasCreditDefault: "",
    bankBalance: "",
    hasHousingLoan: "",
    hasPersonalLoan: "",
    preferredContactType: "",
    lastContactDay: "",
    lastContactMonth: "",
    callDuration: "",
    campaignContacts: "",
    daysSincePreviousContact: "",
    previousCampaignContacts: "",
    previousCampaignOutcome: "",
    employmentVariationRate: "",
    consumerPriceIndex: "",
    consumerConfidenceIndex: "",
    euribor3Month: "",
    numberEmployed: "",
    subscription: "",
  });

  // Load data when component mounts
  useEffect(() => {
    // Simulate API call - replace with actual API call
    setFormData(mockLeadData);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/dashboard/leads");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Form Data:", formData);
    alert("Lead Updated Successfully!");
    navigate("/dashboard/leads");
  };

  return (
    <div className={styles.editLead}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          {/* Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="Leads name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className={styles.input}
              placeholder="Phone number leads"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Age */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Age</label>
            <input
              type="number"
              name="age"
              className={styles.input}
              placeholder="Input age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          {/* Job */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Job</label>
            <select
              name="job"
              className={styles.select}
              value={formData.job}
              onChange={handleChange}
              required
            >
              <option value="">Select job</option>
              <option value="admin">admin</option>
              <option value="blue-collar">blue collar</option>
              <option value="entrepreneur">entrepreneur</option>
              <option value="housemaid">housemaid</option>
              <option value="management">management</option>
              <option value="retired">retired</option>
              <option value="self-employed">self employed</option>
              <option value="services">services</option>
              <option value="student">student</option>
              <option value="technician">technician</option>
              <option value="unemployed">unemployed</option>
              <option value="unknown">unknown</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Marital Status</label>
            <select
              name="maritalStatus"
              className={styles.select}
              value={formData.maritalStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select marital</option>
              <option value="single">single</option>
              <option value="married">married</option>
              <option value="divorced">divorced</option>
            </select>
          </div>

          {/* Education */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Education</label>
            <select
              name="education"
              className={styles.select}
              value={formData.education}
              onChange={handleChange}
              required
            >
              <option value="">Select education</option>
              <option value="basic.4y">basic 4y</option>
              <option value="basic.6y">basic 6y</option>
              <option value="basic.9y">basic 9y</option>
              <option value="high.school">high school</option>
              <option value="illiterate">illiterate</option>
              <option value="professional.course">professional course</option>
              <option value="university.degree">university degree</option>
              <option value="unknown">unknown</option>
            </select>
          </div>

          {/* Has Credit Default */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Has Credit Default</label>
            <select
              name="hasCreditDefault"
              className={styles.select}
              value={formData.hasCreditDefault}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>

          {/* Bank Balance (Euro) */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Bank Balance (Euro)</label>
            <input
              type="text"
              name="bankBalance"
              className={styles.input}
              placeholder="Average yearly balance (Euro)"
              value={formData.bankBalance}
              onChange={handleChange}
              required
            />
          </div>

          {/* Has Housing Loan */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Has Housing Loan</label>
            <select
              name="hasHousingLoan"
              className={styles.select}
              value={formData.hasHousingLoan}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>

          {/* Has Personal Loan */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Has Personal Loan</label>
            <select
              name="hasPersonalLoan"
              className={styles.select}
              value={formData.hasPersonalLoan}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>

          {/* Preferred Contact Type */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Preferred Contact Type</label>
            <select
              name="preferredContactType"
              className={styles.select}
              value={formData.preferredContactType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="cellular">cellular</option>
              <option value="telephone">telephone</option>
            </select>
          </div>

          {/* Last Contact Day */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Contact Day</label>
            <select
              name="lastContactDay"
              className={styles.select}
              value={formData.lastContactDay}
              onChange={handleChange}
              required
            >
              <option value="">Select day</option>
              <option value="mon">Mon</option>
              <option value="tue">Tue</option>
              <option value="wed">Wed</option>
              <option value="thu">Thu</option>
              <option value="fri">Fri</option>
            </select>
          </div>

          {/* Last Contact Month */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Contact Month</label>
            <select
              name="lastContactMonth"
              className={styles.select}
              value={formData.lastContactMonth}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="jan">Jan</option>
              <option value="feb">Feb</option>
              <option value="mar">Mar</option>
              <option value="apr">Apr</option>
              <option value="may">May</option>
              <option value="jun">Jun</option>
              <option value="jul">Jul</option>
              <option value="aug">Aug</option>
              <option value="sep">Sep</option>
              <option value="oct">Oct</option>
              <option value="nov">Nov</option>
              <option value="dec">Dec</option>
            </select>
          </div>

          {/* Call Duration (seconds) */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Call Duration (seconds)</label>
            <input
              type="text"
              name="callDuration"
              className={styles.input}
              placeholder="Number of last call (sec)"
              value={formData.callDuration}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campaign Contacts */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Campaign Contacts</label>
            <input
              type="text"
              name="campaignContacts"
              className={styles.input}
              placeholder="Number of contacts in this campaign"
              value={formData.campaignContacts}
              onChange={handleChange}
              required
            />
          </div>

          {/* Days Since Previous Contact */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Days Since Previous Contact</label>
            <input
              type="text"
              name="daysSincePreviousContact"
              className={styles.input}
              placeholder="(if never contacted)"
              value={formData.daysSincePreviousContact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Previous Campaign Contacts */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Previous Campaign Contacts</label>
            <input
              type="text"
              name="previousCampaignContacts"
              className={styles.input}
              placeholder="Number of previous contacts"
              value={formData.previousCampaignContacts}
              onChange={handleChange}
              required
            />
          </div>

          {/* Previous Campaign Outcome */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Previous Campaign Outcome</label>
            <select
              name="previousCampaignOutcome"
              className={styles.select}
              value={formData.previousCampaignOutcome}
              onChange={handleChange}
              required
            >
              <option value="">Select outcome</option>
              <option value="failure">failure</option>
              <option value="nonexistent">non existent</option>
              <option value="success">success</option>
            </select>
          </div>

          {/* Employment Variation Rate */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Employment Variation Rate</label>
            <input
              type="text"
              name="employmentVariationRate"
              className={styles.input}
              placeholder="Quarterly emp. var. rate"
              value={formData.employmentVariationRate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Consumer Price Index */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Consumer Price Index</label>
            <input
              type="text"
              name="consumerPriceIndex"
              className={styles.input}
              placeholder="Monthly CPI index"
              value={formData.consumerPriceIndex}
              onChange={handleChange}
              required
            />
          </div>

          {/* Consumer Confidence Index */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Consumer Confidence Index</label>
            <input
              type="text"
              name="consumerConfidenceIndex"
              className={styles.input}
              placeholder="Monthly confidence index"
              value={formData.consumerConfidenceIndex}
              onChange={handleChange}
              required
            />
          </div>

          {/* Euribor 3 Month */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Euribor 3 Month</label>
            <input
              type="text"
              name="euribor3Month"
              className={styles.input}
              placeholder="Euribor 3 month rate"
              value={formData.euribor3Month}
              onChange={handleChange}
              required
            />
          </div>

          {/* Number Employed */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Number Employed</label>
            <input
              type="text"
              name="numberEmployed"
              className={styles.input}
              placeholder="Quarterly employed count"
              value={formData.numberEmployed}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subscription (target) */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Subscription (target)</label>
            <select
              name="subscription"
              className={styles.select}
              value={formData.subscription}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
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

export default EditLead;
