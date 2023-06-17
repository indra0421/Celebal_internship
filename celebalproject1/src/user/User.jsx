import React from "react";
import { useParams } from "react-router-dom";
import "./User.css";

const User = ({ submittedData }) => {
    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h2 className="welcome-heading">Welcome {submittedData.firstName} !</h2>
                <p className="welcome-message">
                    Thank you for submitting the form. Here are the details you provided:
                </p>
                <div className="submitted-data">
                    <p>
                        <span className="label">Full Name:</span>{" "}
                        {submittedData.firstName} {submittedData.middleName}{" "}
                        {submittedData.lastName}
                    </p>
                    <p>
                        <span className="label">Email:</span> {submittedData.email}
                    </p>
                    <p>
                        <span className="label">Date Of Birth:</span> {submittedData.dob}
                    </p>
                    <p>
                        <span className="label">Mobile No:</span> {submittedData.mobile}
                    </p>
                    <p>
                        <span className="label">Address:</span> {submittedData.address}
                    </p>
                    <p>
                        <span className="label">Blood Group:</span>{" "}
                        {submittedData.bloodGroup === "Others"
                            ? submittedData.otherBloodGroup
                            : submittedData.bloodGroup}
                    </p>
                </div>
            </div>
        </div>
    );
};



export default User;
