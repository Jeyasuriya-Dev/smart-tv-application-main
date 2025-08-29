// src/context/DeviceStatusPollerContext.jsx
import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import userdeviceUIDStore from '../store/usedeviceIDStore';
import userDeviceStore from '../store/userDeviceStore';

const DeviceStatusContext = createContext(true);

export const useDeviceStatus = () => useContext(DeviceStatusContext);

export const DeviceStatusProvider = ({ children }) => {
	const [isOnline, setIsOnline] = useState(true);

	const deviceUID = userdeviceUIDStore((state) => state.deviceUID);

	const deviceDetails = userDeviceStore.getState().deviceDetails; //  device info

	const checkDeviceOnline = async () => {
		try {
			const res = await axios.get(import.meta.env.VITE_DEVICEONLINE_CHECK_URL, {
				params: {
					adrid: deviceUID,
					clientname: deviceDetails.clientusername,
				},
				timeout: 3000,
			});
			setIsOnline(res.status === 200);
		} catch {
			setIsOnline(false);
		}
	};

	useEffect(() => {
		checkDeviceOnline(); // First check
		const interval = setInterval(checkDeviceOnline, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<DeviceStatusContext.Provider value={isOnline}>
			{children}
		</DeviceStatusContext.Provider>
	);
};
