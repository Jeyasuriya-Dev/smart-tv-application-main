// src/API-Handling/useOnlineStatusCheck.jsx
// Needs AndroidID and Clientname
// src/API-Handling/useOnlineStatusCheck.jsx

import axios from 'axios';
import userdeviceUIDStore from '../store/usedeviceIDStore';
import userDeviceStore from "../store/userDeviceStore"; //  device details store

const CHECK_URL = 'https://ds.iqtv.in:8080/iqworld/api/v1/device/checkonline';

//  Make this a function that gets state when called
const checkDeviceOnline = async () => {
	try {
		// Zustand state must be accessed inside the function
		const deviceUID = userdeviceUIDStore.getState().deviceUID;  
		const deviceDetails = userDeviceStore.getState().deviceDetails; 
		const clientusername = deviceDetails?.clientusername;
		console.log(clientusername)

		if (!deviceUID || !clientusername) {
			console.warn("Device UID or clientusername missing.");
			return false;
		}

		const res = await axios.get(CHECK_URL, {
			params: {
				adrid: deviceUID,
				clientname: clientusername
			}
		});

		return res.status === 200;
	} catch (err) {
		console.warn('Device is offline or API unreachable.', err);
		return false;
	}
};

export default checkDeviceOnline;
