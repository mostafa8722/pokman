import * as React from "react";
import "./Style.css";
import Button from "@mui/material/Button";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LabelInput from "../../LabelInputFields/Index";
import Stack from "@mui/material/Stack";
import ClearIcon from "@mui/icons-material/Clear";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "8px",
};
export default function NewAILeadsButton({ validationSaveSearch, handlesave, handleModelSave, modalOpen, setModalOpen, setDetailsFormData, detailsFormData, prefilledData }) {
  // const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => {
    if (!validationSaveSearch()) return;
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);
  const handleCancel = () => {
    handleClose();
  };
  const [modalinput, setmodalinput] = React.useState("");
  const handleInputChange = (e) => {
    setmodalinput(e.target.value);
  };
  return (
    <>
      <section className="Leades-filter-drop-down-button-main-container">
        <div>
          <h3 className="new-ai-leads-heading">New AI Leads Profile</h3>
        </div>
        <div>
          <div>
            {prefilledData ? null : <Button
              className="save-search-button"
              style={{ textTransform: "none" }}
              onClick={handleOpen}
            >
              <FolderOpenIcon />
              <p className="save-search-profile" onClick={handlesave}>Save search</p>
            </Button>}

            <Modal
              open={modalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="vrufyerv">
                <Box sx={style}>
                  <div className="modal-head-heading-crossicon">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      className="enetr-name-heading-modal"
                    >
                      Enter search name
                    </Typography>
                    <ClearIcon
                      onClick={handleCancel}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label htmlFor="" className="search-name-label-modal">
                      Search name
                    </label>
                    <LabelInput
                      value={detailsFormData?.addedName}
                      onChange={(e) => setDetailsFormData({ ...detailsFormData, addedName: e?.target?.value })}
                    />
                  </Typography>
                  <Stack>
                    <div className="button-cancel-save-modal">
                      <Button
                        variant="type"
                        className="cancel-button-modal"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleModelSave()}

                        variant="type"
                        className={
                          detailsFormData?.addedName
                            ? "save-button-modal"
                            : "save-button-modalclass"}>
                        Save
                      </Button>
                    </div>
                  </Stack>
                </Box>
              </div>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
}