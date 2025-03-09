// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Dialog,
//   Slide,
//   TextField,
//   InputAdornment,
//   Box,
// } from "@mui/material";
// import {  Close } from "@mui/icons-material";
// import { Search } from 'lucide-react';
// const FullScreenSearch = () => {
//   const [open, setOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setSearchQuery("");
//   };

//   return (
//     <div>
//       <IconButton onClick={handleOpen}>
//         <Search color="#fafafa"/>
//       </IconButton>

//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Slide}
//         PaperProps={{
//           sx: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)", 
//             backdropFilter: "blur(10px)", 
//           },
//         }}
//       >
//         <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
//           <Toolbar>
//             <Typography variant="h6">Search</Typography>
//             <IconButton sx={{ ml: "auto" }} color="inherit" onClick={handleClose}>
//               <Close />
//             </IconButton>
//           </Toolbar>
//         </AppBar>

//         <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
//           <TextField
//             fullWidth
//             autoFocus
//             placeholder="Search..."
//             variant="outlined"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{
//               maxWidth: "600px",
//               backgroundColor: "rgba(255, 255, 255, 0.8)", 
//               borderRadius: "10px",
//               backdropFilter: "blur(5px)", 
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       </Dialog>
//     </div>
//   );
// };

// export default FullScreenSearch;
