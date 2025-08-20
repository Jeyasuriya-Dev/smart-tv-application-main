import useMediaStore from '../store/useMediaStore';
import axios from 'axios';
import { downloadFile } from '../utils/fileDownloader';

const extractMediaUrlsWithDuration = (playlist) => {
  const mediaItems = [];
  playlist?.layout_list?.forEach((layout) => {
    layout.zonelist?.forEach((zone) => {
      zone.media_list?.forEach((media) => {
        const url = media.Url || media.url;
        const duration = media.Duration || 5; // default to 5 seconds if not provided
        if (url) mediaItems.push({ url, duration: Number(duration) });
      });
    });
  });
  return mediaItems;
};


const fetchAndDownloadMedia = async () => {
	const { setMediaFiles, setUpdatedTime, updatedTime, setMediaUrls } = useMediaStore.getState();

	// const parameters = {
	// 	clientname: 'vijiqc', // ridsysc dfgdf
	// 	state_id: 2, // 2 2
	// 	city_id: 65, // 65  300
	// 	androidid: '0461dbdd0ce43fd2', // 0461dbdd0ce43fd2  ABCDEFGHIJ
	// 	deviceid: 'IQW0000021', // IQW0000014  IQW0000061
	// 	vertical: true // true  true
	// }

	try {
		const response = await axios.get('https://ds.iqtv.in:8080/iqworld/api/v1/playlist/mediafilebyclientforsplit', {
			params: {
				clientname: 'vijiqc', // ridsysc dfgdf
				state_id: 2, // 2 2
				city_id: 65, // 65  300
				androidid: '0461dbdd0ce43fd2', // 0461dbdd0ce43fd2  ABCDEFGHIJ
				deviceid: 'IQW0000021', // IQW0000014  IQW0000061
				vertical: true		 // true  true
			}
		});

		const playlist = response.data;
		const currentUpdatedTime = playlist.updated_time;

		console.log('=== Media API Response ===');
		console.log(JSON.stringify(playlist, null, 2));

		// Extract URLs with duration
    const mediaItems = extractMediaUrlsWithDuration(playlist);


		if (updatedTime && updatedTime === currentUpdatedTime) {
			setMediaFiles(playlist);
			setMediaUrls(mediaItems); // store both URL and duration
			return false;
		} else {
			setUpdatedTime(currentUpdatedTime);
			setMediaFiles(playlist);
			setMediaUrls(mediaItems);// store both URL and duration
		}

		return true;
	} catch (err) {
		console.error(' Error fetching media:', err);
		return false;
	}
};

export default fetchAndDownloadMedia;
