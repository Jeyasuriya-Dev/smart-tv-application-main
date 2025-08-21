// src/utils/initDeviceUID.js
import userdeviceUIDStore from "../store/usedeviceIDStore";


const initDeviceUID = async () => {
  const { deviceUID, setDeviceUID } = userdeviceUIDStore.getState();

  if (deviceUID) return deviceUID; // already exists

  // generate new UID
  let uid;
  if (window.webOS && window.webOS.deviceInfo) {
    uid = await new Promise((resolve) => {
      window.webOS.deviceInfo((info) => {
        if (info?.duid) resolve(info.duid);
        else if (info?.serialNumber) resolve(info.serialNumber);
        else resolve(crypto.randomUUID());
      });
    });
  } else {
    uid = localStorage.getItem('fallback_duid') || crypto.randomUUID();
    localStorage.setItem('fallback_duid', uid);
  }

  setDeviceUID(uid);
  return uid;
};


export default initDeviceUID;