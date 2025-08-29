import { useEffect, useState } from 'react';
import useAppUrlStore from '../store/useAppUrlStore';
import userDeviceStore from "../store/userDeviceStore"; //  device details store

const SignInAPI = () => {

  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
	const appUrl = useAppUrlStore((state) => state.appUrl);
  const deviceDetails = userDeviceStore.getState().deviceDetails;
  const userName = deviceDetails.username;
  const Password = deviceDetails.password;
  

  const BASE_URL = 'https://ds.iqtv.in:8080/iqworld';
  // const TEST_URL = 'https://ds.iqtv.in:8080';

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch(`${appUrl}api/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userName,   // Replace with actual username for testing : admin  
            password: Password    // Replace with actual password : admin@123
          }),
        });

        const data = await response.json();
        // console.log('=== Sign In API Response ===');
        // console.log(JSON.stringify(data, null, 2));
        
      } catch (err) {
        console.error('Sign In API Error:', err);
      }
    };

    login();
  }, []);

  return null; // This component doesn't render UI, only calls the API
};

export default SignInAPI;
