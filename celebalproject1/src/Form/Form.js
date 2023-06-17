import React, { useState } from "react";
import User from "../user/User";
import "./Form.css";

// const bloodGroups = ["A+", "B+", "A-", "B-", "AB+", "AB-"];
const bloodGroups = ["A+", "B+", "A-", "B-", "AB+", "AB-"];

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        dob: "",
        mobile: "",
        address: "",
        bloodGroup: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Form is valid
            // Store form data and set submitted flag to true

            setSubmitted(true);
        } else {
            // Form is invalid
            setFormErrors(errors);
        }
    };

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (!formData.firstName.trim()) {
            errors.firstName = "First Name is required";
        }

        if (!formData.lastName.trim()) {
            errors.lastName = "Last Name is required";
        }

        if (formData.email.trim() && !emailRegex.test(formData.email)) {
            errors.email = "Invalid Email id";
        }

        if (formData.mobile.trim() && !mobileRegex.test(formData.mobile)) {
            errors.mobile = "Invalid Mobile Number";
        }

        if (!formData.address.trim()) {
            errors.address = "Address is required";
        }

        return errors;
    };

    return (
        <div className="form-container">
            {!submitted ? (
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name*:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {formErrors.firstName && (
                                <span className="error-message">{formErrors.firstName}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Middle Name:</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name*:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            {formErrors.lastName && (
                                <span className="error-message">{formErrors.lastName}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email*:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {formErrors.email && (
                                <span className="error-message">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Date Of Birth*:</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">
                            <label>Mobile No*:</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                required
                            />
                            {formErrors.mobile && (
                                <span className="error-message">{formErrors.mobile}</span>
                            )}
                        </div>



                        <div className="form-group">
                            <label>Blood Group*:</label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Blood Group</option>
                                {bloodGroups.map((group) => (
                                    <option value={group} key={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            // required
                            />
                            {formErrors.address && (
                                <span className="error-message">{formErrors.address}</span>
                            )}
                        </div>

                        <div className="form-group form-button">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            ) : (
                <User submittedData={formData} />
            )}
        </div>
    );
};

export default Form;
