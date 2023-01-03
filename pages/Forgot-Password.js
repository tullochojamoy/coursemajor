import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
 
        <>
          <section className="u-align-center u-clearfix u-section-56" id="sec-2e64">
            <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
              <h1 className="u-text u-text-default u-text-1"> Forgot Password</h1>
              <p className="u-text u-text-2"> Please enter the email address you register your account with. We will send you reset password confirmation to this email</p>
              <div className="u-align-center u-form u-form-1">
                <form onSubmit={forgotPasswordHandler} className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="form" style={{padding: "10px;"}}>
                  <div className="u-form-group u-form-name">
                    <label htmlFor="name-c002" className="u-label">Email:</label>
                    <input 
                      type="email" 
                      placeholder="Enter Account's Email" 
                      id="name-c002" 
                      name="name" 
                      className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="u-align-center u-form-group u-form-submit">
                    <button type="submit" className="u-btn u-btn-submit u-button-style u-btn-1">Send Email</button>
                  </div>

                  {success && <div className="u-form-send-message u-form-send-success">{success}</div>}
                  {error && <div className="u-form-send-error u-form-send-message">{error}</div>}
                </form>
              </div>
            </div>
          </section>
        </>   
  );  
}