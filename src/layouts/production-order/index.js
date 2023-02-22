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
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import axios from "axios";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import "devextreme/dist/css/dx.light.css";
import {
  Form,
  SimpleItem,
  Label,
  GroupItem,
  ColCountByScreen,
  EmptyItem,
} from "devextreme-react/form";
import { CheckBox } from "devextreme-react/check-box";
import DateBox from "devextreme-react/date-box";
import SelectBox from "devextreme-react/select-box";
import TextBox from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import Validator, {
  RequiredRule,
  NumericRule,
  StringLengthRule,
  RangeRule,
} from "devextreme-react/validator";
import ValidationGroup from "devextreme-react/validation-group";
import { Popup } from "devextreme-react/popup";
import { DropDownBox } from "devextreme-react/drop-down-box";
import DataGrid, {
  Column,
  MasterDetail,
  Selection,
  Paging,
  FilterRow,
  Scrolling,
  Pager,
  SearchPanel,
  HeaderFilter,
  Editing,
  Grouping,
  Lookup,
  Sorting,
} from "devextreme-react/data-grid";
import notify from "devextreme/ui/notify";
import "devextreme-react/text-area";
import { Item } from "devextreme-react/form";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import TextArea from "devextreme-react/text-area";
import { initialList1 } from "./PrdOrderJson.js";
import { initialList2 } from "./PrdOrderJson.js";
const orderStatus = ["Planned", "Released"];
const gridColumnsWhs = ["whsCode", "whsName"];
const gridColumnsSeries = ["series", "seriesName"];

//const items = ["toWarehouse", "docDate", "dueDate", "comments"];
const items = [
  "docNum",
  "itemCode",
  "postDate",
  "itemName",
  "warehouse",
  "plannedQty",
];
const ProductionOrderList = () => {
  const [masterData, setMasterData] = useState([]);
  const [masterData1, setMasterData1] = useState([]);
  const [seriesid, setSeriesid] = useState("");
  const [seriesAPIList, setSeriesAPIList] = useState([]);
  const [whsid, setWhsid] = useState(""); //from warehouse
  const [whsAPIList, setwhsAPIList] = useState([]); //from warehouse
  const [whsid1, setWhsid1] = useState(""); //to warehouse
  const [whsAPIList1, setwhsAPIList1] = useState([]); //to warehouse
  const [headerList, setHeaderList] = useState([]);
  const [headerList1, setHeaderList1] = useState([]);
  const [headerDocEntry, setHeaderDocEntry] = useState([]);
  const [masterDocEntry, setMasterDocEntry] = useState([]);
  const [fromDateOne, setFromDateOne] = useState("");
  const [toDateTwo, setToDateTwo] = useState("");
  const [status, setStatus] = useState("");
  const [docNum, setDocNum] = useState("");
  //const [pageLoader, setPageLoader] = useState(false);
  const [docDate1, setDocDate1] = useState("");
  const [dueDate1, setDueDate1] = useState("");
  const [comments1, setComments1] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [docEntry, setDocEntry] = useState("");
  const [objectType, setObjectType] = useState("");
  const [event1, setEvent1] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9003/api/getSeries")
      .then(function (response) {
        const seriesDataAPI = response.data.body;
        const NewSeriesDataAPIList = seriesDataAPI;
        setSeriesAPIList(NewSeriesDataAPIList);
        //console.log("Series API Result", NewSeriesDataAPIList);
      })
      .catch(function (error) {
        console.log("Series API Error", error);
        //alert("Server Error in Series API. Please try again after Sometime.");
        notify(
          {
            message:
              "Server Error in Series API. Please try again after Sometime....",
            width: 500,
            shading: true,
            position: "center",
            direction: "up-stack",
          },
          "error",
          4000
        );
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:9003/api/getWarehouse")
      .then(function (response) {
        const whsDataAPI = response.data.body;
        const NewwhsDataAPIList = whsDataAPI;
        setwhsAPIList(NewwhsDataAPIList);
        //console.log("Whs API Result", NewwhsDataAPIList);
      })
      .catch(function (error) {
        console.log("Inside Catch Block WHS", error);
        // alert(
        //   "Server Error in Warehouse API. Please try again after Sometime."
        // );
        notify(
          {
            message:
              "Server Error in Warehouse API. Please try again after Sometime....",
            width: 550,
            shading: true,
            position: "center",
            direction: "up-stack",
          },
          "error",
          1000
        );
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:9003/api/getWarehouse")
      .then(function (response) {
        const whsDataAPI1 = response.data.body;
        const NewwhsDataAPIList1 = whsDataAPI1;
        setwhsAPIList1(NewwhsDataAPIList1);
        //console.log("Whs API Result", NewwhsDataAPIList);
      })
      .catch(function (error) {
        console.log("Inside Catch Block WHS", error);
        // alert(
        //   "Server Error in Warehouse API. Please try again after Sometime."
        // );
        notify(
          {
            message:
              "Server Error in To Warehouse API. Please try again after Sometime....",
            width: 550,
            shading: true,
            position: "center",
            direction: "up-stack",
          },
          "error",
          1000
        );
      });
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:9003/api/ProductionOrderFilters")
      .then(function (response) {
        const newData1 = response.data.body;
        const newData2 = newData1;
        setHeaderList1(newData2);
        //console.log("Whs API Result", NewwhsDataAPIList);
      })
      .catch(function (error) {
        console.log("Inside Catch Block PRD Filter", error);
        // alert(
        //   "Server Error in Warehouse API. Please try again after Sometime."
        // );
      });
  }, []);

  const handleProductionOrderFilter = (e) => {
    //validate();
    // console.log("from date", fromDateOne);
    // console.log("to date", toDateTwo);
    // // console.log("status", OSid);
    // // console.log("warehouse", whsid);
    // // console.log("series", seriesid);
    // console.log("docNum", docNum);

    e.preventDefault();

    // const status = OSid;
    // const warehouse = whsid;
    // const series = seriesid;

    if (
      fromDateOne === "" &&
      toDateTwo === "" &&
      status === "" &&
      docNum === "" &&
      seriesid === "" &&
      whsid === ""
    ) {
      notify(
        {
          message: "Please fill atleast one Field....",
          width: 300,
          // shading: true,
          // position: "center",
        },
        "error",
        500
      );
    } else {
      const postData = {
        // fromDateOne,
        // toDateTwo,
        // status,
        // warehouse,
        // series,
        // docNum,
      };
      axios
        .post("http://localhost:9003/api/ProductionOrderFilters")
        // .get("http://localhost:9003/api/ProductionOrderFilters")
        .then(function (response) {
          notify(
            {
              message: "Please wait.... Loading your Production Order",
              width: 400,
              shading: true,
              position: "center",
            },
            "success",
            1000
          );
          const newData = response.data.body;

          const newList = newData;
          //setHeaderList(newList); // Dynamic API
          setHeaderList(initialList1); // Static API

          //new function 1
          const LineDetail = newList.map((masterDataObject) => {
            return masterDataObject.poLines;
          });
          setMasterData(LineDetail);
          //console.log("LineDetail", LineDetail); //iterate this id

          //new Function 2
          const MasterDataNew1 = masterData.map((masterDataObject1) => {
            if (masterData[masterDataObject1.id] === headerList.id) {
              const updatedMasterDataObject1 = {
                // gridMasterDataSourcee: masterData[masterDataObject1.id],
              };

              return updatedMasterDataObject1;
            }

            return masterDataObject1;
          });
          setMasterData1(MasterDataNew1);
        })

        .catch(function (error) {
          console.log("Inside Catch Block", error);
          //alert("Cannot Load API Data. Please Try again after Sometime.");
          notify(
            {
              message:
                "Cannot Load API Data. Please Try again after Sometime....",
              width: 500,
              shading: true,
              position: "center",
            },
            "error",
            1000
          );
        });
    }
  };
  const hireDateEditorOptions = { width: "100%", value: null };

  const state = {
    checkBoxesMode: "always",
  };
  const validateForm = React.useCallback((e) => {
    e.component.validate();
  }, []);
  const validate = useCallback((params) => {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      notify(
        {
          message: "Your ITR is Added Successfully",
          width: 300,
          shading: true,
          position: "center",
        },
        "success",
        1000
      );
    }
  }, []);
  const validationRules = {
    comments: [{ type: "required", message: "Comments are required." }],
    docDate: [{ type: "required", message: "Doc Date is required." }],
    dueDate: [{ type: "required", message: "Due Date is required." }],
    toWarehouse: [{ type: "required", message: "To Warehouse is required." }],
  };
  function addITR() {
    if (
      docDate1 === "" ||
      dueDate1 === "" ||
      whsid1 === "" ||
      comments1 === ""
    ) {
      notify(
        {
          message: "Please Fill all the Fields",
          width: 300,
          shading: true,
          position: "center",
        },
        "error",
        1000
      );
    } else {
      setHeaderList(initialList2);
      notify(
        {
          message: "Your ITR is Added Successfully",
          width: 300,
          shading: true,
          position: "center",
        },
        "success",
        1500
      );
    }
  }

  // function collapseAllMasterRows(e) {
  //   console.log("xyz", e);
  //   e.collapseAll(-1);
  // }
  function selectionChanged(e) {
    console.log("xyz", e.component);
    setEvent1(e.component);
    console.log("e", event1);
  }

  function masterDataDetail(props) {
    // console.log("Props1", props.data.docEntry);
    const min = new Date(docDate1);
    const selectionFilter = ["project", "=", "LINDE"];
    const { checkBoxesMode } = state;

    //   const toggleMasterRow = useCallback((rowKey) => {
    //     if (dataGrid.current.instance.isRowExpanded(rowKey)) {
    //         dataGrid.current.instance.collapseRow(rowKey);
    //     } else {
    //         dataGrid.current.instance.expandRow(rowKey);
    //     }
    // }, []);
    const collapseAllMasterRows =
      ((e) => {
        console.log("xyz", e.component);
        //e.component.validate();
      },
      []);

    return (
      <Card>
        <SoftBox ml={5} mr={2} mb={0} mt={1}>
          <SoftTypography
            mb={2}
            mt={4}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "21px",
              lineHeight: "10px",
              letterSpacing: 1,
            }}
          >
            Order #{`${props.data.docNum}`}
          </SoftTypography>
          <ValidationGroup>
            <Form
              colCount={2}
              //onContentReady={validationRules}
              formData={props.data}
              //labelLocation="left"
            >
              <GroupItem
                caption=""
                //colCount={2}
                //style={{ padding: "20px", backgroundColor: "black" }}
              >
                <TextBox
                  label="Item Code"
                  labelMode="static"
                  readOnly={true}
                  //disabled="true"
                  defaultValue={props.data.itemCode}
                ></TextBox>

                <TextBox
                  label="Item Name"
                  labelMode="static"
                  //disabled="true"
                  readOnly={true}
                  defaultValue={props.data.itemName}
                ></TextBox>
              </GroupItem>

              <GroupItem
                caption=""
                //colCount={2}
                //style={{ padding: "20px", backgroundColor: "black" }}
              >
                <TextBox
                  label="Planned Qty"
                  labelMode="static"
                  //disabled="true"
                  readOnly={true}
                  defaultValue={props.data.plannedQty}
                ></TextBox>

                <DateBox
                  label="Post Date"
                  //disabled="true"
                  readOnly={true}
                  labelMode="static"
                  displayFormat="yyyy-MM-dd"
                  showClearButton={true}
                  defaultValue={props.data.postDate}
                ></DateBox>
              </GroupItem>

              <GroupItem
                caption=""
                //style={{ padding: "20px", backgroundColor: "black" }}
              >
                <TextBox
                  label="From Warehouse"
                  labelMode="static"
                  //disabled="true"
                  readOnly={true}
                  defaultValue={props.data.warehouse}
                ></TextBox>

                <DateBox
                  label="Doc Date"
                  labelMode="floating"
                  displayFormat="yyyy-MM-dd"
                  showClearButton={true}
                  defaultValue={docDate1}
                  valueChangeEvent="change"
                  onValueChanged={(e) => {
                    setDocDate1(e.value);
                    setDueDate1(e.value);
                    console.log(e.value);
                  }}
                >
                  <Validator>
                    <RequiredRule message="DocDate is Required" />
                  </Validator>
                </DateBox>
              </GroupItem>

              <GroupItem
                caption=""
                //style={{ padding: "20px", backgroundColor: "black" }}
              >
                <DropDownBox
                  label="To Warehouse"
                  labelMode="floating"
                  dataSource={whsAPIList1}
                  wordWrapEnabled={true}
                  //showClearButton={true}
                  editorOptions={hireDateEditorOptions}
                  valueExpr="whsCode"
                  displayExpr="whsCode"
                  value={whsid1}
                  // onValueChanged={this.syncDataGridSelection}
                  // onOptionChanged={this.onGridBoxOpened}
                >
                  <DataGrid
                    dataSource={whsAPIList1}
                    columns={gridColumnsWhs}
                    // focusedRowEnabled={true}
                    hoverStateEnabled={true}
                    height="100%"
                    selectedRowKeys={whsid1}
                    onSelectionChanged={(e) => {
                      setWhsid1(e.selectedRowsData[0].whsCode);
                      console.log(e.selectedRowsData[0].whsCode);
                    }}
                  >
                    {" "}
                    <Selection mode="single" />
                    <Scrolling mode="virtual" />
                    <Paging enabled={true} pageSize={10} />
                    <FilterRow visible={true} />
                  </DataGrid>
                </DropDownBox>

                <DateBox
                  label="Due Date"
                  //disabled="true"
                  labelMode="floating"
                  displayFormat="yyyy-MM-dd"
                  showClearButton={true}
                  // defaultValue={dueDate1}
                  value={dueDate1}
                  valueChangeEvent="change"
                  min={min}
                  onValueChanged={(e) => {
                    setDueDate1(e.value);
                    console.log(e.value);
                  }}
                  // value={dueDate1}
                >
                  <Validator>
                    <RequiredRule message="DueDate is Required" />
                  </Validator>
                </DateBox>
              </GroupItem>

              <GroupItem colSpan={2}>
                <TextArea
                  label="Comments"
                  labelMode="static"
                  //colSpan={2}
                  defaultValue={comments1}
                  valueChangeEvent="change"
                  onValueChanged={(e) => {
                    setComments1(e.value);
                    console.log(e.value);
                  }}
                  height={70}
                  editorType="dxTextArea"
                  // editorOptions={notesEditorOptions}
                  // disabled="true"
                  //defaultValue={props.data.plannedQty}
                ></TextArea>
              </GroupItem>
            </Form>
          </ValidationGroup>
          <br />
        </SoftBox>

        <Card>
          <SoftBox ml={5} mr={5} mb={5} mt={0}>
            <DataGrid
              dataSource={props.data.poLines}
              keyExpr="id"
              //ref={props.data.poLines}
              showBorders={true}
              onSelectionChanged={selectionChanged}
              // onContentReady={contentReady}
              //wordWrapEnabled={true}
              allowColumnResizing={true}
              //columnMinWidth={80}
              columnAutoWidth={true}
              defaultSelectionFilter={selectionFilter}

              //columnAutoWidth={true}
              //remoteOperations={true}
            >
              <Selection
                mode="multiple"
                deferred={true}
                //selectAllMode={false}
                showCheckBoxesMode={checkBoxesMode}
              />
              <FilterRow visible={true} />
              <HeaderFilter visible={true} allowSearch={true} />
              <Scrolling
                mode="virtual"
                rowRenderingMode="virtual"
                columnRenderingMode="virtual"
              />
              <Paging enabled={false} />
              <Sorting mode="multiple" />
              <Editing
                mode="cell"
                useIcons={true}
                allowUpdating={true}
                // allowAdding={true}
                allowDeleting={true}
              />

              <Column
                dataField="itemCode"
                caption="Item Code"
                //width={120}
                //dataType="string"
                alignment="center"
              />
              <Column
                dataField="itemName"
                caption="Item Name"
                // width={160}
                dataType="string"
                alignment="center"
              />
              <Column
                dataField="warehouse"
                caption="Warehouse"
                // width={125}
                alignment="center"
              />
              <Column
                dataField="plannedQty"
                caption="Planned Qty"
                //width={130}
                editCellComponent={""}
                dataType="number"
                alignment="center"
              />
              <Column
                dataField="ocrCode"
                caption="OCR Code"
                //width={120}
                alignment="center"
              />
              <Column
                dataField="project"
                caption="Project Code"
                //width={135}
                alignment="center"
              />
              <Column
                dataField="uomCode"
                caption="UOM Code"
                //width={125}
                alignment="center"
              />
            </DataGrid>

            <SoftBox style={{ display: "flex" }} mt={4}>
              <SoftBox>
                <SoftButton
                  onClick={addITR}
                  //onClick={() => setCheckboxSelection(!checkboxSelection)}
                  variant="contained"
                  color="info"
                  style={{
                    backgroundColor: "#0B2F8A",
                    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                    marginLeft: "20px",
                  }}
                >
                  Add ITR
                </SoftButton>
                <SoftButton
                  onClick={(e) => {
                    console.log("e", e);
                    console.log("e1", selectionChanged.e);
                  }}
                  // component={Link}
                  // to="/production-order"
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
          </SoftBox>
        </Card>
      </Card>
    );
  }
  return headerList[0] === undefined ? (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15} textAlign="center">
        <SoftTypography
          mb={1}
          mt={1}
          style={{
            color: "#0B2F8A",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "10px",
            letterSpacing: 1,
          }}
        >
          Production Order List
        </SoftTypography>

        <SoftBox ml={2} mr={2} mb={6} mt={6}>
          <Card>
            <SoftTypography
              mb={0.5}
              mt={4}
              style={{
                color: "grey",
                fontFamily: "Arial",
                fontWeight: "500",
                fontSize: "19px",
                //lineHeight: "5px",
                //letterSpacing: 1,
              }}
            >
              Select the Following Fields
            </SoftTypography>
            <hr
              style={{
                // width: "70%",
                color: "#F5F5F5",
                height: "1%",
                marginLeft: "100px",
                marginRight: "100px",
              }}
            ></hr>
            <SoftBox textAlign="center" mt={3} mb={4} ml={4} mr={4}>
              <ValidationGroup>
                <Form
                  colCount={2}
                  labelMode="floating"
                  labelLocation="left"
                  onContentReady={validateForm}
                  //label="Select the"
                >
                  <GroupItem
                    caption=""
                    //style={{ padding: "20px", backgroundColor: "black" }}
                  >
                    <DateBox
                      label="From Document Date"
                      labelMode="floating"
                      displayFormat="yyyy-MM-dd"
                      showClearButton={true}
                      defaultValue={fromDateOne}
                      valueChangeEvent="change"
                      onValueChanged={(e) => {
                        setFromDateOne(e.value);
                        console.log(e.value);
                      }}
                    ></DateBox>
                    <br />
                    <SelectBox
                      dataSource={orderStatus}
                      label="Order Status"
                      labelMode="floating"
                      defaultValue={status}
                      onValueChanged={(e) => {
                        setStatus(e.value);
                        console.log(e.value);
                      }}
                    />

                    <br />
                    <DropDownBox
                      label="Series"
                      labelMode="floating"
                      //showClearButton={true}
                      deferRendering={false}
                      valueExpr="series"
                      displayExpr="series"
                      dataSource={seriesAPIList}
                      value={seriesid}

                      //onValueChanged={(e) => setSeriesid(e.target.value)}
                      //onOptionChanged={seriesid}
                    >
                      <DataGrid
                        dataSource={seriesAPIList}
                        columns={gridColumnsSeries}
                        wordWrapEnabled={true}
                        // focusedRowEnabled={true}
                        hoverStateEnabled={true}
                        height="100%"
                        selectedRowKeys={seriesid}
                        onSelectionChanged={(e) => {
                          setSeriesid(e.selectedRowsData[0].series);
                          console.log(e.selectedRowsData[0].series);
                        }}
                      >
                        <Selection mode="single" />
                        <Scrolling mode="virtual" />
                        <Paging enabled={true} pageSize={10} />
                        <FilterRow visible={true} />
                      </DataGrid>
                    </DropDownBox>

                    <br />
                  </GroupItem>

                  <GroupItem
                    caption=""
                    //style={{ padding: "20px", backgroundColor: "black" }}
                  >
                    <DateBox
                      label="To Document Date"
                      labelMode="floating"
                      displayFormat="yyyy-MM-dd"
                      showClearButton={true}
                      defaultValue={toDateTwo}
                      valueChangeEvent="change"
                      onValueChanged={(e) => {
                        setToDateTwo(e.value);
                        console.log(e.value);
                      }}
                    ></DateBox>

                    <br />

                    <TextBox
                      label="Document Number"
                      labelMode="floating"
                      defaultValue={docNum}
                      onValueChanged={(e) => {
                        setDocNum(e.value);
                        console.log(e.value);
                      }}
                    >
                      <Validator>
                        <NumericRule message="Enter only Numbers" />
                      </Validator>
                    </TextBox>

                    <br />
                    <DropDownBox
                      label="Warehouse"
                      labelMode="floating"
                      dataSource={whsAPIList}
                      wordWrapEnabled={true}
                      //showClearButton={true}
                      valueExpr="whsCode"
                      displayExpr="whsCode"
                      value={whsid}
                      // onValueChanged={this.syncDataGridSelection}
                      // onOptionChanged={this.onGridBoxOpened}
                    >
                      <DataGrid
                        dataSource={whsAPIList}
                        columns={gridColumnsWhs}
                        // focusedRowEnabled={true}
                        hoverStateEnabled={true}
                        height="100%"
                        selectedRowKeys={whsid}
                        onSelectionChanged={(e) => {
                          setWhsid(e.selectedRowsData[0].whsCode);
                          console.log(e.selectedRowsData[0].whsCode);
                        }}
                      >
                        {" "}
                        <Selection mode="single" />
                        <Scrolling mode="virtual" />
                        <Paging enabled={true} pageSize={10} />
                        <FilterRow visible={true} />
                      </DataGrid>
                    </DropDownBox>
                    <br />
                  </GroupItem>
                </Form>
              </ValidationGroup>
            </SoftBox>
          </Card>
          <SoftBox container spacing={1} mt={5}>
            <SoftButton
              onClick={handleProductionOrderFilter}
              // onClick={mes}
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
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15} textAlign="center">
        <SoftTypography
          mb={1}
          mt={1}
          style={{
            color: "#0B2F8A",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "10px",
            letterSpacing: 1,
          }}
        >
          Production Order List
        </SoftTypography>

        <SoftBox ml={2} mr={2} mb={6} mt={6}>
          <Card>
            <SoftTypography
              mb={0.5}
              mt={4}
              style={{
                color: "grey",
                fontFamily: "Arial",
                fontWeight: "500",
                fontSize: "19px",
                //lineHeight: "5px",
                //letterSpacing: 1,
              }}
            >
              Select the Following Fields
            </SoftTypography>
            <hr
              style={{
                // width: "70%",
                color: "grey",
                height: "20%",
                marginLeft: "100px",
                marginRight: "100px",
              }}
            ></hr>
            <SoftBox textAlign="center" mt={3} mb={4} ml={4} mr={4}>
              <ValidationGroup>
                <Form
                  colCount={2}
                  labelMode="floating"
                  labelLocation="left"
                  //label="Select the"
                >
                  <GroupItem
                    caption=""
                    //style={{ padding: "20px", backgroundColor: "black" }}
                  >
                    <DateBox
                      label="From Document Date"
                      //disabled="true"
                      labelMode="floating"
                      displayFormat="yyyy-MM-dd"
                      showClearButton={true}
                      defaultValue={fromDateOne}
                      valueChangeEvent="change"
                      onValueChanged={(e) => {
                        setFromDateOne(e.value);
                        console.log(e.value);
                      }}
                    ></DateBox>
                    <br />
                    <SelectBox
                      dataSource={orderStatus}
                      label="Order Status"
                      labelMode="floating"
                      defaultValue={status}
                      onValueChanged={(e) => {
                        setStatus(e.value);
                        console.log(e.value);
                      }}
                    />

                    <br />
                    <DropDownBox
                      label="Series"
                      labelMode="floating"
                      //showClearButton={true}
                      deferRendering={false}
                      valueExpr="series"
                      displayExpr="series"
                      dataSource={seriesAPIList}
                      value={seriesid}

                      //onValueChanged={(e) => setSeriesid(e.target.value)}
                      //onOptionChanged={seriesid}
                    >
                      <DataGrid
                        dataSource={seriesAPIList}
                        columns={gridColumnsSeries}
                        wordWrapEnabled={true}
                        // focusedRowEnabled={true}
                        hoverStateEnabled={true}
                        height="100%"
                        selectedRowKeys={seriesid}
                        onSelectionChanged={(e) => {
                          setSeriesid(e.selectedRowsData[0].series);
                          console.log(e.selectedRowsData[0].series);
                        }}
                      >
                        <Selection mode="single" />
                        <Scrolling mode="virtual" />
                        <Paging enabled={true} pageSize={10} />
                        <FilterRow visible={true} />
                      </DataGrid>
                    </DropDownBox>

                    <br />
                  </GroupItem>

                  <GroupItem
                    caption=""
                    //style={{ padding: "20px", backgroundColor: "black" }}
                  >
                    <DateBox
                      label="To Document Date"
                      labelMode="floating"
                      displayFormat="yyyy-MM-dd"
                      showClearButton={true}
                      defaultValue={toDateTwo}
                      valueChangeEvent="change"
                      onValueChanged={(e) => {
                        setToDateTwo(e.value);
                        console.log(e.value);
                      }}
                    ></DateBox>

                    <br />

                    <TextBox
                      label="Document Number"
                      labelMode="floating"
                      defaultValue={docNum}
                      onValueChanged={(e) => {
                        setDocNum(e.value);
                        console.log(e.value);
                      }}
                    >
                      <Validator>
                        <NumericRule message="Enter only Numbers" />
                      </Validator>
                    </TextBox>

                    <br />
                    <DropDownBox
                      label="Warehouse"
                      labelMode="floating"
                      dataSource={whsAPIList}
                      wordWrapEnabled={true}
                      //showClearButton={true}
                      valueExpr="whsCode"
                      displayExpr="whsCode"
                      value={whsid}
                      // onValueChanged={this.syncDataGridSelection}
                      // onOptionChanged={this.onGridBoxOpened}
                    >
                      <DataGrid
                        dataSource={whsAPIList}
                        columns={gridColumnsWhs}
                        // focusedRowEnabled={true}
                        hoverStateEnabled={true}
                        height="100%"
                        selectedRowKeys={whsid}
                        onSelectionChanged={(e) => {
                          setWhsid(e.selectedRowsData[0].whsCode);
                          console.log(e.selectedRowsData[0].whsCode);
                        }}
                      >
                        {" "}
                        <Selection mode="single" />
                        <Scrolling mode="virtual" />
                        <Paging enabled={true} pageSize={10} />
                        <FilterRow visible={true} />
                      </DataGrid>
                    </DropDownBox>
                    <br />
                  </GroupItem>
                </Form>
              </ValidationGroup>
            </SoftBox>
          </Card>
          <SoftBox container spacing={1} mt={5}>
            <SoftButton
              onClick={handleProductionOrderFilter}
              // onClick={validate}
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
        </SoftBox>

        <SoftTypography
          mb={5}
          mt={7}
          ml={3}
          mr={3}
          style={{
            color: "#0B2F8A",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "10px",
            letterSpacing: 1,
          }}
        >
          Your Production Orders
        </SoftTypography>
        <SoftBox ml={1} mr={1} mb={6} mt={6}>
          <Card>
            <SoftBox ml={4} mr={4} mb={4} mt={4}>
              <DataGrid
                dataSource={headerList}
                //dataSource={initialList1}
                keyExpr="id"
                showBorders={true}
                //wordWrapEnabled={true}
                allowColumnResizing={true}
                // columnMinWidth={80}
                columnAutoWidth={true}
              >
                <FilterRow visible={true} />
                <HeaderFilter visible={true} allowSearch={true} />
                <Scrolling
                  mode="virtual"
                  rowRenderingMode="virtual"
                  columnRenderingMode="virtual"
                />
                <Paging enabled={false} />
                <Sorting mode="multiple" />

                <Column
                  dataField="docNum"
                  //width={120}
                  caption="Doc Num"
                  alignment="center"
                />
                <Column
                  dataField="postDate"
                  caption="Post Date"
                  dataType="date"
                  displayFormat="dd-MM-yyyy"
                  //width={120}
                  alignment="center"
                />
                <Column
                  dataField="itemCode"
                  caption="Item Code"
                  //width={150}
                  alignment="center"
                />
                <Column
                  dataField="itemName"
                  caption="Item Name"
                  //width={300}
                  alignment="center"
                />
                <Column
                  dataField="warehouse"
                  caption="Warehouse"
                  //width={130}
                  alignment="center"
                />
                <Column
                  dataField="plannedQty"
                  caption="Planned Qty"
                  //width={130}
                  dataType="number"
                  alignment="center"
                />

                <MasterDetail
                  //dataField="poLines"
                  enabled={true}
                  autoExpandAll={false}
                  caption="id"
                  render={masterDataDetail}
                  //render={initialList1}
                />
              </DataGrid>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ProductionOrderList;
