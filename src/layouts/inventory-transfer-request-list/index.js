import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link } from "react-router-dom";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import "../modal.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import SoftAlert from "components/SoftAlert";

function ProductionOrderList() {
  const text = {
    color: "#0B2F8A",
    fontSize: "15px",
    fontWeight: "500",
    marginRight: "10px",
  };

  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fromDateOne, setFromDateOne] = useState("");
  const [toDateTwo, setToDateTwo] = useState("");

  const [fromDateOneError, setFromDateOneError] = useState(false);
  const [toDateTwoError, setToDateTwoError] = useState(false);

  const [status, setStatus] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [series, setSeries] = useState("");
  const [docNum, setDocNum] = useState("");

  const columns = [
    //{ field: "id", headerName: "UID", width: 100 },
    { field: "docNum", headerName: "PRD ORDER NO", width: 130 },
    // { field: "status", headerName: "STATUS", width: 130 },
    { field: "postDate", headerName: "ORDER DATE", width: 120 },

    {
      field: "itemCode",
      headerName: "PRODUCTION ITEM CODE",
      width: 210,
    },
    {
      field: "itemName",
      headerName: "PRODUCTION ITEM NAME",
      width: 300,
    },
    {
      field: "plannedQty",
      headerName: "PLANNED QUANTITY",
      width: 200,
    },
    // {
    //   field: "objectType",
    //   headerName: "OBJECT TYPE",
    //   width: 150,
    // },
    {
      field: "cardCode",
      headerName: "CARD CODE",
      width: 150,
    },
    { field: "warehouse", headerName: "FROM WAREHOUSE", width: 120 },
    {
      field: "toWarehouse",
      headerName: "ENTER TOWAREHOUSE",
      width: 150,
      editable: true,
    },
    {
      field: "docDate",
      headerName: "DOC DATE",
      width: 150,
      type: "date",
      editable: true,
    },
    {
      field: "dueDate",
      headerName: "DUE DATE",
      width: 150,
      type: "date",
      editable: true,
    },
    {
      field: "comments",
      headerName: "ADD YOUR COMMENTS",
      width: 150,
      editable: true,
    },
  ];
  const initialList = [
    {
      id: 1,

      docEntry: 0,
      docNum: 0,
      postDate: "",
      warehouse: "",
      itemCode: "",
      itemName: "Please Enter Document Date",
      plannedQty: "",
      objectType: "",
    },
    {
      id: 2,

      docEntry: 0,
      docNum: 0,
      postDate: "",
      warehouse: "",
      itemCode: "",
      itemName: "",
      plannedQty: "",
      objectType: "",
    },
    {
      id: 3,

      docEntry: 0,
      docNum: 0,
      postDate: "",
      warehouse: "",
      itemCode: "",
      itemName: "",
      plannedQty: "",
      objectType: "",
    },
    {
      id: 4,

      docEntry: 0,
      docNum: 0,
      postDate: "",
      warehouse: "",
      itemCode: "",
      itemName: "",
      plannedQty: "",
      objectType: "",
    },
  ];

  const handleAddITR = () => {
    const updatedData = list.filter((row) => !selectedRows.includes(row));
    setList(updatedData);
    //e.preventDefault();
    console.log("Check box Selection table", updatedData);
    console.log("Check box Selection table", list[0].cardCode);
    console.log("Check box Selection table", list);

    const SelectedDataServer = {
      list,
    };
    axios
      .post("http://localhost:9003/api/ITRDrafts", SelectedDataServer)
      .then(function (response) {
        const newData1 = response.data;
        alert("Added your ITR");
        console.log("Result", newData1);
        // const newList = newData;
        //setList(newList);
        // console.log("setlist", newData);
      })
      .catch(function (error) {
        console.log("Inside Catch ADD ITR Block", error);
      });
  };
  // useLayoutEffect(() => {
  //   applyProdFilter();
  // }, []);

  const handleApplyProdFilter = (e) => {
    console.log("from date", fromDateOne);
    console.log("to date", toDateTwo);
    console.log("status", status);
    console.log("warehouse", warehouse);
    console.log("series", series);
    console.log("docNum", docNum);

    e.preventDefault();

    setFromDateOneError(false);
    setToDateTwoError(false);

    //code for Error Field
    if (fromDateOne == "") {
      setFromDateOneError(true);
      //alert("Please Enter From Document Date & To Document Date, Both Fields are Mandatory");
      // <SoftAlert>
      //   Please Enter From Document Date & To Document Date, Both Fields are Mandatory
      // </SoftAlert>;
    }
    if (toDateTwo == "") {
      setToDateTwoError(true);
      // <SoftAlert color="dark" dismissible>
      //   Please Enter From Document Date & To Document Date, Both Fields are Mandatory
      // </SoftAlert>;
      //alert("From Document Date is Empty");
    }

    // if (fromDateOne === "" || toDateTwo === "") {
    //   alert("Please Enter From Document Date & To Document Date");
    // }

    const postData = {
      fromDateOne,
      toDateTwo,
      status,
      warehouse,
      series,
      docNum,
    };

    axios
      .post("http://localhost:9003/api/ProductionOrderFilters", postData)
      .then(function (response) {
        const newData = response.data.body;

        console.log("response.data : ", response.data);
        console.log("Initial List : ", initialList);
        console.log("response.data.body : ", response.data.body);

        console.log("response.data.body[0] : ", response.data.body[0]);

        const newList = newData;
        setList(newList);
        console.log("setlist", newList);

        //console.log("first API list destructure array", data.body[0]); //showing the data
        // console.log("docEntry", data[0].warehouse); //showing the data
        // console.log("docEntry", data[1].docEntry); //showing the data
        // console.log("docEntry", data[2].docEntry); //showing the data
        // console.log("docEntry", data[3].docEntry); //showing the data

        //const arrayItem = [newdata[0]];

        // console.log("Square Bracket", [arrayItem]);

        // console.log("Curly Bracket", { arrayItem });
        // console.log("Curly, Square Brackets", [{ arrayItem }]);
        // console.log("initialList", initialList);
        // console.log("dataAPIList", data);

        //setList(newList);
      })
      .catch(function (error) {
        console.log("Inside Catch Block", error);
      });
  };
  // useLayoutEffect(() => {
  //   applyProdFilter();
  // }, []);

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
      <SoftBox py={3} mb={15} textAlign="center">
        <SoftTypography
          mb={4}
          mt={1}
          style={{
            color: "#0B2F8A",
            fontWeight: "700",
            fontSize: "27px",
            lineHeight: "30px",
          }}
        >
          INVENTORY TRANSFER REQUEST LIST
        </SoftTypography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} xl={4}></Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <Card>
              <SoftBox mb={4} textAlign="left">
                <SoftBox mt={3} ml={2} pt={1} pb={1} px={1}>
                  <SoftTypography
                    ml={4.5}
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                    // style={{
                    //   color: "#0B2F8A",
                    // }}
                  >
                    FROM DOCUMENT DATE
                  </SoftTypography>
                  <SoftBox pb={3} px={4}>
                    <SoftInput
                      type="date"
                      value={fromDateOne}
                      onChange={(e) => setFromDateOne(e.target.value)}
                      error={fromDateOneError}
                      icon={{
                        component: "error",
                        color: "#FF0000",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>

                <SoftBox ml={2} mt={-2} pb={3} px={1}>
                  <SoftTypography
                    ml={4.5}
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                    // style={{
                    //   color: "#0B2F8A",
                    // }}
                  >
                    TO DOCUMENT DATE
                  </SoftTypography>
                  <SoftBox pb={3} px={4}>
                    <SoftInput
                      type="date"
                      value={toDateTwo}
                      onChange={(e) => setToDateTwo(e.target.value)}
                      error={toDateTwoError}
                      icon={{
                        component: "error",
                        color: "#FF0000",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>

                <SoftBox ml={2} mt={-4} pb={3} px={1}>
                  <SoftTypography ml={4.5} component="label" variant="caption" fontWeight="bold">
                    ENTER ORDER STATUS
                  </SoftTypography>
                  <SoftBox pb={3} px={4}>
                    <SoftInput
                      type="text"
                      placeholder="Enter Order Status..."
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      icon={{
                        component: "false",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>

                <SoftBox ml={2} mt={-4} pb={3} px={1}>
                  <SoftTypography ml={4.5} component="label" variant="caption" fontWeight="bold">
                    DOCUMENT NUMBER
                  </SoftTypography>
                  <SoftBox pb={3} px={4}>
                    <SoftInput
                      type="number"
                      placeholder="Document Number"
                      value={docNum}
                      onChange={(e) => setDocNum(e.target.value)}
                      icon={{
                        component: "false",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>

                <SoftBox ml={2} mt={-4} pb={3} px={5}>
                  <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                    SELECT WAREHOUSE
                  </SoftTypography>
                  <SoftBox pt={1} pb={3} px={4} component={Link} to="/warehouse-filter">
                    <SoftInput
                      type="text"
                      placeholder="Enter Warehouse..."
                      value={warehouse}
                      onChange={(e) => setWarehouse(e.target.value)}
                      icon={{
                        component: "search",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>
                <SoftBox ml={2} mt={-4} pb={-2} px={5}>
                  <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                    SELECT SERIES
                  </SoftTypography>
                  <SoftBox pt={1} pb={2} px={4} component={Link} to="/series-filter">
                    <SoftInput
                      value={series}
                      onChange={(e) => setSeries(e.target.value)}
                      placeholder="Enter Series..."
                      icon={{
                        component: "search",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} xl={4}></Grid>
        </Grid>

        <SoftBox container spacing={1} mt={4}>
          <SoftButton
            onClick={handleApplyProdFilter}
            variant="contained"
            color="info"
            style={{
              backgroundColor: "#0B2F8A",
              boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
            }}
          >
            Apply Filter
          </SoftButton>
        </SoftBox>
        <SoftBox mt={6}>
          <SoftTypography
            style={{ color: "#0B2F8A", fontWeight: "700", fontSize: "20px", lineHeight: "30px" }}
          >
            YOUR INVENTORY TRANSFER REQUEST LIST
          </SoftTypography>
        </SoftBox>
        <SoftBox ml={5} mt={5} style={{ marginRight: "50px", height: "400px" }}>
          <DataGrid
            //{...list}
            experimentalFeatures={{ newEditingApi: true }}
            columns={columns}
            rows={list} // shows Correct Output
            editMode="row"
            disableColumnSelector
            //loading={!list.length}
            checkboxSelection={list}
            onSelectChange={(list) => setSelectedRows(list)}
            options={{ selection: true }}
            //rows={list} // shows Correct Output
            //rows={initialList}// shows initial List
            //rows={{ ...list }} // it is loading
            //rows={{ ...list }} //output- norows
            getRowId={(row) => row.id} //mandatory
            //editMode="row"
            //columns={[{ field: "name", editable: true }]}
            //rowReordering
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{ color: "darkblue" }}
            // components={{
            //   LoadingOverlay: applyProdFilter,
            // }}
            // getRowId={applyProdFilter()}
          />
        </SoftBox>
        <SoftBox style={{ display: "flex" }} mt={4}>
          <SoftBox>
            <SoftButton
              onClick={handleAddITR}
              //onClick={() => setCheckboxSelection(!checkboxSelection)}
              variant="contained"
              color="info"
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                marginLeft: "100px",
              }}
            >
              Add ITR
            </SoftButton>
            <SoftButton
              component={Link}
              to="/dashboard"
              variant="contained"
              color="info"
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                marginLeft: "30px",
              }}
            >
              Cancel ITR
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

export default ProductionOrderList;
