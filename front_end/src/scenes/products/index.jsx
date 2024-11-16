import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"; // Assuming your theme file
import Header from "../../components/admin/Header";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all_products');
        setProducts(response.data.map((product) => ({
          ...product,
          id: product._id, // Assuming your product data has an _id property
        })));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      field: "product_name",
      headerName: "Product Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
    },
    {
      // Assuming your product data has a "capacities" array
      field: "capacities.capacity",
      headerName: "Capacity",
      flex: 1,
      renderCell: (params) => (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {params.row.capacities.map((capacity) => (
            <li key={capacity.capacity}>
              {capacity.capacity}
            </li>
          ))}
        </ul>
      ),
    },

    {
      // Assuming your product data has a "capacities" array
      field: "capacities.price_capacity",
      headerName: "Price-Cap",
      flex: 1,
      renderCell: (params) => (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {params.row.capacities.map((capacity) => (
            <li key={capacity.capacity} style={{color : "green"}}>
         
         {capacity.price_capacity
            ? capacity.price_capacity.toLocaleString('vi-VN', { minimumFractionDigits: 0 })
            : 'N/A'}
            
            </li>
 
          ))}
        </ul>
      ),
    },
    {
      // Assuming your product data has a "capacities" array
      field: "colors.color_name",
      headerName: "Color",
      flex: 1,
      renderCell: (params) => (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {params.row.capacities.map((color) => (
            <li key={color.color_name}>
              {color.color_name}
            </li>
          ))}
        </ul>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        if (params.row.status === 0) {
          return 'New';
        } else if (params.row.status === 1) {
          return 'Sale';
        } else if (params.row.status === 2) {
          return 'Sale';
        } else if (params.row.status === 3) {
          return 'New Arrivals';
        } else if (params.row.status === 4) {
          return 'Big Discounts';
        } else {
          return 'Unknown'; // Or handle other cases as needed
        }
      },
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]} style={{justifyContent: "center"}}>
          <Button style={{color:"#B5FBDD", marginRight: "5px"}}><SystemUpdateAltOutlinedIcon/></Button>
          <Button style={{ color:"#FF756B"}} ><DeleteOutlineOutlinedIcon/></Button>
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="List of Products" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={products}
          columns={columns}
          getRowId={(row) => row.id} // Provide a unique identifier for each row
        />
      </Box>
    </Box>
  );
};

export default Products;