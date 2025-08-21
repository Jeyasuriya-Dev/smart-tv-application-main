import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import userDeviceStore from '../store/userDeviceStore';
import useAppUrlStore from '../store/useAppUrlStore';


const useDeviceDetails = (shouldStart) => {
	const [deviceDetails, setDeviceDetails] = useState(null);
	const navigate = useNavigate();
	const Device_id = 'ABCDEFGHIJ'; // 0461dbdd0ce43fd2  a7b235567dbd7528   ABCDEFGHIJ 
	// const BASE_URL = 'https://ds.iqtv.in:8080/iqworld';
	const appUrl = useAppUrlStore((state) => state.appUrl);
	// const APPLICATION_URL = import.meta.env.VITE_SERVER_APPLICATION_URL;


	const storeDeviceDetails = userDeviceStore.getState().setDeviceDetails;
	const setIsRegistered = userDeviceStore.getState().setIsRegistered;

	const showdeviceDetails = userDeviceStore((state) => state.deviceDetails); //Show Function User Device Details From Store 


	//Console.log User Device details  
	useEffect(() => {
		if (showdeviceDetails) {
			console.log(showdeviceDetails.clientname)
		}
	}, [showdeviceDetails]);


	useEffect(() => {

		const fetchData = async () => {
			try {
				const res = await axios.get(`${appUrl}api/v1/none-auth/device/isexist?android_id=${Device_id}`);
				var data = res.data;



				console.log('=== Device API Response ===');
				console.log(JSON.stringify(data, null, 2));
				// console.log(BASE_URL)

				setDeviceDetails(data);

				//Store Device Details 
				storeDeviceDetails(data)

				//Device Exist Checking Function For the user Input



				if (data.status === 'success' && data.client_status && data.device_status) {
					toast.success(' Device verified successfully!', { autoClose: 1500 });
					setIsRegistered(true);
				} else {
					toast.error(' Device not registered! Redirecting...', { autoClose: 1500 });
					setIsRegistered(false);

					//IF Device is Not Registered It will redirect Registration page with in 2sec
					// setTimeout(() => {
					// 	navigate('/register');
					// }, 2000);
				}
			} catch (err) {
				console.error(err);
				toast.error('API Error: ' + err.message);
				setIsRegistered(false);
			}
		};

		// Call immediately
		fetchData();

		// Poll every 20 seconds
		const interval = setInterval(fetchData, 1000000);

		return () => clearInterval(interval); // Cleanup when component unmounts
	}, [shouldStart]);







	return deviceDetails;
};



export default useDeviceDetails;
