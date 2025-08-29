// src/hooks/useDownloadOnce.js
import useMediaStore from '../store/useMediaStore';
import { downloadFile } from '../utils/fileDownloader';
import axios from 'axios';
import useAppUrlStore from '../store/useAppUrlStore';
import userdeviceUIDStore from '../store/usedeviceIDStore';
import userDeviceStore from "../store/userDeviceStore"; //  device details store

const useDownloadOnce = () => {
	const setMediaFiles = useMediaStore((state) => state.setMediaFiles);
	const downloadedFlagKey = 'media_downloaded_once_v1';
	const appUrl = useAppUrlStore((state) => state.appUrl);

	const deviceDetails = userDeviceStore.getState().deviceDetails; //  device info

	const deviceUID = userdeviceUIDStore.getState().deviceUID;

	const downloadOnce = async () => {
		if (localStorage.getItem(downloadedFlagKey) === 'true') {
			// console.log(' Media already downloaded.');
			return;
		}

		try {
			const response = await axios.get(`${appUrl}api/v1/playlist/mediafilebyclientforsplit`, {
				params: {
					clientname: deviceDetails.clientusername,
					state_id: deviceDetails.state_id,
					city_id: deviceDetails.city_id,
					androidid: deviceUID,   // device ID is usually device’s androidid
					deviceid: deviceDetails.password,    // password holds deviceId (IQW0000014 here)
					vertical: deviceDetails.orientation === "9:16" ? true : false
				},
			});

			const playlist = response.data;
			setMediaFiles(playlist);

			for (const layout of playlist.layout_list) {
				for (const zone of layout.zonelist) {
					for (const media of zone.media_list) {
						const url = media.Url || media.url;
						const fileName = url?.split('/').pop();
						if (url && fileName) {
							await downloadFile(url, fileName);
							console.log("called downloadfile!...")
						}
					}
				}
			}

			localStorage.setItem(downloadedFlagKey, 'true');
			console.log(' Media downloaded successfully.');
		} catch (err) {
			console.error(' Failed to download media:', err);
		}
	};

	return downloadOnce;
};

export default useDownloadOnce;
