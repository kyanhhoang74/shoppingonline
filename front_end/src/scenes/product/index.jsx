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

const Product = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories/all_categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const initialValues = {
    product_name: "",
    description: "",
    price: '',
    stock: '',
    category_id: "",
    capacities: [],
    price_sale: 0,
    image_preview: ''
  };


  const handleProductSubmit = async (values) => {
    setIsSubmitting(true);
    const jsonString = JSON.stringify(values);
    console.log("values", values)



    // Add other capacity properties as needed

    try {
      const response = await axios.post('http://localhost:5000/api/products/addproduct', jsonString, {
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log('Product creation response:', response.data.error);
      if (!response.data.error) {
        window.location.reload();
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
      console.error('Error submitting product:', error);

      // Handle errors (e.g., display error message)
      // ...
    } finally {
      setIsSubmitting(false); // Reset form submission state to 'false' after completion
    }
  };

  return (
    <Box m="20px">
      <Header title="Add Product" subtitle="Add New Product" />
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
          handleSubmit,
          setFieldValue
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
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.product_name}
                name="product_name"
                error={!!touched.product_name && !!errors.product_name}
                helperText={touched.product_name && errors.product_name}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl error={touched.category_id && Boolean(errors.category_id)}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  variant="filled"
                  name="category_id"
                  labelId="category-label"
                  id="category-select"
                  value={values.category_id}
                  color="success"

                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.category_id
                  && errors.category_id && (
                    <FormHelperText error>{errors.category_id}</FormHelperText>
                  )}
              </FormControl>
              <TextField

                variant="filled"
                type="text"
                label="Description"
                color="success"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField

                variant="filled"
                type="text"
                color="success"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 1" }}
              />


              <TextField

                variant="filled"
                type="text"
                label="Stock"
                onBlur={handleBlur}
                onChange={handleChange}
                color="success"
                value={values.stock}
                name="stock"
                error={!!touched.stock && !!errors.stock}
                helperText={touched.stock && errors.stock}
                sx={{ gridColumn: "span 1" }}
              />
              <FormControl error={touched.status && Boolean(errors.status)}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  variant="filled"
                  name="status"
                  labelId="status-label"
                  id="status-select"
                  color="success"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={0}>New</MenuItem>
                  <MenuItem value={1}>Sale</MenuItem>
                  <MenuItem value={2}>Top Categories</MenuItem>
                  <MenuItem value={3}>New Arrivals</MenuItem>
                  <MenuItem value={4}>Big Discounts</MenuItem>
                </Select>
                {touched.status && errors.status && (
                  <FormHelperText error>{errors.status}</FormHelperText>
                )}
              </FormControl>
              {values.status === 1 &&
                <TextField

                  variant="filled"
                  type="text"
                  color="success"
                  label="percent"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price_sale}
                  name="price_sale"
                  error={!!touched.price_sale && !!errors.price_sale}
                  helperText={touched.price_sale && errors.price_sale}
                  sx={{ gridColumn: "span 1" }}
                />

              }


              <TextField
                name="image_preview"
                type="file"
                onChange={(event) => {
                  values.image_preview = event.target.files[0].name;
                  console.log(values.image_preview) // Store the actual file object
                  handleChange(event);
                }}
                onBlur={handleBlur}
                error={touched.image_preview && Boolean(errors.image_preview)}
                helperText={touched.image_preview && errors.image_preview}
                sx={{ width: '220px', gridColumn: "span 2" }}
              />


              <FormControl error={touched.capacities && Boolean(errors.capacities)}>
                {values.capacities.map((capacity, index) => (
                  <Box key={index} display="grid" gap="10px" gridColumn="span 2">
                    <TextField
                      label={`Capacity ${index + 1}`}
                      variant="filled"
                      type="text"
                      color="success"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        const newCapacities = [...values.capacities];
                        newCapacities[index].capacity = event.target.value;
                        setFieldValue('capacities', newCapacities);
                      }}
                      value={values.capacities[index].capacity}
                      name={`capacities[${index}].capacity`}
                      error={!!touched.capacities?.[index]?.capacity && !!errors.capacities?.[index]?.capacity}
                      helperText={touched.capacities?.[index]?.capacity && errors.capacities?.[index]?.capacity}
                      sx={{ marginBottom: 2, marginTop: 2 }}
                    />
                    <TextField
                      label={`Price ${index + 1}`}
                      variant="filled"
                      type="text"
                      color="success"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        const newCapacities = [...values.capacities];
                        newCapacities[index].price_capacity = event.target.value;
                        setFieldValue('capacities', newCapacities);
                      }}
                      value={values.capacities[index].price_capacity}
                      name={`capacities[${index}].capacity`}
                      error={!!touched.capacities?.[index]?.price_capacity && !!errors.capacities?.[index]?.price_capacity}
                      helperText={touched.capacities?.[index]?.price_capacity && errors.capacities?.[index]?.price_capacity}
                    />
                    <TextField
                      label={`Color ${index + 1}`}
                      variant="filled"
                      type="text"
                      color="success"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        const newCapacities = [...values.capacities];
                        newCapacities[index].color_name = event.target.value;
                        setFieldValue('capacities', newCapacities);
                      }}
                      value={values.capacities[index].color_name}
                      name={`capacities[${index}].color_name`}
                      error={!!touched.capacities?.[index]?.color_name && !!errors.capacities?.[index]?.color_name}
                      helperText={touched.capacities?.[index]?.color_name && errors.capacities?.[index]?.color_name}
                      sx={{ marginBottom: 2, marginTop: 2 }}
                    />
                    <TextField
                      variant="filled"
                      type="file"
                      color="success"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        const newCapacities = [...values.capacities];
                        newCapacities[index].image = event.target.value;
                        setFieldValue('capacities', newCapacities);
                      }}
                      value={values.capacities[index].image}
                      name="image"
                      error={!!touched.capacities?.[index]?.image && !!errors.capacities?.[index]?.image}
                      helperText={touched.capacities?.[index]?.image && errors.capacities?.[index]?.image}
                    />
                    {index >= 0 &&
                      <Button style={{ color: "red" }} type="button" onClick={() => {
                        const newCapacities = [...values.capacities];
                        newCapacities.splice(index, 1);
                        setFieldValue('capacities', newCapacities);
                      }}>
                        Remove Capacity
                      </Button>
                    }

                  </Box>

                ))}
                <Button style={{ color: "green" }} type="button" onClick={() => {
                  setFieldValue('capacities', [...values.capacities, { capacity: '', price_capacity: '' }]);
                }}>
                  Add Capacity <p style={{ color: "red" }}>&nbsp;&nbsp;*</p>
                </Button>
              </FormControl>



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
  image_preview: yup.string().required("required"),
  product_name: yup.string().required("required"),
  description: yup.string().required("required"),
  price: yup.number().required("required"),
  stock: yup.number().required("required"),
  category_id: yup.string().required("Category is required"),
  capacities: yup.array().of(
    yup.object().shape({
      capacity: yup.string().required("Capacity is required"),
      price_capacity: yup.number().required("Price for capacity is required"),
    })),

  capacities: yup.array().of(
    yup.object().shape({
      color_name: yup.string().required("Color name is required"),
      image: yup.string().required("Image is required"), // Adjust validation as needed
    })
  ),
});


export default Product;
