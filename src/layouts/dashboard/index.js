import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link } from "react-router-dom";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const myStyle = {
    backgroundColor: "#0B2F8A",
    boxShadow: "0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
    borderRadius: "16px",
    cursor: "pointer",
    color: "white",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={4} mb={30}>
        <SoftTypography
          textAlign="center"
          mb={6}
          style={{
            color: "#0B2F8A",
            fontWeight: "700",
            fontSize: "22px",
            lineHeight: "30px",
            letterSpacing: 1,
          }}
        >
          Start your Inventory Management Journey
        </SoftTypography>
        <SoftBox mb={3} mt={10}>
          <Grid container spacing={12}>
            <Grid
              item
              xs={12}
              sm={6}
              xl={4}
              component={Link}
              to="/production-order"
            >
              <SoftBox style={myStyle} textAlign="center" pt={5} pb={5}>
                <SoftTypography style={{ color: "white", letterSpacing: 1 }}>
                  Production Order List
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              xl={4}
              component={Link}
              to="/goods-receipt"
            >
              <SoftBox style={myStyle} textAlign="center" pt={5} pb={5}>
                <SoftTypography style={{ color: "white", letterSpacing: 1 }}>
                  Goods Receipt Note
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              xl={4}
              component={Link}
              to="/inventory-transfer-request"
            >
              <SoftBox style={myStyle} textAlign="center" pt={5} pb={5}>
                <SoftTypography style={{ color: "white", letterSpacing: 1 }}>
                  Inventory Transfer Request
                </SoftTypography>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={6} mt={10}>
          <Grid container spacing={12}>
            <Grid
              item
              xs={12}
              sm={6}
              xl={4}
              component={Link}
              to="/inventory-transfer-approval"
            >
              <SoftBox style={myStyle} textAlign="center" pt={5} pb={5}>
                <SoftTypography style={{ color: "white", letterSpacing: 1 }}>
                  Inventory Transfer Approval List
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              xl={4}
              component={Link}
              to="/inventory-transfer-request-list"
            >
              <SoftBox style={myStyle} textAlign="center" pt={5} pb={5}>
                <SoftTypography style={{ color: "white", letterSpacing: 1 }}>
                  Inventory Transfer Request List
                </SoftTypography>
              </SoftBox>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              xl={4}
              component={Link}
              to="/inventory-transfer"
            >
              <SoftBox style={myStyle} textAlign="center" pt={5} pb={5}>
                <SoftTypography style={{ color: "white", letterSpacing: 1 }}>
                  ITR Reports
                </SoftTypography>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
