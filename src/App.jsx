import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import SplashScreen from './components/VideoLoader';
import RegistrationPage from './components/RegistrationPage';
import RemoteControlHandler from './components/RemoteControlHandler';
import StreamingPage from './components/StreamingPage';
import initDeviceUID from './utils/initDeviceUID';

import useMediaStore from './store/useMediaStore';
import ApprovalPending from './components/ApprovalPendingPage';

// export const Home = () => {
// 	useDeviceDetails(); // starts polling device info
// 	return (
// 		<>
// 			<DeviceStatusPoller />
// 			<StreamingPage />
// 		</>
// 	);
// };

const App = () => {
	const [showSplash, setShowSplash] = useState(true);
	const [isDeviceOnline, setIsDeviceOnline] = useState(null); // null = loading

	const mediaFiles = useMediaStore((state) => state.mediaFiles);

	// userDeviceDetails()

	// useEffect(() => {
	// 	const checkOnlineStatus = async () => {
	// 		const result = await checkDeviceOnline();
	// 		setIsDeviceOnline(result);
	// 	};

	// 	checkOnlineStatus();

	// 	const interval = setInterval(checkOnlineStatus, 5000); // every 1 sec
	// 	return () => clearInterval(interval);
	// }, []);

	useEffect(() => {
		const fetchUID = async () => {
			const uid = await initDeviceUID();
			console.log('Device UID initialized:', uid);
		};
		fetchUID();
	}, []);
	useEffect(() => {
		if (mediaFiles.length > 0) {
			downloadMediaFilesOnce(mediaFiles);
		}
	}, [mediaFiles]);

	return (
		<>
			<RemoteControlHandler />
			<Router>
				{/* <DeviceStatusPoller /> */}

				{/* SplashScreen shows immediately, regardless of online status */}
				{showSplash ? (
					<SplashScreen onComplete={() => setShowSplash(false)} />
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<RegistrationPage />} />
						<Route path="/streaming" element={<SplashScreen />} />
						<Route path='/streamingpage' element={<StreamingPage />} />
						<Route path='/approval-pending' element={<ApprovalPending/>} />
					</Routes>
				)}
			</Router>
		</>
	);
};

export default App;
