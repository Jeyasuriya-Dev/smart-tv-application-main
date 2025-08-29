// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import userDeviceStore from '../store/userDeviceStore';
// import useAppUrlStore from '../store/useAppUrlStore';
// import userdeviceUIDStore from '../store/usedeviceIDStore';


// const userDeviceDetails = (shouldStart) => {
// 	const [deviceDetails, setDeviceDetails] = useState(null);
// 	const navigate = useNavigate();
// 	// const Device_id = 'ABCDEFGHIJ'; // 0461dbdd0ce43fd2  a7b235567dbd7528   ABCDEFGHIJ 
// 	// const BASE_URL = 'https://ds.iqtv.in:8080/iqworld';
// 	const appUrl = useAppUrlStore((state) => state.appUrl);
// 	// const APPLICATION_URL = import.meta.env.VITE_SERVER_APPLICATION_URL;


// 	const storeDeviceDetails = userDeviceStore.getState().setDeviceDetails;
// 	const setIsRegistered = userDeviceStore.getState().setIsRegistered;

// 	const showdeviceDetails = userDeviceStore((state) => state.deviceDetails); //Show Function User Device Details From Store 
// 	const setApprovalPending = userDeviceStore.getState().setApprovalPending;

// 	const setIsExpired = userDeviceStore.getState().setIsExpired;

// 	const deviceUID = userdeviceUIDStore((state) => state.deviceUID);


// 	const [ToastMessage, setToastMessage] = useState(true)

// 	const[iseExpired,setIsExpired] = useState(false)

// 	//Console.log User Device details  
// 	useEffect(() => {
// 		if (showdeviceDetails) {
// 			// console.log(showdeviceDetails.clientname)
// 		}
// 	}, [showdeviceDetails]);



// 	useEffect(() => {
// 		// Only run API call if deviceUID is available
// 		if (!deviceUID) {
// 			console.warn("Device UID not ready yet, skipping API call...");
// 			return;
// 		}

// 		const fetchData = async () => {
// 			try {
// 				const res = await axios.get(
// 					`${appUrl}api/v1/none-auth/device/isexist?android_id=${deviceUID}`
// 				);

// 				const data = res.data;
// 				console.log("=== Device API Response ===");
// 				console.log(JSON.stringify(data, null, 2));

// 				setDeviceDetails(data);
// 				storeDeviceDetails(data);


// 				if (data.status === "success" && data.client_status && data.device_status) {
// 					if (data.isexpired) {
// 						// Plan Expired state handling
// 						setIsExpired(true)

// 						//  Customer plan expired or other server-side message
// 						setApprovalPending(true);
// 						console.log(data.message)
// 						// setIsRegistered(false);
// 					} else {
// 						setApprovalPending(false);
// 						setIsRegistered(true);
// 					}
// 				} else {
// 					setApprovalPending(false);
// 					setIsRegistered(false);
// 				}
// 			} catch (err) {
// 				// console.error("API error:", err);
// 				toast.error("API Error: " + err.message);
// 				setIsRegistered(false);
// 			}
// 		};

// 		// Call immediately once UID is available
// 		fetchData();
// 		setToastMessage(false)

// 		// Poll every 3 sec (adjust as needed)
// 		const interval = setInterval(fetchData, 3000);
// 		return () => clearInterval(interval);
// 	}, [deviceUID, appUrl]); // 👈 depend on deviceUID






// 	return deviceDetails;
// };

// export default userDeviceDetails;




// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import userDeviceStore from '../store/userDeviceStore';
// import useAppUrlStore from '../store/useAppUrlStore';
// import userdeviceUIDStore from '../store/usedeviceIDStore';

// const userDeviceDetails = () => {
//   const [deviceDetails, setDeviceDetails] = useState(null);
//   const navigate = useNavigate();
//   const appUrl = useAppUrlStore((state) => state.appUrl);

//   const storeDeviceDetails = userDeviceStore.getState().setDeviceDetails;
//   const setIsRegistered = userDeviceStore.getState().setIsRegistered;
//   const setApprovalPending = userDeviceStore.getState().setApprovalPending;

//   const deviceUID = userdeviceUIDStore((state) => state.deviceUID);

//   useEffect(() => {
//     if (!deviceUID) {
//       console.warn("Device UID not ready yet, skipping API call...");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${appUrl}api/v1/none-auth/device/isexist?android_id=${deviceUID}`
//         );

//         const data = res.data;
//         console.log("=== Device API Response ===");
// 		console.log(JSON.stringify(data, null, 2));

//         setDeviceDetails(data);
//         storeDeviceDetails(data);

//         //  Case 1: Device Approved & Not Expired
//         if (data.status === "success" && data.client_status && data.device_status) {
//           if (data.isexpired) {
//             toast.error("Your plan has expired. Please renew to continue.", {
//               autoClose: 3000,
//             });
//             setIsRegistered(true);
//             setApprovalPending(true); // block streaming
//           } else {
//             setIsRegistered(true);
//             setApprovalPending(false);
//             navigate("/streamingpage");
//           }
//         }
//         //  Case 2: Registered but Not Approved yet
//         else if (data.status === "success" && data.client_status && !data.device_status) {
//           setIsRegistered(true);
//           setApprovalPending(true);
//           // show approval UI
//           navigate("/approval-pending");
//         }
//         //  Case 3: Device not registered (logged out)
//         else if (data.status === "success" && !data.client_status) {
//           toast.info("Device logged out. Redirecting to Registration...", {
//             autoClose: 2000,
//           });
//           setIsRegistered(false);
//           setApprovalPending(false);
//           navigate("/register");
//         }
//       } catch (err) {
//         console.error("API error:", err);
//         toast.warn("Server unreachable. Using last known device status...", {
//           autoClose: 3000,
//         });
//         //  Do NOT reset state here — keep last known good state
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 3000);
//     return () => clearInterval(interval);
//   }, [deviceUID, appUrl, navigate]);

//   return deviceDetails;
// };

// export default userDeviceDetails;



// final update

// src/API-Handling/userDeviceDetails.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import userDeviceStore from '../store/userDeviceStore';
import useAppUrlStore from '../store/useAppUrlStore';
import userdeviceUIDStore from '../store/usedeviceIDStore';

const userDeviceDetails = (shouldStart) => {
  const [deviceDetails, setDeviceDetails] = useState(null);

  const appUrl = useAppUrlStore((state) => state.appUrl);
  const deviceUID = userdeviceUIDStore((state) => state.deviceUID);

  // Zustand setters
  const storeDeviceDetails = userDeviceStore.getState().setDeviceDetails;
  const setIsRegistered = userDeviceStore.getState().setIsRegistered;
  const setApprovalPending = userDeviceStore.getState().setApprovalPending;
  const setIsExpired = userDeviceStore.getState().setIsExpired;

  useEffect(() => {
    if (!shouldStart || !deviceUID) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${appUrl}api/v1/none-auth/device/isexist?android_id=${deviceUID}`
        );

        const data = res.data;
        // console.log("=== Device API Response ===");
        // console.log(JSON.stringify(data, null, 2));

        setDeviceDetails(data);
        storeDeviceDetails(data);

        // Case 1: Approved + Active + Not Expired
        if (data.status === "success" && data.client_status && data.device_status) {
          if (data.isexpired) {
            setIsRegistered(true);
            setApprovalPending(false);
            setIsExpired(true);   //  mark expired
          } else {
            setIsRegistered(true);
            setApprovalPending(false);
            setIsExpired(false);
          }
        }
        // Case 2: Registered but NOT approved
        else if (data.status === "success" && data.client_status && !data.device_status) {
          setIsRegistered(true);
          setApprovalPending(true);
          setIsExpired(false);
        }
        // Case 3: Not registered / logged out
        else {
          setIsRegistered(false);
          setApprovalPending(false);
          setIsExpired(false);
        }
      } catch (err) {
        console.error("API error:", err);
        // Do NOT reset state here → keep last known good state
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [shouldStart, deviceUID, appUrl]);

  return deviceDetails;
};

export default userDeviceDetails;
