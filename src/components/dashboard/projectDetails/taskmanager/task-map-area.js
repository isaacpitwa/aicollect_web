// import React from "react";
// import { GoogleMap } from "@react-google-maps/api";
// import { useLoadScript } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100vw",
//   height: "100vh",
// };
// const center = {
//   lat: 31.968599,
//   lng: -99.90181,
// };

// export const TaskMap = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_TOKEN,
//   });

//   if (loadError) return "Error loading Maps";
//   if (!isLoaded) return "Loading Maps";

//   return (
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       zoom={11}
//       center={center}
//     />
//   );
// }
