import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, capacities } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/admin/Header";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

const Categories = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");



  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const initialValues = {
    name: "",

  };


  const handleProductSubmit = async (values) => {
    setIsSubmitting(true);
    const jsonString = JSON.stringify(values);
    console.log("values", values)



    // Add other capacity properties as needed

    try {
      const response = await axios.post('http://localhost:5000/api/categories/add', jsonString, {
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log('Product creation response:', response.data.error);
      if (!response.data.error) {
        setSuccessMessage('Product added successfully!');
        toast.success('Product added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick:
            true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      }
      else {
        setErrorMessage('Product added failed!');
        toast.error('Product added failed! Check field again', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick:
            true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      }

      // Handle successful submission (e.g., reset form, show success message)
      // ...

    } catch (error) {
      console.error('Error submitting categories:', error);

      // Handle errors (e.g., display error message)
      // ...
    } finally {
      setIsSubmitting(false); // Reset form submission state to 'false' after completion
    }
  };

  return (
    <Box m="20px">
      <Header title="Add Product" subtitle="Add New Categories" />
      <ToastContainer />
      <Formik
        onSubmit={handleProductSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >

        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit

        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField

                variant="filled"
                type="text"
                color="success"
                label="Categories Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
             

            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
          </form >
        )}
      </Formik >
    </Box >
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({

  name: yup.string().required("required"),
 
});


export default Categories;
