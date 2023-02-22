import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Help() {
  const p = {
    display: "block",
    fontSize: "16px",
    color: "grey",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15}>
        <Grid container style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <SoftBox mt={3}>
            <SoftTypography
              style={{ fontSize: "25px", color: "#0B2F8A", letterSpacing: 1 }}
            >
              <strong>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              Lorem Ipsum has been the industry standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{ fontSize: "25px", color: "#0B2F8A", letterSpacing: 1 }}
            >
              <strong>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              Lorem Ipsum has been the industry standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{ fontSize: "25px", color: "#0B2F8A", letterSpacing: 1 }}
            >
              <strong>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              Lorem Ipsum has been the industry standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{ fontSize: "25px", color: "#0B2F8A", letterSpacing: 1 }}
            >
              <strong>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              Lorem Ipsum has been the industry standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{ fontSize: "25px", color: "#0B2F8A", letterSpacing: 1 }}
            >
              <strong>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              Lorem Ipsum has been the industry standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </SoftTypography>
          </SoftBox>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Help;
