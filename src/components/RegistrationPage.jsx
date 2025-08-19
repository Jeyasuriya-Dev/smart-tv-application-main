// import React, { useEffect, useState } from 'react';
// import '../app.css';
// import Qrcode from './Qrcode';
// import userAndroidIDStore from '../store/userAndroididStore';
// import userDeviceStore from '../store/userDeviceStore';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';



// //  Utility to get or generate DUID
// function getDeviceUID() {
// 	return new Promise((resolve) => {
// 		// On real webOS device
// 		if (window.webOS && window.webOS.deviceInfo) {
// 			window.webOS.deviceInfo((info) => {
// 				if (info && info.duid) {
// 					resolve(info.duid);
// 				} else {
// 					// fallback: use serial number if available
// 					if (info && info.serialNumber) {
// 						resolve(info.serialNumber);
// 					} else {
// 						// ultimate fallback
// 						let uid = localStorage.getItem("fallback_duid");
// 						if (!uid) {
// 							uid = crypto.randomUUID();
// 							localStorage.setItem("fallback_duid", uid);
// 						}
// 						resolve(uid);
// 					}
// 				}
// 			});
// 		} else {
// 			// Not on webOS (Browser testing)
// 			let uid = localStorage.getItem("fallback_duid");
// 			if (!uid) {
// 				uid = crypto.randomUUID();
// 				localStorage.setItem("fallback_duid", uid);
// 			}
// 			resolve(uid);
// 		}
// 	});
// }



// export default function RegistrationPage() {
// 	const [uniqueNumber, setUniqueNumber] = useState('');
// 	const [qrValue, setQrvalue] = useState(true);
// 	const androidid = 'de568fcc560faa62'  ///0461dbdd0ce43fd2  de568fcc560faa62
// 	//   This value for to show the new Registration page
// 	const [value, setValue] = useState(` https://ds.iqtv.in/#/iqworld/digitalsignage/device/registrationform/${androidid}`)
// 	const [deviceId, setDeviceId] = useState('');

// 	const { setAndroidId } = userAndroidIDStore();

// 	const [regSuccess, setRegSuccess] = useState(false)


// 	useEffect(() => {
// 		const url = window.location.href;
// 		const match = url.match(/registrationform\/([^/]+)/);
// 		if (match && match[1]) {
// 			const androidIdFromURL = match[1];
// 			setAndroidId(androidIdFromURL);
// 		}
// 	}, []);

// 	const androidID = userAndroidIDStore(state => state.androidID);

// 	const handleQrcodevalue = (e) => {
// 		setValue(e.target.value)
// 	}

// 	const handleQrcodechange = (e) => {
// 		e.preventDefault();
// 		setQrvalue(true);
// 	}

// 	const handleChange = (e) => {
// 		setUniqueNumber(e.target.value)
// 	}

// 	const navigate = useNavigate()

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const deviceDetails = userDeviceStore.getState().deviceDetails;
// 		const { setIsRegistered } = userDeviceStore.getState();

// 		if (deviceDetails && uniqueNumber === deviceDetails.username) {
// 			toast.success("Registration successful");
// 			setIsRegistered(true); // Set global registration flag
// 			navigate('/');          // Redirect to streaming page
// 		} else {
// 			toast.error(" Invalid username");
// 		}
// 	};



// 	useEffect(() => {
// 		if (window.webOS && window.webOS.service) {
// 			window.webOS.service.request("luna://com.webos.service.tv.systemproperty", {
// 				method: "getSystemInfo",
// 				parameters: { keys: ["serialNumber"] },
// 				onSuccess: function (result) {
// 	    			const serial = result.serialNumber || "Unavailable";
// 					console.log("Serial Number:", serial);
// 					setDeviceId(serial || "Unknown Serial Number");
// 				},
// 				onFailure: function (err) {
// 					console.error("Error fetching device info:", err);
// 					setDeviceId("Error fetching Device ID");
// 				}
// 			});
// 		} else {
// 			setDeviceId("Not running on webOS");
// 		}
// 	}, []);


// 	// useEffect(() => {
// 	// 	if (typeof window.webOS !== "undefined") {
// 	// 		console.log("✅ Running on webOS:", window.webOS);

// 	// 		if (window.webOS.deviceInfo) {
// 	// 			window.webOS.deviceInfo((info) => {
// 	// 				console.log("Device Info:", info);
// 	// 				setDeviceId(info.duid || info.serialNumber || "Unknown Device");
// 	// 			});
// 	// 		} else {
// 	// 			setDeviceId("webOS detected but deviceInfo not available");
// 	// 		}
// 	// 	} else {
// 	// 		console.log("❌ Not running on webOS");
// 	// 		setDeviceId("Not running on webOS");
// 	// 	}
// 	// }, []);



// 	return (
// 		<div>
// 			<div className="container">
// 				<div className='contents-container'>
// 					<img src="./applogo.jpeg" alt="IQ World Logo" className="logo" />
// 					<p className="tagline">INDIA KA IQ</p>
// 					<div className='head'>
// 						<h2>New Device Registration</h2>
// 					</div>
// 					{
// 						qrValue ? <Qrcode value={value} /> : null

// 						// If need  QR code Generator in page


// 						// <div className='qr-container'>
// 						//     <h1>QR Code Generator</h1>
// 						//     <input type="text" className='generator-ip' placeholder='Enter Value ' onChange={handleQrcodevalue} value={value}/>
// 						//     <button onClick={handleQrcodechange} className='submit-btn'>Generate QR</button>
// 						// </div>
// 					}

// 					<div className="form-group">
// 						<label htmlFor="unique-number">Unique Number</label>
// 						<input type="text" id="unique-number" onChange={handleChange} />
// 					</div>
// 					<div className='button-container'>
// 						<button className="submit-btn" id='submit-button' onClick={handleSubmit}>Submit</button>
// 						<p>{deviceId}</p>
// 					</div>
// 				</div>
// 				<div className='version-container'>
// 					<p className="version">de568fcc560fca62 <br /> V-1.0</p>
// 				</div>

// 			</div>


// 		</div>
// 	);
// }



// Generate Device Unique ID of Every Device Code Here

import React, { useEffect, useState } from 'react';
import '../app.css';
import Qrcode from './Qrcode';
import userAndroidIDStore from '../store/userAndroididStore';
import userDeviceStore from '../store/userDeviceStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

//  Utility to get or generate DUID
function getDeviceUID() {
  return new Promise((resolve) => {
    // On real webOS device
    if (window.webOS && window.webOS.deviceInfo) {
      window.webOS.deviceInfo((info) => {
        if (info && info.duid) {
          resolve(info.duid);
        } else {
          // fallback: use serial number if available
          if (info && info.serialNumber) {
            resolve(info.serialNumber);
          } else {
            // ultimate fallback
            let uid = localStorage.getItem("fallback_duid");
            if (!uid) {
              uid = crypto.randomUUID();
              localStorage.setItem("fallback_duid", uid);
            }
            resolve(uid);
          }
        }
      });
    } else {
      // Not on webOS (Browser testing)
      let uid = localStorage.getItem("fallback_duid");
      if (!uid) {
        uid = crypto.randomUUID();
        localStorage.setItem("fallback_duid", uid);
      }
      resolve(uid);
    }
  });
}

export default function RegistrationPage() {
  const [uniqueNumber, setUniqueNumber] = useState('');
  const [qrValue, setQrvalue] = useState(true);
  const [value, setValue] = useState('');
  const [deviceId, setDeviceId] = useState('');

  const { setAndroidId } = userAndroidIDStore();
  const { setIsRegistered } = userDeviceStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    // extract androidID from URL if present
    const url = window.location.href;
    const match = url.match(/registrationform\/([^/]+)/);
    if (match && match[1]) {
      const androidIdFromURL = match[1];
      setAndroidId(androidIdFromURL);
    }
  }, []);

  useEffect(() => {
    //  Initialize Device UID
    getDeviceUID().then((uid) => {
      setDeviceId(uid);
      // Also update QR link with this device ID
      setValue(`https://ds.iqtv.in/#/iqworld/digitalsignage/device/registrationform/${uid}`);
    });
  }, []);

  const handleChange = (e) => {
    setUniqueNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const deviceDetails = userDeviceStore.getState().deviceDetails;

    if (deviceDetails && uniqueNumber === deviceDetails.username) {
      toast.success("Registration successful");
      setIsRegistered(true);
      navigate('/');
    } else {
      toast.error("Invalid username");
    }
  };

  return (
    <div>
      <div className="container">
        <div className='contents-container'>
          <img src="./applogo.jpeg" alt="IQ World Logo" className="logo" />
          <p className="tagline">INDIA KA IQ</p>
          <div className='head'>
            <h2>New Device Registration</h2>
          </div>
          {qrValue ? <Qrcode value={value} /> : null}

          <div className="form-group">
            <label htmlFor="unique-number">Unique Number</label>
            <input type="text" id="unique-number" onChange={handleChange} />
          </div>
          <div className='button-container'>
            <button className="submit-btn" id='submit-button' onClick={handleSubmit}>Submit</button>
            {/* <p>Device UID: {deviceId}</p> */}
          </div>
        </div>
        <div className='version-container'>
          <p className="version">{deviceId} <br /> V-1.0</p>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import '../app.css';
// import Qrcode from './Qrcode';
// import userAndroidIDStore from '../store/userAndroididStore';
// import userDeviceStore from '../store/userDeviceStore';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';


// // ✅ Utility to get Device ID (webOS safe)
// function getDeviceUID() {
// 	return new Promise((resolve) => {
// 		try {
// 			// Running on real webOS?
// 			if (typeof window !== "undefined" && window.webOS) {
// 				// First try deviceInfo
// 				if (window.webOS.deviceInfo) {
// 					window.webOS.deviceInfo((info) => {
// 						if (info && info.duid) {
// 							resolve(info.duid);
// 						} else if (info && info.serialNumber) {
// 							resolve(info.serialNumber);
// 						} else {
// 							// fallback: request via luna
// 							if (window.webOS.service) {
// 								window.webOS.service.request(
// 									"luna://com.webos.service.tv.systemproperty",
// 									{
// 										method: "get",
// 										parameters: { keys: ["serialNumber"] },
// 										onSuccess: (res) =>
// 											resolve(res.serialNumber || "Unknown Device"),
// 										onFailure: () => resolve("Unknown Device"),
// 									}
// 								);
// 							} else {
// 								resolve("Unknown Device");
// 							}
// 						}
// 					});
// 				} else {
// 					resolve("webOS detected but deviceInfo not available");
// 				}
// 			} else {
// 				// Not on webOS → fallback random UUID
// 				let uid = localStorage.getItem("fallback_duid");
// 				if (!uid) {
// 					uid = crypto.randomUUID();
// 					localStorage.setItem("fallback_duid", uid);
// 				}
// 				resolve(uid);
// 			}
// 		} catch (err) {
// 			console.error("getDeviceUID error:", err);
// 			resolve("Unknown Device");
// 		}
// 	});
// }


// export default function RegistrationPage() {
// 	const [uniqueNumber, setUniqueNumber] = useState('');
// 	const [qrValue, setQrvalue] = useState(true);
// 	const androidid = 'de568fcc560faa62';
// 	const [value, setValue] = useState(
// 		` https://ds.iqtv.in/#/iqworld/digitalsignage/device/registrationform/${androidid}`
// 	);
// 	const [deviceId, setDeviceId] = useState('');

// 	const { setAndroidId } = userAndroidIDStore();
// 	const [regSuccess, setRegSuccess] = useState(false);
// 	const navigate = useNavigate();

// 	// Extract androidId from URL
// 	useEffect(() => {
// 		const url = window.location.href;
// 		const match = url.match(/registrationform\/([^/]+)/);
// 		if (match && match[1]) {
// 			setAndroidId(match[1]);
// 		}
// 	}, []);

// 	const androidID = userAndroidIDStore(state => state.androidID);

// 	const handleQrcodevalue = (e) => setValue(e.target.value);
// 	const handleQrcodechange = (e) => {
// 		e.preventDefault();
// 		setQrvalue(true);
// 	};
// 	const handleChange = (e) => setUniqueNumber(e.target.value);

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const deviceDetails = userDeviceStore.getState().deviceDetails;
// 		const { setIsRegistered } = userDeviceStore.getState();

// 		if (deviceDetails && uniqueNumber === deviceDetails.username) {
// 			toast.success("Registration successful");
// 			setIsRegistered(true);
// 			navigate('/');
// 		} else {
// 			toast.error("Invalid username");
// 		}
// 	};

// 	// ✅ Safe Device ID fetch on mount
// 	useEffect(() => {
// 		getDeviceUID().then((id) => setDeviceId(id));
// 	}, []);

// 	return (
// 		<div>
// 			<div className="container">
// 				<div className='contents-container'>
// 					<img src="./applogo.jpeg" alt="IQ World Logo" className="logo" />
// 					<p className="tagline">INDIA KA IQ</p>
// 					<div className='head'>
// 						<h2>New Device Registration</h2>
// 					</div>

// 					{qrValue ? <Qrcode value={value} /> : null}

// 					<div className="form-group">
// 						<label htmlFor="unique-number">Unique Number</label>
// 						<input type="text" id="unique-number" onChange={handleChange} />
// 					</div>
// 					<div className='button-container'>
// 						<button className="submit-btn" id='submit-button' onClick={handleSubmit}>Submit</button>
// 						<p>{deviceId}</p> {/* ✅ Shows duid / serial / fallback */}
// 					</div>
// 				</div>
// 				<div className='version-container'>
// 					<p className="version">de568fcc560fca62 <br /> V-1.0</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }


// import React, { useEffect, useState } from 'react';
// import '../app.css';
// import Qrcode from './Qrcode';
// import userAndroidIDStore from '../store/userAndroididStore';
// import userDeviceStore from '../store/userDeviceStore';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';


// // ✅ Utility to get Device ID with required priority
// function getDeviceUID() {
// 	return new Promise((resolve) => {
// 		try {
// 			// Running on real webOS?
// 			if (typeof window !== "undefined" && window.webOS) {
// 				// Try serialNumber from deviceInfo
// 				if (window.webOS.deviceInfo) {
// 					window.webOS.deviceInfo((info) => {
// 						if (info && info.serialNumber) {
// 							resolve(info.serialNumber);
// 						} else {
// 							// Try serialNumber from luna service
// 							if (window.webOS.service) {
// 								window.webOS.service.request(
// 									"luna://com.webos.service.tv.systemproperty",
// 									{
// 										method: "get",
// 										parameters: { keys: ["serialNumber"] },
// 										onSuccess: (res) => {
// 											if (res && res.serialNumber) {
// 												resolve(res.serialNumber);
// 											} else if (info && info.duid) {
// 												resolve(info.duid);
// 											} else {
// 												// Fallback to randomUUID
// 												let uid = localStorage.getItem("fallback_duid");
// 												if (!uid) {
// 													uid = crypto.randomUUID();
// 													localStorage.setItem("fallback_duid", uid);
// 												}
// 												resolve(uid);
// 											}
// 										},
// 										onFailure: () => {
// 											if (info && info.duid) {
// 												resolve(info.duid);
// 											} else {
// 												let uid = localStorage.getItem("fallback_duid");
// 												if (!uid) {
// 													uid = crypto.randomUUID();
// 													localStorage.setItem("fallback_duid", uid);
// 												}
// 												resolve(uid);
// 											}
// 										},
// 									}
// 								);
// 							} else if (info && info.duid) {
// 								resolve(info.duid);
// 							} else {
// 								let uid = localStorage.getItem("fallback_duid");
// 								if (!uid) {
// 									uid = crypto.randomUUID();
// 									localStorage.setItem("fallback_duid", uid);
// 								}
// 								resolve(uid);
// 							}
// 						}
// 					});
// 				} else {
// 					// deviceInfo not available, fallback to randomUUID
// 					let uid = localStorage.getItem("fallback_duid");
// 					if (!uid) {
// 						uid = crypto.randomUUID();
// 						localStorage.setItem("fallback_duid", uid);
// 					}
// 					resolve(uid);
// 				}
// 			} else {
// 				// Not on webOS → fallback random UUID
// 				let uid = localStorage.getItem("fallback_duid");
// 				if (!uid) {
// 					uid = crypto.randomUUID();
// 					localStorage.setItem("fallback_duid", uid);
// 				}
// 				resolve(uid);
// 			}
// 		} catch (err) {
// 			console.error("getDeviceUID error:", err);
// 			let uid = localStorage.getItem("fallback_duid");
// 			if (!uid) {
// 				uid = crypto.randomUUID();
// 				localStorage.setItem("fallback_duid", uid);
// 			}
// 			resolve(uid);
// 		}
// 	});
// }


// export default function RegistrationPage() {
// 	const [uniqueNumber, setUniqueNumber] = useState('');
// 	const [qrValue, setQrvalue] = useState(true);
// 	const androidid = 'de568fcc560faa62';
// 	const [value, setValue] = useState(
// 		` https://ds.iqtv.in/#/iqworld/digitalsignage/device/registrationform/${androidid}`
// 	);
// 	const [deviceId, setDeviceId] = useState('');

// 	const { setAndroidId } = userAndroidIDStore();
// 	const [regSuccess, setRegSuccess] = useState(false);
// 	const navigate = useNavigate();

// 	// Extract androidId from URL
// 	useEffect(() => {
// 		const url = window.location.href;
// 		const match = url.match(/registrationform\/([^/]+)/);
// 		if (match && match[1]) {
// 			setAndroidId(match[1]);
// 		}
// 	}, []);

// 	const androidID = userAndroidIDStore(state => state.androidID);

// 	const handleQrcodevalue = (e) => setValue(e.target.value);
// 	const handleQrcodechange = (e) => {
// 		e.preventDefault();
// 		setQrvalue(true);
// 	};
// 	const handleChange = (e) => setUniqueNumber(e.target.value);

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const deviceDetails = userDeviceStore.getState().deviceDetails;
// 		const { setIsRegistered } = userDeviceStore.getState();

// 		if (deviceDetails && uniqueNumber === deviceDetails.username) {
// 			toast.success("Registration successful");
// 			setIsRegistered(true);
// 			navigate('/');
// 		} else {
// 			toast.error("Invalid username");
// 		}
// 	};

// 	// ✅ Safe Device ID fetch on mount
// 	useEffect(() => {
// 		getDeviceUID().then((id) => setDeviceId(id));
// 	}, []);

// 	return (
// 		<div>
// 			<div className="container">
// 				<div className='contents-container'>
// 					<img src="./applogo.jpeg" alt="IQ World Logo" className="logo" />
// 					<p className="tagline">INDIA KA IQ</p>
// 					<div className='head'>
// 						<h2>New Device Registration</h2>
// 					</div>

// 					{qrValue ? <Qrcode value={value} /> : null}

// 					<div className="form-group">
// 						<label htmlFor="unique-number">Unique Number</label>
// 						<input type="text" id="unique-number" onChange={handleChange} />
// 					</div>
// 					<div className='button-container'>
// 						<button className="submit-btn" id='submit-button' onClick={handleSubmit}>Submit</button>
// 						<p>{deviceId}</p> {/* ✅ Shows serial → duid → randomUUID */} 
// 					</div>
// 				</div>
// 				<div className='version-container'>
// 					<p className="version">de568fcc560fca62 <br /> V-1.0</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }




// import React, { useEffect, useState } from 'react';
// import '../app.css';
// import Qrcode from './Qrcode';
// import userAndroidIDStore from '../store/userAndroididStore';
// import userDeviceStore from '../store/userDeviceStore';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// //  Get Serial Number
// function getSerialNumber() {
//   return new Promise((resolve) => {
//     try {
//       if (typeof window !== "undefined" && window.webOS?.service) {
//         window.webOS.service.request(
//           "luna://com.webos.service.tv.systemproperty",
//           {
//             method: "getSystemInfo",
//             parameters: { keys: ["serialNumber"] },
//             onSuccess: (res) => resolve(res.serialNumber || "Unavailable"),
//             onFailure: () => resolve("Error: Could not fetch Serial Number"),
//           }
//         );
//       } else {
//         resolve("Not running on webOS");
//       }
//     } catch (err) {
//       console.error("getSerialNumber error:", err);
//       resolve("Error fetching Serial Number");
//     }
//   });
// }

// //  Get WiFi MAC
// function getWifiMac() {
//   return new Promise((resolve) => {
//     try {
//       if (window.webOS?.service) {
//         window.webOS.service.request(
//           "luna://com.webos.service.wifi",
//           {
//             method: "getStatus",
//             parameters: {},
//             onSuccess: (res) => resolve(res.macAddress || "Not connected"),
//             onFailure: () => resolve("Error: Could not fetch Wi-Fi MAC"),
//           }
//         );
//       } else {
//         resolve("Not running on webOS");
//       }
//     } catch (err) {
//       console.error("getWifiMac error:", err);
//       resolve("Error fetching Wi-Fi MAC");
//     }
//   });
// }

// //  Get Ethernet MAC
// function getEthernetMac() {
//   return new Promise((resolve) => {
//     try {
//       if (window.webOS?.service) {
//         window.webOS.service.request(
//           "luna://com.webos.service.networkinput",
//           {
//             method: "getStatus",
//             parameters: { interface: "eth0" },
//             onSuccess: (res) => resolve((res.info && res.info.hwAddr) || "Not connected"),
//             onFailure: () => resolve("Error: Could not fetch Ethernet MAC"),
//           }
//         );
//       } else {
//         resolve("Not running on webOS");
//       }
//     } catch (err) {
//       console.error("getEthernetMac error:", err);
//       resolve("Error fetching Ethernet MAC");
//     }
//   });
// }

// //  App UID (persistent local ID)
// function getAppUID() {
//   let uid = localStorage.getItem("app_uid");
//   if (!uid) {
//     uid = crypto.randomUUID();
//     localStorage.setItem("app_uid", uid);
//   }
//   return uid;
// }

// export default function RegistrationPage() {
//   const [uniqueNumber, setUniqueNumber] = useState('');
//   const [qrValue, setQrvalue] = useState(true);
//   const androidid = 'de568fcc560faa62';
//   const [value, setValue] = useState(
//     ` https://ds.iqtv.in/#/iqworld/digitalsignage/device/registrationform/${androidid}`
//   );

//   const [serialNumber, setSerialNumber] = useState('');
//   const [wifiMac, setWifiMac] = useState('');
//   const [ethernetMac, setEthernetMac] = useState('');
//   const [appUid, setAppUid] = useState('');

//   const { setAndroidId } = userAndroidIDStore();
//   const navigate = useNavigate();

//   // Extract androidId from URL
//   useEffect(() => {
//     const url = window.location.href;
//     const match = url.match(/registrationform\/([^/]+)/);
//     if (match && match[1]) {
//       setAndroidId(match[1]);
//     }
//   }, [setAndroidId]);

//   const handleChange = (e) => setUniqueNumber(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const deviceDetails = userDeviceStore.getState().deviceDetails;
//     const { setIsRegistered } = userDeviceStore.getState();

//     if (deviceDetails && uniqueNumber === deviceDetails.username) {
//       toast.success("Registration successful");
//       setIsRegistered(true);
//       navigate('/');
//     } else {
//       toast.error("Invalid username");
//     }
//   };

//   //  Fetch Device IDs on mount
//   useEffect(() => {
//     getSerialNumber().then(setSerialNumber);
//     getWifiMac().then(setWifiMac);
//     getEthernetMac().then(setEthernetMac);
//     setAppUid(getAppUID());
//   }, []);

//   return (
//     <div>
//       <div className="container">
//         <div className='contents-container'>
//           <img src="./applogo.jpeg" alt="IQ World Logo" className="logo" />
//           <p className="tagline">INDIA KA IQ</p>
//           <div className='head'>
//             <h2>New Device Registration</h2>
//           </div>

//           {qrValue ? <Qrcode value={value} /> : null}

//           <div className="form-group">
//             <label htmlFor="unique-number">Unique Number</label>
//             <input type="text" id="unique-number" onChange={handleChange} />
//           </div>
//           <div className='button-container'>
//             <button className="submit-btn" id='submit-button' onClick={handleSubmit}>Submit</button>
//             {/*  Show all IDs */}
//             <p>Serial Number: {serialNumber}</p>
//             {/* <p>Wi-Fi MAC: {wifiMac}</p>
//             <p>Ethernet MAC: {ethernetMac}</p> */}
//             <p>App UID: {appUid}</p>
//           </div>
//         </div>
//         <div className='version-container'>
//           <p className="version">de568fcc560fca62 <br /> V-1.0</p>
//         </div>
//       </div>
//     </div>
//   );
// }
