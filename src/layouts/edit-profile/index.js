import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link, useParams, useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import { Form } from "react-bootstrap";
import "../modal.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SoftAvatar from "components/SoftAvatar";
import { storage } from "../authentication/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import user1 from "assets/images/curved-images/user.png";
import Card from "@mui/material/Card";
import { auth, db } from "../authentication/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import notify from "devextreme/ui/notify";

// const initialState = {
//   name: "",
//   email: "",
//   phone: "",
//   code: "",
// };

function EditProfile() {
  //const [state, setState] = useState(initialState);
  //const [date, setDate] = useState({});
  //const { name, email, phone, code } = state;
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!name || !email || !phone || !code) {
  //     toast.error("please provide value in each input field");
  //   } else {
  //     fireDb.child("users").push(state, (err) => {
  //       if (err) {
  //         toast.error(err);
  //       } else {
  //         toast.success("Profile Updated Successfully");
  //       }
  //     });
  //     setTimeout(() => navigate("/"), 500);
  //   }
  // };

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  // for picture
  // const handleSubmit1 = () => {
  //   const imageRef = ref(storage, "image");
  //   uploadBytes(imageRef, image)
  //     .then(() => {
  //       getDownloadURL(imageRef)
  //         .then((url) => {
  //           setUrl(url);
  //         })
  //         .catch((error) => {
  //           console.log(error.message, "error getting the image url");
  //         });
  //       setImage(null);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  // my codes:
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userEmployeeCode, setUserEmployeeCode] = useState();
  const [userPhone, setUserPhone] = useState();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmployeeCode, setUpdatedEmployeeCode] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  const fetchUserName = async (id) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", id));
      const doc = await getDocs(q);
      const userDoc = await doc.docs[0].data();
      console.log(userDoc);
      setUser(userDoc);
      setUpdateFlag(false);
      setUserName(userDoc.name);
      setUserEmail(userDoc.email);
      setUserEmployeeCode(userDoc.empcode);
      setUserPhone(userDoc.phone);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setUpdateFlag(true);
    setUpdatedName(user.name);
    setUpdatedPhone(user.phone);
    setUpdatedEmployeeCode(user.empcode);
  };

  const handleUpdate = async (e) => {
    try {
      const data = {
        name: updatedName,
        phone: updatedPhone,
        empcode: updatedEmployeeCode,
      };
      const docId = user.docId;
      const userDoc = doc(db, "users", docId);
      await updateDoc(userDoc, data);
      notify(
        {
          message:
            "Profile updated Successfully...",
          width: 500,
          shading: true,
          position: "center",
          direction: "up-stack",
        },
        "info",
        1000
      );
    } catch (error) {
      notify(
        {
          message:
            error,
          width: 500,
          shading: true,
          position: "center",
          direction: "up-stack",
        },
        "error",
        2000
      );
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      if (currentuser.uid.length > 0) {
        console.log(currentuser);
        setUser(currentuser);
        await fetchUserName(currentuser.uid);
      } else {
        console.log("no such user");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3} mb={15}>
        <SoftBox mb={4}>
          <SoftTypography
            textAlign="center"
            mt={4}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "20px",
            }}
          >
            Edit Your Profile
          </SoftTypography>
        </SoftBox>

        <form>
          {updateFlag === false ? (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} xl={4}></Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Card>
                    {/*
<SoftBox textAlign="center">
  <SoftAvatar src={url} alt="Avatar" variant="circular" size="xl" box-shadow="xxl" />
  <input type="file" onChange={handleImageChange} />
  <button onClick={handleSubmit1}>Submit</button>
</SoftBox>
*/}
                    <SoftBox mb={2}>
                      <SoftBox mt={4}>
                        <SoftTypography
                          ml={4.5}
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Full Name
                        </SoftTypography>
                        <SoftBox pb={1} px={4}>
                          <SoftInput
                            type="text"
                            placeholder="Enter Your Full Name"
                            value={userName}
                          />
                        </SoftBox>
                      </SoftBox>
                      <SoftBox>
                        <SoftTypography
                          ml={4.5}
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Email Address
                        </SoftTypography>
                        <SoftBox pb={1} px={4}>
                          <SoftInput
                            type="text"
                            placeholder="Enter your Email"
                            value={userEmail}
                          />
                        </SoftBox>
                      </SoftBox>
                      <SoftBox>
                        <SoftTypography
                          ml={4.5}
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Employee Code
                        </SoftTypography>
                        <SoftBox pb={1} px={4}>
                          <SoftInput
                            id="code"
                            name="code"
                            value={userEmployeeCode}
                            type="text"
                            placeholder="Enter Employee Code"
                          />
                        </SoftBox>
                      </SoftBox>
                      <SoftBox>
                        <SoftTypography
                          ml={4.5}
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Phone Number
                        </SoftTypography>
                        <SoftBox pb={4} px={4}>
                          <SoftInput
                            id="phone"
                            name="phone"
                            value={userPhone}
                            disabled
                            type="tel"
                            error
                            placeholder="Enter Phone Number"
                          />
                        </SoftBox>
                      </SoftBox>
                    </SoftBox>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}></Grid>
              </Grid>

              <SoftBox mt={6}>
                <SoftTypography textAlign="center">
                  <SoftButton
                    variant="contained"
                    color="info"
                    style={{
                      backgroundColor: "#0B2F8A",
                      boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                    }}
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </SoftButton>
                </SoftTypography>
              </SoftBox>
            </>
          ) : (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} xl={4}></Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Card>
                    {/*
<SoftBox textAlign="center">
  <SoftAvatar src={url} alt="Avatar" variant="circular" size="xl" box-shadow="xxl" />
  <input type="file" onChange={handleImageChange} />
  <button onClick={handleSubmit1}>Submit</button>
</SoftBox>
*/}
                    <SoftBox mb={2}>
                      <SoftBox mt={4}>
                        <SoftTypography
                          ml={4.5}
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Full Name
                        </SoftTypography>
                        <SoftBox pb={1} px={4}>
                          <SoftInput
                            type="text"
                            placeholder="Enter Your Full Name"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                          />
                        </SoftBox>
                      </SoftBox>

                      <SoftBox>
                        <SoftTypography
                          ml={4.5}
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Employee Code
                        </SoftTypography>
                        <SoftBox pb={1} px={4}>
                          <SoftInput
                            id="code"
                            name="code"
                            // value={userEmployeeCode}
                            type="text"
                            placeholder="Enter Employee Code"
                            value={updatedEmployeeCode}
                            onChange={(e) =>
                              setUpdatedEmployeeCode(e.target.value)
                            }
                          />
                        </SoftBox>
                      </SoftBox>
                      <SoftBox>
                        <SoftTypography
                          ml={4.5}
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Phone Number
                        </SoftTypography>
                        <SoftBox pb={4} px={4}>
                          <SoftInput
                            id="phone"
                            name="phone"
                            // value={userPhone}
                            disabled
                            type="tel"
                            error
                            placeholder="Enter Phone Number"
                            value={updatedPhone}
                            onChange={(e) => setUpdatedPhone(e.target.value)}
                          />
                        </SoftBox>
                      </SoftBox>
                    </SoftBox>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}></Grid>
              </Grid>

              <SoftBox mt={6}>
                <SoftTypography textAlign="center">
                  <SoftButton
                    variant="contained"
                    color="info"
                    style={{
                      backgroundColor: "#0B2F8A",
                      boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                    }}
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </SoftButton>
                </SoftTypography>
              </SoftBox>
            </>
          )}

          {/*

          <input type="submit" value="Save" />
  */}
        </form>

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

export default EditProfile;
