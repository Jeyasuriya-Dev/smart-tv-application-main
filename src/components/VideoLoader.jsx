// import React, { useEffect, useRef, useState } from 'react';
// import useServerPoll from '../API-Handling/useServerPoll';
// import userDeviceDetails from '../API-Handling/userDeviceDetails';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import SignInAPI from '../API-Handling/SignInAPI';
// import useAppUrlStore from '../store/useAppUrlStore';
// import RegistrationPage from './RegistrationPage';
// import userDeviceStore from '../store/userDeviceStore';
// import StreamingPage from './StreamingPage';
// import { Home } from '../App';
// // import {Home} from './Home';



// const SplashScreen = ({ onComplete }) => {

// 	const videoRef = useRef();
// 	const [videoSrc, setVideoSrc] = useState('');
// 	// const [hasHandled, setHasHandled] = useState(false);
// 	const [videoEndState, SetVideoEndState] = useState(false);  // This is for Video End State Get 
// 	const [serverStatus, setServerStatus] = useState('streaming'); // waiting | maintenance | streaming | error 

// 	const [startDeviceCheck, setStartDeviceCheck] = useState(false);
// 	const deviceDetails = userDeviceDetails(startDeviceCheck);

// 	const [appurl, setAppurl] = useState(null); //Application url State

// 	const navigate = useNavigate();

// 	const setAppUrl = useAppUrlStore.getState().setAppUrl;  // Store Application_URL into Store

// 	const appUrl = useAppUrlStore((state) => state.appUrl);  //Get application_url from Store

// 	const isRegistered = userDeviceStore((state) => state.isRegistered);



// 	const handleServerResponse = (data) => {


// 		console.log('=== Server API Response ===');
// 		console.log(JSON.stringify(data, null, 2));
// 		// console.log(data.application_url);


// 		// IF the URL exist It will STore
// 		if (data.application_url) {
// 			setAppUrl(data.application_url);
// 		}


// 		if (data && data.isactive !== undefined) {

// 			// get application url from server details and set application url into state
// 			if (data.application_url) {
// 				setAppurl(data.application_url)
// 				console.log("App URL received: ", data.application_url);

// 			}


// 			if (data.isactive) {
// 				if (serverStatus !== 'streaming') {
// 					console.log('Switching to streaming mode');
// 					setServerStatus('streaming');
// 					setStartDeviceCheck(true); // Trigger device API

// 					// onComplete(); // Proceed to next UI / start streaming (optional)
// 					// setTimeout(() => {
// 					// 	navigate('/register') //Redirect into Login Page
// 					// }, 2000);
// 				}
// 			} else {
// 				if (serverStatus !== 'waiting') {
// 					console.log('Switching to waiting mode');
// 					if (data.isactive) {
// 						setServerStatus('streaming')
// 					}
// 					setServerStatus('waiting');
// 				}
// 			}

// 			// Loop continues in both cases
// 		} else {
// 			if (serverStatus == 'error') {
// 				console.log('Switching to error mode');
// 				setServerStatus('error');
// 				//  Stop streaming here if needed

// 				setStartDeviceCheck(false); // once the streaming will end or Face any Error 
// 			}
// 		}
// 	};


// 	// Redirect after video ends
// 	useEffect(() => {
// 		if (!videoEndState) return;

// 		if (serverStatus === 'streaming') {
// 			if (isRegistered) {
// 				console.log('Device registered → redirect to streaming page');
// 				navigate('/streamingpage');
// 			} else {
// 				console.log('Device not registered → redirect to registration page');
// 				navigate('/register');
// 			}
// 		}
// 	}, [videoEndState, serverStatus, isRegistered, navigate]);


// 	// lOG the application URL from the Store
// 	useEffect(() => {
// 		console.log('Fetched Global App URL:', appUrl);
// 	}, [appUrl]);

// 	// Api polling starts After video ends
// 	useServerPoll(videoEndState && serverStatus !== 'error', handleServerResponse, appurl);
// 	SignInAPI(); // Sign IN api function call 
// 	// MediaFetcher(); //call the media fetch api

// 	// Video Load Located for the Device Orientation
// 	useEffect(() => {
// 		const { innerWidth, innerHeight } = window;


// 		if (innerWidth > innerHeight) {
// 			setVideoSrc('assets/launch-landscape.mp4');
// 		} else {
// 			setVideoSrc('assets/launch-portrait.mp4');

// 		}
// 	}, []);

// 	useEffect(() => {
// 		if (videoEndState && serverStatus === 'streaming') {
// 			console.log('Redirecting to /register');
// 		}
// 	}, [videoEndState, serverStatus]);



// 	// This Hook for load the video when the Application Launch  
// 	useEffect(() => {
// 		if (!videoSrc) return; // Wait until videoSrc is ready

// 		const video = videoRef.current;
// 		const handleEnded = () => {
// 			console.log('Video ended');
// 			console.log("Width :" + innerWidth + " Height :" + innerHeight)     //Print The device Width And Height When video end 

// 			SetVideoEndState(true) //maintain the Video End State set State True

// 			// onComplete();
// 		};


// 		video.addEventListener('ended', handleEnded);

// 		return () => {
// 			video.removeEventListener('ended', handleEnded);
// 		};
// 	}, [videoSrc]);



// 	// useEffect(() => {
// 	// 	if (serverStatus === 'streaming' && isRegistered) {
// 	// 		console.log(' Redirecting to / (streaming UI)');
// 	// 		navigate('/streamingpage');
// 	// 	}
// 	// }, [serverStatus, isRegistered]);


// 	if (!videoSrc) return null; // Wait until video is selected

// 	return (
// 		<>
// 			{videoEndState ? (
// 				<>
// 					<div style={styles.overlay}>Loading...</div>
// 					{/* 

// 					{isRegistered ? (
// 						<>
// 							<StreamingPage />
// 						</> // Empty, since redirect happens in useEffect
// 					) : (
// 						<>
// 							<RegistrationPage />
// 							<ToastContainer />
// 						</>
// 					)} */}
// 					{/* {serverStatus === 'maintenance' && (
// 						<>
// 							<div style={styles.overlay}>Server Under Maintenance 🚧</div>
// 							<ToastContainer />
// 						</>
// 					)}

// 					{serverStatus === 'waiting' && (
// 						<>
// 							<ToastContainer />
// 							<div style={styles.overlay}>Waiting for Streaming...</div>
// 						</>
// 					)}

// 					{serverStatus === 'streaming' && (
// 						<>

// 						</>
// 					)}


// 					{serverStatus === 'error' && (<>

// 						<div style={styles.overlay}>❌ Error in server response</div>
// 						<ToastContainer />
// 					</>
// 					)} */}
// 				</>
// 			) : (
// 				<video
// 					ref={videoRef}
// 					src={videoSrc}
// 					autoPlay
// 					muted
// 					playsInline
// 					style={{
// 						width: '100%',
// 						height: '100%',
// 						objectFit: 'cover',
// 						position: 'fixed',
// 						top: 0,
// 						left: 0,
// 						zIndex: 9999,
// 					}}
// 				/>
// 			)}

// 		</>
// 	);
// };


// const styles = {
// 	overlay: {
// 		width: '100%',
// 		height: '100%',
// 		background: 'black',
// 		color: 'white',
// 		fontSize: '32px',
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		position: 'fixed',
// 		top: 0,
// 		left: 0,
// 		zIndex: 9999,
// 		flexDirection: 'column'
// 	}
// };


// export default SplashScreen;



import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useServerPoll from '../API-Handling/useServerPoll';
import SignInAPI from '../API-Handling/SignInAPI';
import useAppUrlStore from '../store/useAppUrlStore';
import userDeviceStore from '../store/userDeviceStore';
import userDeviceDetails from '../API-Handling/userDeviceDetails';
import StreamingPage from './StreamingPage';
import RegistrationPage from './RegistrationPage';
import { ToastContainer } from 'react-toastify';
import initDeviceUID from '../utils/initDeviceUID';
import { toast } from "react-toastify";
import ApprovalPendingPage from "./ApprovalPendingPage";

const SplashScreen = () => {
	const navigate = useNavigate();
	const videoRef = useRef();

	const setAppUrl = useAppUrlStore.getState().setAppUrl;
	const appUrl = useAppUrlStore((state) => state.appUrl);
	const isRegistered = userDeviceStore((state) => state.isRegistered);
	// const isRegistered = false;

	const [videoSrc, setVideoSrc] = useState('');
	const [videoEnded, setVideoEnded] = useState(false);
	const [serverStatus, setServerStatus] = useState('streaming'); // streaming | waiting | error
	const [startDeviceCheck, setStartDeviceCheck] = useState(false);
	const [online, setOnline] = useState(true)

	const [ToastMessage, setToastMessage] = useState(true)
	const approvalPending = userDeviceStore((state) => state.approvalPending);

	const isExpired = userDeviceStore((state) => state.isExpired);


	// Zustand store states
	// const { isRegistered, approvalPending, isExpired } = userDeviceStore((state) => ({
	// 	isRegistered: state.isRegistered,
	// 	approvalPending: state.approvalPending,
	// 	isExpired: state.isExpired,
	// }));


	const deviceDetails = userDeviceDetails(startDeviceCheck);
	//   console.log(isRegistered)

	const handleServerResponse = (data) => {

		// console.log('=== Server API Response ===');
		// console.log(JSON.stringify(data, null, 2));
		// console.log(data.application_url)

		if (data.application_url) {
			setAppUrl(data.application_url);
		}

		if (data.isactive !== undefined) {
			setServerStatus(data.isactive ? 'streaming' : 'waiting');
			if (data.isactive) setStartDeviceCheck(true);
		} else {
			setServerStatus('error');
		}
	};
	useEffect(() => {
		if (!videoEnded) {
			document.body.style.backgroundColor = "#000000";
		}

	}, [])

	useServerPoll(videoEnded && serverStatus !== 'error', handleServerResponse, appUrl);
	// SignInAPI();

	// Determine video source based on device orientation
	useEffect(() => {
		const { innerWidth, innerHeight } = window;
		setVideoSrc(innerWidth > innerHeight ? 'assets/launch-landscape.mp4' : 'assets/launch-portrait.mp4');
		const fetchDeviceUID = async () => {
			const uid = await initDeviceUID(); // ensures store is set
			console.log("Device UID:", uid);
		};
		fetchDeviceUID();
	}, []);

	// Redirect after video ends
	useEffect(() => {
		if (!videoEnded || serverStatus !== 'streaming') return;

		if (isRegistered) {
			navigate('/streamingpage');
		} else {
			navigate('/register');
		}
	}, [videoEnded, serverStatus, isRegistered, navigate]);

	// Video ended event
	useEffect(() => {
		if (!videoSrc) return;
		const video = videoRef.current;

		const handleEnded = () => {
			setVideoEnded(true);

		};

		video.addEventListener('ended', handleEnded);
		return () => video.removeEventListener('ended', handleEnded);
	}, [videoSrc]);


	// Redirect after video ends
	// useEffect(() => {
	// 	if (!videoEnded || serverStatus !== 'streaming') return;

	// 	if (approvalPending) {
	// 		toast.warning("Customer plan expired. Redirecting to Approval Pending page...", {
	// 			position: "top-right",
	// 			autoClose: 3000,
	// 		});
	// 		navigate('/approval-pending');
	// 	} else if (isRegistered) {
	// 		toast.success("Device verified successfully! Redirecting to Streaming...", {
	// 			position: "top-right",
	// 			autoClose: 2000,
	// 		});
	// 		navigate('/streamingpage');
	// 	} else {
	// 		toast.error("Device not registered. Redirecting to Registration...", {
	// 			position: "top-right",
	// 			autoClose: 2000,
	// 		});
	// 		navigate('/register');
	// 	}
	// }, [videoEnded, serverStatus, approvalPending, navigate]);



	//  Redirect after splash video ends
	// useEffect(() => {
	// 	if (!videoEnded || serverStatus !== 'streaming') return;

	// 	// Case 1: Already registered and approved → Streaming
	// 	if (isRegistered && !approvalPending) {
	// 		toast.success("Device verified successfully! Redirecting to Streaming...", {
	// 			autoClose: 2000,
	// 		});
	// 		navigate("/streamingpage");
	// 		return;
	// 	}

	// 	// Case 2: Not registered yet → Registration first
	// 	if (!isRegistered) {
	// 		if (approvalPending) {
	// 			toast.info("Device LogOut. Redirecting to Registration...", {
	// 				autoClose: 2000,
	// 			});
	// 			console.log('Device LogOut. Redirecting to Registration...')
	// 			return;
	// 		}
	// 		toast.info("Device not registered. Redirecting to Registration...", {
	// 			autoClose: 2000,
	// 		});
	// 		navigate("/register");
	// 		return;
	// 	}

	// 	// Case 3: Registered but waiting for approval / expired plan
	// 	if (approvalPending) {
	// 		toast.warning("Approval pending. Please wait for admin approval...", {
	// 			autoClose: 6000,
	// 		});
	// 		navigate("/approval-pending");
	// 		return;
	// 	}
	// }, [videoEnded, serverStatus, isRegistered, approvalPending, navigate]);

	//  Toast handling (triggered after video ends)
	useEffect(() => {
		if (!videoEnded) return;

		if (isExpired) {
			toast.error("Your plan has expired. Please renew to continue.", {
				autoClose: 3000,
			});
			return;
		}

		if (isRegistered && !approvalPending) {
			toast.success("Device verified successfully! Redirecting to Streaming...", {
				autoClose: 2000,
			});
		}

		if (!isRegistered) {
			toast.info("Device not registered. Redirecting to Registration...", {
				autoClose: 2000,
			});
		}

		if (approvalPending && !isExpired) {
			toast.warning("Approval pending. Please wait for admin approval...", {
				autoClose: 4000,
			});
		}
	}, [videoEnded, isRegistered, approvalPending, isExpired]);



	useEffect(() => {
		if (!videoEnded) {
			setToastMessage(false)
		}

	}, [videoEnded])

	if (!videoSrc) return null;

	// LogOut Works UI

	// return (
	// 	<>{videoEnded ? (
	// 		<>
	// 			{isRegistered ? (

	// 				<>
	// 					<StreamingPage />


	// 				</>
	// 			) : (
	// 				<>
	// 					{/* <div style={styles.overlay}>Failed...</div> */}
	// 					<RegistrationPage />

	// 				</>
	// 			)}
	// 		</>
	// 	) : (
	// 		<video
	// 			ref={videoRef}
	// 			src={videoSrc}
	// 			autoPlay
	// 			playsInline
	// 			style={{
	// 				width: '100%',
	// 				height: '100%',
	// 				objectFit: 'cover',
	// 				position: 'fixed',
	// 				top: 0,
	// 				left: 0,
	// 				zIndex: 10000,
	// 				background: "#000000"
	// 			}}
	// 		/>
	// 	)}
	// 		<ToastContainer />

	// 	</>
	// );

	return (
		<>
			{videoEnded ? (
				<>
					{isRegistered ? (
						approvalPending ? (
							<ApprovalPendingPage />
						) : (
							<StreamingPage />
						)
					) : (
						<RegistrationPage />
					)}
				</>
			) : (
				<video
					ref={videoRef}
					src={videoSrc}
					autoPlay
					playsInline
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						position: "fixed",
						top: 0,
						left: 0,
						zIndex: 10000,
						background: "#000",
					}}
				/>
			)}
			<ToastContainer />
		</>
	);

};



const styles = {
	overlay: {
		width: '100%',
		height: '100%',
		background: 'black',
		color: 'white',
		fontSize: '32px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'fixed',
		top: 0,
		left: 0,
		zIndex: 9999,
		flexDirection: 'column'
	}
};


export default SplashScreen;
