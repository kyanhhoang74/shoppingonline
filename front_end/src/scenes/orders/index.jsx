import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"; // Assuming your theme file
import Header from "../../components/admin/Header";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/oders/all_orders');
        setOrders(response.data.map((order) => ({
          ...order,
          id: order._id, // Assuming your product data has an _id property
        })));
        console.log("aaaa",orders)
      } catch (error) {
        console.error('Error fetching Orders:', error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      field: "user_id",
      headerName: "Product Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
      headerName: "Sttus",
      flex: 1,
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
      <Header title="Orders" subtitle="List of Orders" />
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
          rows={orders}
          columns={columns}
          getRowId={(row)   => row.order} // Provide a unique identifier for each row
        />
      </Box>
    </Box>
  );
};

export default Orders;