import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Link } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "../modal.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
//import { useDemoData } from "@mui/x-data-grid-generator";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const SeriesFilterList = () => {
  const seriesColumns = [
    { field: "id", headerName: "SERIES CODE", width: 200 },
    { field: "docNum", headerName: "SERIES NAME", width: 200 },
  ];
  const seriesRows = [
    { id: "19", docNum: "G2021-22" },
    { id: "122", docNum: "R2021-22" },
    { id: "123", docNum: "C2021-22" },
  ];

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [seriesid, setSeriesid] = useState([]);

  const onRowsSeriesHandler = (ids) => {
    console.log(ids[0]);
    setSeriesid(ids);
    console.log(seriesid);
    console.log(seriesid);
  };

  useEffect(() => {
    axios
      .get("http://localhost:9003/api/getSeries")
      .then(function (response) {
        const seriesData = response.data.body;
        console.log("Series API List", seriesData);
      })
      .catch(function (error) {
        console.log("Series API Error", error);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15} textAlign="center">
        <SoftBox mt={6} mb={4}>
          <SoftTypography
            style={{ color: "#0B2F8A", fontWeight: "700", fontSize: "25px", lineHeight: "30px" }}
          >
            Series Filter List
          </SoftTypography>
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={4}></Grid>

          <Grid item xs={12} sm={6} xl={4}>
            <Card>
              <SoftBox mt={5} mb={5.5} px={5}>
                <DataGrid
                  rows={seriesRows}
                  columns={seriesColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection={false}
                  disableMultipleSelection
                  onSelectionModelChange={(ids) => {
                    onRowsSeriesHandler(ids);
                  }}
                  sx={{ color: "#0B2F8A" }}
                  style={{ height: "300px", width: "500px", margin: "auto" }}
                />
              </SoftBox>
            </Card>
          </Grid>
        </Grid>

        <SoftBox mt={6}>
          <SoftBox>
            <SoftButton
              //onClick={onRowsSeriesHandler}
              component={Link}
              to="/production-order"
              variant="contained"
              color="info"
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
              }}
            >
              Continue with Selected Category
            </SoftButton>
          </SoftBox>
        </SoftBox>

        <SoftBox style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
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
};

export default SeriesFilterList;
