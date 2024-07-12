import React from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import workers from "../../../service/workers";

const Fade = ({ children, in: open }) => (
  <div style={{ opacity: open ? 1 : 0, transition: "opacity 0.5s" }}>
    {open && children}
  </div>
);

const Index = ({ open, handleClose, item }) => {
  const initialValues = Object.keys(item || {}).reduce((acc, key) => {
    acc[key] = item[key] || "";
    return acc;
  }, {});

  const handleSubmit = async (values) => {
    const apiCall = item ? workers.update : workers.create;
    try {
      const response = await apiCall(
        item ? { id: item.id, ...values } : values
      );
      if (response.status === (item ? 200 : 201)) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formFields = [
    { name: "age", label: "Age", type: "number" },
    { name: "email", label: "Email", type: "text" },
    { name: "first_name", label: "First Name", type: "text" },
    { name: "last_name", label: "Last Name", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "phone_number", label: "Phone", type: "text" },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
            Add Worker
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                {formFields.map(({ name, label, type }) => (
                  <Field
                    key={name}
                    name={name}
                    type={type}
                    as={TextField}
                    label={label}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name={name}
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                ))}
                <Field name="gender" as={RadioGroup} row>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </Field>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FACC15",
                    color: "#FFFF",
                    "&:hover": { backgroundColor: "#FACC15" },
                    marginBottom: "8px",
                  }}
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Index;
