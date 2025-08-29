// // src/utils/initDeviceUID.js
// import userdeviceUIDStore from "../store/usedeviceIDStore";


// const initDeviceUID = async () => {
//   const { deviceUID, setDeviceUID } = userdeviceUIDStore.getState();

//   if (deviceUID) return deviceUID; // already exists

//   // generate new UID
//   let uid;
//   if (window.webOS && window.webOS.deviceInfo) {
//     uid = await new Promise((resolve) => {
//       window.webOS.deviceInfo((info) => {
//         if (info?.duid) resolve(info.duid);
//         else if (info?.serialNumber) resolve(info.serialNumber);
//         else resolve(crypto.randomUUID());
//       });
//     });
//   } else {
//     uid = localStorage.getItem('fallback_duid') || crypto.randomUUID();
//     localStorage.setItem('fallback_duid', uid);
//   }

//   setDeviceUID(uid);
//   return uid;
// };


// export default initDeviceUID;
// src/utils/initDeviceUID.js
import userdeviceUIDStore from "../store/usedeviceIDStore";

const initDeviceUID = async () => {
  const { deviceUID, setDeviceUID } = userdeviceUIDStore.getState();

  if (deviceUID) return deviceUID; // already exists in Zustand

  let uid;

  if (typeof window !== "undefined" && window.PalmServiceBridge) {
    uid = await new Promise((resolve) => {
      try {
        const bridge = new window.PalmServiceBridge();
        const url = "luna://com.webos.service.tv.systemproperty/getSystemInfo";
        const params = JSON.stringify({
          keys: ["serialNumber", "modelName", "firmwareVersion", "deviceId"],
        });

        bridge.onservicecallback = (msg) => {
          try {
            const res = JSON.parse(msg);
            if (res.returnValue && res.serialNumber) {
              console.log(" Got Serial via PalmServiceBridge:", res.serialNumber);
              resolve(res.serialNumber);
            } else {
              console.warn(" Serial not found, using deviceId or fallback");
              resolve(res.deviceId || crypto.randomUUID());
            }
          } catch (err) {
            console.error(" Error parsing response", err);
            resolve(crypto.randomUUID());
          }
        };

        bridge.call(url, params);
      } catch (err) {
        console.error(" PalmServiceBridge failed:", err);
        resolve(crypto.randomUUID());
      }
    });
  } else {
    // fallback for non-webOS browsers/dev
    uid = localStorage.getItem("fallback_duid") || crypto.randomUUID();
    localStorage.setItem("fallback_duid", uid);
  }

  //  Store it in Zustand
  setDeviceUID(uid);

  return uid;
};

export default initDeviceUID;
