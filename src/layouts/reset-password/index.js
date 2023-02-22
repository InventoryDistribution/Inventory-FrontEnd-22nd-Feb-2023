// import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
// import { Form } from "react-bootstrap";
import "../modal.css";
import { useState } from "react";
// import user1 from "assets/images/curved-images/user.png"
// import { auth } from 'layouts/authentication/firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// import { async } from "@firebase/util";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard"
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  // const [fromDateOneError, setFromDateOneError] = useState(false);

  // setFromDateOneError(false);

  // if (email === "") {
  //   setFromDateOneError(true);
  // }
  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3} mb={35}>
        <SoftBox mb={4}>
          <SoftTypography
            textAlign="center"
            mt={4}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "30px",
              lineHeight: "30px",
            }}
          >
            Reset Your Password
          </SoftTypography>
        </SoftBox>

        <SoftBox component="form" role="form">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}></Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <Card>
                <SoftBox mb={4}>
                  <SoftBox mt={4}>
                    <SoftTypography
                      ml={4.5}
                      mb={1}
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Email Address
                    </SoftTypography>
                    <SoftBox pb={3} px={4}>
                      <SoftInput
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        //   error={fromDateOneError}
                        // icon={{
                        //   component: "error",
                        //   color: "#FF0000",
                        //   direction: "right",
                        // }}
                      />
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} xl={4}></Grid>
          </Grid>
        </SoftBox>

        <SoftBox mt={6}>
          <SoftTypography textAlign="center">
            <SoftButton
              variant="contained"
              color="info"
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
              }}
              onClick={triggerResetEmail}
            >
              Send Password Reset Link
            </SoftButton>
          </SoftTypography>
        </SoftBox>

        <SoftBox
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h4 style={{ color: "#0B2F8A", marginTop: "20px" }}>
                  Please Fill all the Required Fields
                </h4>
                <button
                  className="close-modal"
                  onClick={toggleModal}
                  style={{
                    backgroundColor: "#0B2F8A",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "50px",
                    marginBottom: "20px",
                    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ResetPassword;
