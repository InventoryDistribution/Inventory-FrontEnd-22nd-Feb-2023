import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link } from "react-router-dom";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "../modal.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function WarehouseFilterList() {
  const text = {
    color: "#0B2F8A",
    fontSize: "15px",
    fontWeight: "500",
    marginRight: "10px",
  };

  const columns = [
    { field: "id", headerName: "WAREHOUSE CODE", width: 200 },
    { field: "docNum", headerName: "WAREHOUSE NAME", width: 200 },
  ];
  const rows = [
    { id: "CNS01", docNum: "General Warehouse" },
    { id: "ALP01 ", docNum: "Aluminum and Pipes" },
    { id: "BFG01", docNum: "Black FG" },
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

  useEffect(() => {
    axios
      .get("http://localhost:9003/api/getWarehouse")
      .then(function (response) {
        const warehouseData = response.data.body;
        console.log("Inside then Block", warehouseData);
      })
      .catch(function (error) {
        console.log("Inside Catch Block", error);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15} textAlign="center">
        <SoftBox mt={6}>
          <SoftTypography
            style={{ color: "#0B2F8A", fontWeight: "700", fontSize: "25px", lineHeight: "30px" }}
          >
            Warehouse Filter List
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={5} style={text}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            sx={{ color: "darkblue" }}
            style={{ height: "300px", width: "500px", margin: "auto" }}
          />
        </SoftBox>
        <SoftBox mt={6}>
          <SoftBox>
            <SoftButton
              // onClick={toggleModal}
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
}

export default WarehouseFilterList;
