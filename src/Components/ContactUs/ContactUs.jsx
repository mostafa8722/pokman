import * as React from "react";
import "./ContactUs.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LabelInput from "../LabelInputFields/Index";
import { FormControl, MenuList, TextField } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/joy/Box';
import { styled } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import axios from "axios";
import { APIUrlOne } from "../../Utils/Utils";
import { toast } from "react-toastify";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
import Loader from "../Loader/Loader";
export default function ContactUsScreen() {
  const [contactDetails, setContactDetails] = React.useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    joDepartments: "",
    department: "",
    requestType: "",
    uploadFile: "",
    message: "",
  })
  const [loading, setLoading] = React.useState();
  const [Departments, setDepartments] = React.useState([]);
  const [Request, setRequest] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imageName, setImageName] = React.useState("");
  const fileInputRef = React.useRef(null);
  const handleFileUploadModal = (e) => {
    const file = e.target?.files[0];
    setSelectedFile(file);
    setImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      setContactDetails({ ...contactDetails, uploadFile: base64data });
    };
    reader.readAsDataURL(file);
  };
  const chooseFileOpen = () => {
    fileInputRef?.current?.click();
  };
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };
  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  
  // const Textarea = styled(BaseTextareaAutosize)(
  //   ({ theme }) => `
  //       box-sizing: border-box;
  //       width: 320px;
  //       font-family: 'IBM Plex Sans', sans-serif;
  //       font-size: 0.875rem;
  //       font-weight: 400;
  //       line-height: 1.5;
  //       padding: 8px 12px;
  //       border-radius: 8px;
  //       color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  //       background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  //       border: 1px solid ${
  //         theme.palette.mode === "dark" ? grey[700] : grey[200]
  //       };
  //       box-shadow: 0px 2px 2px ${
  //         theme.palette.mode === "dark" ? grey[900] : grey[50]
  //       };
    
  //       &:hover {
  //         border-color: ${blue[400]};
  //       }
    
  //       &:focus {
  //         border-color: ${blue[400]};
  //         box-shadow: 0 0 0 3px ${
  //           theme.palette.mode === "dark" ? blue[600] : blue[200]
  //         };
  //       }
    
  //       // firefox
  //       &:focus-visible {
  //         outline: 0;
  //       }
  //     `
  // );
  
  const getDepartments = () => {
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_jo_departments`,
    };
    axios(option)
      .then((e) => {
        setDepartments(e?.data?.data);
      })
      .catch(() => {});
  };
  React.useEffect(() => {
    getDepartments();
  }, []);
  const GetDataRequest = () => {
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/request_type`,
    };
    axios(option)
      .then((e) => {
        setRequest(e?.data?.data);
      })
      .catch(() => {});
  };
  React.useEffect(() => {
    GetDataRequest();
  }, []);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  function isValidEmail(emailAddress) {
    return emailRegex.test(emailAddress);
  }
  const validateFields = () => {
    if (
      !contactDetails?.firstName ||
      contactDetails?.firstName?.trim() === ""
    ) {
      toast.error("Please Enter First Name");
      return false;
    }
    if (!contactDetails?.lastName || contactDetails?.lastName?.trim() === "") {
      toast.error("Please Enter Last Name");
      return false;
    }
    if (
      !contactDetails?.emailAddress ||
      contactDetails?.emailAddress?.trim() === ""
    ) {
      toast.error("Please Enter Email Address");
      return false;
    }
    if (!isValidEmail(contactDetails?.emailAddress)) {
      toast.error("Please Enter Valid Email");
      return false;
    }
    if (
      !isValidEmail(contactDetails?.emailAddress) ||
      contactDetails?.emailAddress?.trim() === ""
    ) {
      toast.error("Please Enter Email Address");
      return false;
    }
    if (!contactDetails?.joDepartments) {
      toast.error("Please Select JO Deparment");
      return false;
    }
    if (!contactDetails?.requestType) {
      toast.error("Please Select Request Type");
      return false;
    }
    return true;
  };
  const SubmitContact = (e) => {
    if (!validateFields()) return;
    setLoading(true);
    const data = {};
    data.first_name = contactDetails?.firstName;
    data.last_name = contactDetails?.lastName;
    data.email = contactDetails?.emailAddress;
    data.jo_department = contactDetails?.joDepartments;
    data.department = contactDetails?.department;
    data.request_type = contactDetails?.requestType;
    data.message = contactDetails?.message;
    data.uploaded_files = contactDetails?.uploadFile;
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/save_jo_request`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        setImageName("");
        setContactDetails({
          firstName: "",
          lastName: "",
          emailAddress: "",
          joDepartments: "",
          department: "",
          requestType: "",
          uploadFile: "",
          message: "",
        });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };
  return (
    <>
      {loading ? <Loader /> : null}
      <section className="ContactUsScreen-main-container">
        <div className="ContactUsScreen-heading">
          <h3>Contact Us </h3>
          <p>You are welcome to contact the JOI AI Team</p>
        </div>
        <div className="ContactUsScreen-container-outter">
          <div className="ContactUsScreen-container">
            <div className="ContactUsScreen-flex-container">
              <div className="ContactUsScreen-child-container">
                <label htmlFor="" className="ContactUsScreen-lables">
                  First Name
                </label>
                <span className="mandatoryfields">*</span>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setContactDetails({
                      ...contactDetails,
                      firstName: inputvalue,
                    });
                  }}
                  value={contactDetails?.firstName}
                />
              </div>
              <div className="ContactUsScreen-child-container">
                <label htmlFor="" className="ContactUsScreen-lables">
                  Last Name
                </label>
                <span className="mandatoryfields">*</span>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setContactDetails({
                      ...contactDetails,
                      lastName: inputvalue,
                    });
                  }}
                  value={contactDetails?.lastName}
                />
              </div>
            </div>
            <div className="ContactUsScreen-flex-container">
              <div className="ContactUsScreen-child-container">
                <label htmlFor="" className="ContactUsScreen-lables">
                  Email Address
                </label>
                <span className="mandatoryfields">*</span>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setContactDetails({
                      ...contactDetails,
                      emailAddress: inputvalue,
                    });
                  }}
                  value={contactDetails?.emailAddress}
                />
              </div>
              <div className="ContactUsScreen-child-container">
                <label htmlFor="" className="ContactUsScreen-lables">
                  JO Department 
                </label>
                <span className="mandatoryfields">*</span>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    className="ContactUsScreen-dropdown"
                    onChange={(e) => {
                      const inputvalue = e?.target?.value;
                      setContactDetails({
                        ...contactDetails,
                        joDepartments: inputvalue,
                      });
                    }}
                    value={contactDetails?.joDepartments}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {Departments?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="ContactUsScreen-flex-container">
              <div className="ContactUsScreen-child-container">
                <label htmlFor="" className="ContactUsScreen-lables">
                  Request Type/Subject
                </label>
                <span className="mandatoryfields">*</span>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    className="ContactUsScreen-dropdown"
                    onChange={(e) => {
                      const inputvalue = e?.target?.value;
                      setContactDetails({
                        ...contactDetails,
                        requestType: inputvalue,
                      });
                    }}
                    value={contactDetails?.requestType}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {Request?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="uploderinput">
                <label className="ContactUsScreen-lables" htmlFor="">
                  Upload files(s)
                </label>
                
                <div className="custom-file-upload">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUploadModal}
                  />
                  {imageName ? (
                    <div className="Choose-file-btn">
                      <span>{imageName}</span>
                    </div>
                  ) : (
                    <button className="Choose-file-btn">
                      Choose File(s) to upload
                    </button>
                  )}
                  <button
                    className="chooseFileOpenUpload"
                    onClick={chooseFileOpen}
                  >
                    {" "}
                    <FileUploadSharpIcon /> Browse Files
                  </button>
                </div>
              </div>
            </div>
            <label cl htmlFor="" className="ContactUsScreen-lables">
              Question or Message
            </label>
            <div className="contactusTextarea">
          <Textarea 
       className="ContactUsScreen-lables-text-field-area"
          value={contactDetails?.message}
          aria-label="minimum height"
          minRows={3}
          onChange={(e) => {
            const inputvalue = e?.target?.value;
            setContactDetails({ ...contactDetails, message: inputvalue });
          }}
          
          />
                {/* <Textarea
                  value={contactDetails?.message}
                  aria-label="minimum height"
                  minRows={3}
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setContactDetails({ ...contactDetails, message: inputvalue });
                  }}
                /> */}
            </div>
            <div className="SUBMITbutton-div">
              <Stack spacing={2} direction="row">
                <Button
                  className="ContactUs-SUBMIT-button"
                  variant="contained"
                  onClick={SubmitContact}
                >
                  <SaveAltTwoToneIcon />
                  SUBMIT
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}