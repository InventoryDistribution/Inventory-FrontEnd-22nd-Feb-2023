import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import PhoneInput from "react-phone-number-input";
import { Form, Alert, Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { useUserAuth } from "../../context/user-auth";
import "react-phone-number-input/style.css";

function SignIn() {
  const button = {
    width: "400px",
    height: "40px",
    textAlign: "center",
    fontWeight: 600,
    border: "none",
    borderRadius: "16px",
    background: "#0B2F8A",
    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
    color: "white",
  };
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined) {
      return alert("Please enter a valid Phone Number...");
    }
    //return setError("Please enter a valid Phone Number...");
    //return alert("Please enter a valid Phone Number...");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      //alert("Too many Phone OTP Requests From Browser Today");
      //setError(err.message);
      console.log(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/dashboard");
    } catch (err) {
      alert("Please Enter Valid OTP");
      // setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <CoverLayout
      title="Welcome Back"
      description="Enter your Phone Number to Sign In"
      image={curved9}
    >
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Phone Number
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="Enter Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </SoftBox>
        <div id="recaptcha-container"></div>

        <SoftBox mt={4} mb={1}>
          <SoftTypography>
            <SoftButton
              onClick={getOtp}
              fullWidth
              style={{
                backgroundColor: "#0B2F8A",
                color: "white",
                boxShadow: "0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                borderRadius: "16px",
              }}
            >
              Send Otp
            </SoftButton>
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Enter OTP
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftTypography>
            <SoftButton
              onClick={verifyOtp}
              fullWidth
              style={{
                backgroundColor: "#0B2F8A",
                color: "white",
                boxShadow: "0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                borderRadius: "16px",
              }}
            >
              Verify Otp
            </SoftButton>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <div className="p-4 box">
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              style={{ color: "#0B2F8A" }}
              fontWeight="bold"
            >
              Register
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography
              component={Link}
              to="/authentication/email-signin"
              variant="button"
              style={{ color: "#0B2F8A" }}
              fontWeight="bold"
            >
              SignIn with Email
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </div>
    </CoverLayout>
  );
}

export default SignIn;
