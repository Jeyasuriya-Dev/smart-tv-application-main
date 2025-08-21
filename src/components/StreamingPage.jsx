// import React, { useEffect, useState } from 'react';
// import useMediaStore from '../store/useMediaStore';
// import useDownloadOnce from '../hooks/useDownloadOnce';
// import { useDeviceStatus } from '../context/DeviceStatusPollerContext';
// import fetchAndDownloadMedia from '../API-Handling/usePlaylistFetch';
// import ReactPlayer from 'react-player';
// import Spinner from 'react-bootstrap/Spinner';

// const FOLDER_NAME = 'IQMediaFiles';

// const isVideo = (f) => /\.(mp4|webm|ogg)$/i.test(f) || /^(mp4|webm|ogg)$/i.test(f);
// const isImage = (f) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f) || /^(jpg|jpeg|png|gif|bmp|webp)$/i.test(f);



// //when the user Offline Get the Local URl
// const getLocalPath = (filename) => {
// 	if (window.webOS) return `file:///media/developer/${FOLDER_NAME}/${filename}`;
// 	if (window.tizen) return `/opt/usr/home/owner/Downloads/${FOLDER_NAME}/${filename}`;
// 	return `/downloads/${FOLDER_NAME}/${filename}`; // fallback
// };

// const StreamingPage = () => {
// 	const isOnline = useDeviceStatus();
// 	const downloadOnce = useDownloadOnce();
// 	const [index, setIndex] = useState(0);
// 	const mediaUrls = useMediaStore((state) => state.mediaUrls);

// 	useEffect(() => {
// 		const fetchAndUpdateMedia = async () => {
// 			if (isOnline) {
// 				await fetchAndDownloadMedia();
// 				await downloadOnce();
// 			} else {
// 				const cached = JSON.parse(localStorage.getItem('downloadedMediaFiles_IQMediaFiles') || '[]');
// 				const offlineList = cached.map((filename) => getLocalPath(filename));
// 				useMediaStore.getState().setMediaUrls(offlineList);
// 			}
// 		};

// 		fetchAndUpdateMedia();
// 		const interval = setInterval(fetchAndUpdateMedia, 3000); // fetch every sec
// 		return () => clearInterval(interval);
// 	}, [isOnline]);

// 	useEffect(() => {
// 		if (!mediaUrls.length) return;

// 		const currentUrl = mediaUrls[index];

// 		// Only run timer for images
// 		if (!isVideo(currentUrl)) {
// 			const timer = setTimeout(() => {
// 				setIndex((i) => (i + 1) % mediaUrls.length);
// 			}, 5000);

// 			return () => clearTimeout(timer);
// 		}

// 		// For videos, do nothing here — rely entirely on onEnded
// 	}, [index, mediaUrls]);

// 	const handleVideoEnd = () => {
// 		setIndex((i) => (i + 1) % mediaUrls.length);
// 	};


// 	const currentUrl = mediaUrls[index];
// 	// const handleVideoEnd = () => setIndex((i) => (i + 1) % mediaUrls.length);

// 	return (
// 		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
// 			{isVideo(currentUrl) ? (
// 				<video
// 					src={currentUrl}
// 					autoPlay
// 					//   loop
// 					controls={false}
// 					muted
// 					onEnded={handleVideoEnd}
// 					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// 				/>
// 			) : (
// 				<img
// 					src={currentUrl}
// 					alt="media"
// 					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// 				/>
// 			)}
// 		</div>
// 	);
// };


// export default StreamingPage;

// ///yufgvbeoiauuuuuuufgbvhn




// import React, { useEffect, useState } from 'react';
// import useMediaStore from '../store/useMediaStore';
// import useDownloadOnce from '../hooks/useDownloadOnce';
// import { useDeviceStatus } from '../context/DeviceStatusPollerContext';
// import fetchAndDownloadMedia from '../API-Handling/usePlaylistFetch';
// import Spinner from 'react-bootstrap/Spinner';

// const FOLDER_NAME = 'IQMediaFiles';

// const isVideo = (f) => /\.(mp4|webm|ogg)$/i.test(f);
// const isImage = (f) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f);

// const getLocalPath = (filename) => {
// 	if (window.webOS) return `file:///media/developer/${FOLDER_NAME}/${filename}`;
// 	if (window.tizen) return `/opt/usr/home/owner/Downloads/${FOLDER_NAME}/${filename}`;
// 	return `/downloads/${FOLDER_NAME}/${filename}`;
// };

// const StreamingPage = () => {
// 	const isOnline = useDeviceStatus();
// 	const downloadOnce = useDownloadOnce();

// 	const [index, setIndex] = useState(0);
// 	const [loading, setLoading] = useState(true);
// 	const [hasLoadedOnce, setHasLoadedOnce] = useState(false); // track first load
// 	const mediaUrls = useMediaStore((state) => state.mediaUrls);

// 	// Fetch media list
// 	useEffect(() => {
// 		const fetchAndUpdateMedia = async () => {
// 			if (!hasLoadedOnce) setLoading(true);

// 			if (isOnline) {
// 				await fetchAndDownloadMedia();
// 				await downloadOnce();
// 			} else {
// 				const cached = JSON.parse(localStorage.getItem('downloadedMediaFiles_IQMediaFiles') || '[]');
// 				const offlineList = cached.map((filename) => getLocalPath(filename));
// 				useMediaStore.getState().setMediaUrls(offlineList);
// 			}
// 		};

// 		fetchAndUpdateMedia();
// 		const interval = setInterval(fetchAndUpdateMedia, 3000);
// 		return () => clearInterval(interval);
// 	}, [isOnline, hasLoadedOnce]);

// 	// Image timer
// 	useEffect(() => {
// 		if (!mediaUrls.length) return;

// 		const currentUrl = mediaUrls[index];
// 		if (!isVideo(currentUrl)) {
// 			const timer = setTimeout(() => {
// 				setIndex((i) => (i + 1) % mediaUrls.length);
// 			}, 5000);
// 			return () => clearTimeout(timer);
// 		}
// 	}, [index, mediaUrls]);

// 	const handleVideoEnd = () => setIndex((i) => (i + 1) % mediaUrls.length);

// 	// Once first media is ready
// 	const handleFirstMediaReady = () => {
// 		if (!hasLoadedOnce) {
// 			setLoading(false);
// 			setHasLoadedOnce(true);
// 		}
// 	};

// 	const currentUrl = mediaUrls[index];

// 	return (
// 		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000', position: 'relative' }}>
// 			{/* Spinner only before first media */}
// 			{loading && !hasLoadedOnce && (
// 				<div
// 					style={{
// 						position: 'absolute',
// 						top: 0,
// 						left: 0,
// 						width: '100%',
// 						height: '100%',
// 						background: 'rgba(0,0,0,0.6)',
// 						display: 'flex',
// 						alignItems: 'center',
// 						justifyContent: 'center',
// 						zIndex: 99999,
// 					}}
// 				>
// 					<h1 style={{ color: 'white', position: 'absolute', zIndex: 99999 }}>LOADING...</h1>
// 					<Spinner animation="border" variant="danger" />
// 				</div>
// 			)}

// 			{/* Media */}
// 			{isVideo(currentUrl) ? (
// 				<video
// 					key={currentUrl}
// 					src={currentUrl}
// 					autoPlay
// 					muted
// 					controls={false}
// 					onCanPlay={handleFirstMediaReady}
// 					onEnded={handleVideoEnd}
// 					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// 				/>
// 			) : (
// 				<img
// 					key={currentUrl}
// 					src={currentUrl}
// 					alt="media"
// 					onLoad={handleFirstMediaReady}
// 					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default StreamingPage;


import React, { useEffect, useState } from 'react';
import useMediaStore from '../store/useMediaStore';
import useDownloadOnce from '../hooks/useDownloadOnce';
import { useDeviceStatus } from '../context/DeviceStatusPollerContext';
import fetchAndDownloadMedia from '../API-Handling/usePlaylistFetch';
import Spinner from 'react-bootstrap/Spinner';
import OfflineScreen from './OfflineScreen'; //  separate import
// import ReactPlayer from "react-player/youtube";

const FOLDER_NAME = 'IQMediaFiles';

const isVideo = (f) => /\.(mp4|webm|ogg)$/i.test(f);
const isImage = (f) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f);
const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url);
const isPdf = (f) => /\.pdf$/i.test(f);


const extractYouTubeId = (url) => {
	const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
};



const getLocalPath = (filename) => {
	if (window.webOS) return `file:///media/developer/${FOLDER_NAME}/${filename}`;
	if (window.tizen) return `/opt/usr/home/owner/Downloads/${FOLDER_NAME}/${filename}`;
	return `/downloads/${FOLDER_NAME}/${filename}`;
};

const StreamingPage = () => {
	const isOnline = useDeviceStatus();
	const downloadOnce = useDownloadOnce();

	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
	const mediaUrls = useMediaStore((state) => state.mediaUrls);
	const mediaFiles = useMediaStore((state) => state.mediaFiles);
	const [currentUrl, setCurrentUrl] = useState('');
	const [imageEnded, setImageEnded] = useState(false);
	const [count, setCount] = useState(0)
	const [duration, setDuration] = useState(0)

	useEffect(() => {
		const fetchAndUpdateMedia = async () => {
			if (!hasLoadedOnce) setLoading(true);

			if (isOnline) {
				await fetchAndDownloadMedia();
				await downloadOnce();
			} else {
				const cached = JSON.parse(localStorage.getItem('downloadedMediaFiles_IQMediaFiles') || '[]');
				const offlineList = cached.map((filename) => getLocalPath(filename));
				useMediaStore.getState().setMediaUrls(offlineList);
			}
		};

		fetchAndUpdateMedia();
		const interval = setInterval(fetchAndUpdateMedia, 3000);
		return () => clearInterval(interval);
	}, [isOnline, hasLoadedOnce]);


	const handleYoutubeEnd = () => {
		console.log("YouTube video ended, skipping to next...");
		handleVideoEnd(); // reuse your existing logic for <video> end
	};


	useEffect(() => {
	}, [])

	// useEffect(() => {
	// 	if (!mediaFiles.length) return;

	// 	const currentFile = mediaFiles[index];

	// 	if (!isVideo(currentFile.Url) && !isYouTube(currentFile.Url)) {
	// 		const duration = currentFile?.Duration
	// 			? Number(currentFile.Duration) * 1000
	// 			: 5000;

	// 		const timer = setTimeout(() => {
	// 			setIndex((i) => (i + 1) % mediaFiles.length);
	// 		}, duration);

	// 		return () => clearTimeout(timer);
	// 	}
	// }, [index, mediaFiles]);


	const handleNextMedia = () => setIndex((i) => (i + 1) % mediaUrls.length);

	useEffect(() => {
		if (!mediaUrls.length) return;

		const currentMedia = mediaUrls[index];
		// if (!currentMedia) return;

		const url = currentMedia.url;
		setDuration(currentMedia.duration ? Number(currentMedia.duration) * 1000 : 5000);
		console.log(duration)

		setCurrentUrl(url);
		// setImageEnded(false); // reset each time media changes

		if (isVideo(url) || isYouTube(url)) {
			// Video will call handleNextMedia on its own via onEnded
			return;
		}



		// ✅ Skip PDFs safely here
		if (isPdf(url)) {
			console.log("Skipping PDF:", url);
			handleNextMedia();
			return;
		}

		// useEffect(() => {

		// 	if (!isImage(url)) return;

		// 	if (isImage(url)) {
		// 		console.log("Playing image at index:", index);

		// 		const interval = setInterval(() => {
		// 			console.log('interval' + index)
		// 			setImageEnded(true)
		// 		}, duration)

		// 		// return () => clearInterval(interval);
		// 		// Schedule next image after duration
		// 		// const timer = setTimeout(() => {
		// 		// 	setIndex((i) => (i + 1) % mediaUrls.length);
		// 		// 	console.log('interval' +index)
		// 		// }, 5000);

		// 		// Clean up old timer when index changes
		// 		// return () => clearTimeout(timer);
		// 	}


		// }, [])
	}, [index, mediaUrls]);

	// when image ends → move to next
	useEffect(() => {
		if (imageEnded) {
			handleNextMedia();
		}
	}, [imageEnded]);






	const handleVideoEnd = () => setIndex((i) => (i + 1) % mediaUrls.length);

	const handleFirstMediaReady = () => {
		if (!hasLoadedOnce) {
			setLoading(false);
			setHasLoadedOnce(true);
		}
	};

	// If offline, show OfflineScreen
	if (!isOnline) {
		return <OfflineScreen />;
	}

	return (
		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000', position: 'relative' }}>
			{loading && !hasLoadedOnce && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: 'rgba(0,0,0,0.6)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 99999,
					}}
				>
					<h1 style={{ color: 'white', position: 'absolute', zIndex: 99999 }}>LOADING...</h1>
					<Spinner animation="border" variant="danger" />
				</div>
			)}

			{isYouTube(currentUrl) ? (
				<iframe
					key={currentUrl}
					id={`ytplayer-${index}`}
					src={`https://www.youtube.com/embed/${extractYouTubeId(currentUrl)}?autoplay=1&controls=0&mute=1&enablejsapi=1`}
					frameBorder="0"
					allow="autoplay; fullscreen"
					allowFullScreen
					style={{ width: '100%', height: '100%' }}
					onLoad={() => {
						handleFirstMediaReady();
						const player = new window.YT.Player(`ytplayer-${index}`, {
							events: {
								onStateChange: (event) => {
									if (event.data === window.YT.PlayerState.ENDED) {
										handleVideoEnd();
									}
								},
							},
						});
					}}
				/>
			) : isVideo(currentUrl) ? (
				<video
					key={currentUrl}
					src={currentUrl}
					autoPlay
					controls={false}
					onCanPlay={handleFirstMediaReady}
					onEnded={handleVideoEnd}
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				/>
			) : (
				<img
					key={currentUrl}
					src={currentUrl}
					alt="media"
					onLoad={() => {
						handleFirstMediaReady();
						// simulate "onEnded" for image
						setTimeout(() => {
							handleVideoEnd();
						}, duration); // use API-provided duration
					}}
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				/>
			)}
		</div>
	);

};

export default StreamingPage;



// import React, { useEffect, useState } from 'react';
// import useMediaStore from '../store/useMediaStore';
// import useDownloadOnce from '../hooks/useDownloadOnce';
// import { useDeviceStatus } from '../context/DeviceStatusPollerContext';
// import fetchAndDownloadMedia from '../API-Handling/usePlaylistFetch';
// import Spinner from 'react-bootstrap/Spinner';
// import OfflineScreen from './OfflineScreen';

// const FOLDER_NAME = 'IQMediaFiles';

// const isVideo = (f) => /\.(mp4|webm|ogg)$/i.test(f);
// const isImage = (f) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f);
// const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url);

// const extractYouTubeId = (url) => {
// 	const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
// 	const match = url.match(regExp);
// 	return match && match[2].length === 11 ? match[2] : null;
// };

// const getLocalPath = (filename) => {
// 	if (window.webOS) return `file:///media/developer/${FOLDER_NAME}/${filename}`;
// 	if (window.tizen) return `/opt/usr/home/owner/Downloads/${FOLDER_NAME}/${filename}`;
// 	return `/downloads/${FOLDER_NAME}/${filename}`;
// };

// const StreamingPage = () => {
// 	const isOnline = useDeviceStatus();
// 	const downloadOnce = useDownloadOnce();
// 	const mediaFiles = useMediaStore((state) => state.mediaFiles);
// 	const setMediaUrls = useMediaStore((state) => state.setMediaUrls);

// 	const [index, setIndex] = useState(0);
// 	const [loading, setLoading] = useState(true);
// 	const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

// 	// Fetch and cache media
// 	useEffect(() => {
// 		const fetchAndUpdateMedia = async () => {
// 			if (!hasLoadedOnce) setLoading(true);

// 			if (isOnline) {
// 				await fetchAndDownloadMedia();
// 				await downloadOnce();
// 			} else {
// 				const cached = JSON.parse(localStorage.getItem('downloadedMediaFiles_IQMediaFiles') || '[]');
// 				const offlineList = cached.map((filename) => getLocalPath(filename));
// 				setMediaUrls(offlineList);
// 			}
// 		};

// 		fetchAndUpdateMedia();
// 		const interval = setInterval(fetchAndUpdateMedia, 3000);
// 		return () => clearInterval(interval);
// 	}, [isOnline, hasLoadedOnce, setMediaUrls, downloadOnce]);

// 	const handleNextMedia = () => setIndex((i) => (i + 1) % mediaFiles.length);

// 	const handleFirstMediaReady = () => {
// 		if (!hasLoadedOnce) {
// 			setLoading(false);
// 			setHasLoadedOnce(true);
// 		}
// 	};

// 	// Handle images: auto-advance based on Duration
// 	useEffect(() => {
// 		if (!mediaFiles.length) return;

// 		const currentFile = mediaFiles[index];
// 		if (!currentFile) return;

// 		// Skip videos / YouTube; handled by onEnded
// 		if (isVideo(currentFile.Url) || isYouTube(currentFile.Url)) return;

// 		const duration = currentFile.Duration ? Number(currentFile.Duration) * 1000 : 5000;
// 		const timer = setTimeout(handleNextMedia, duration);
// 		return () => clearTimeout(timer);
// 	}, [index, mediaFiles]);

// 	if (!isOnline) {
// 		return <OfflineScreen />;
// 	}

// 	if (!mediaFiles.length) {
// 		return (
// 			<div
// 				style={{
// 					width: '100vw',
// 					height: '100vh',
// 					display: 'flex',
// 					alignItems: 'center',
// 					justifyContent: 'center',
// 					background: '#000',
// 				}}
// 			>
// 				<Spinner animation="border" variant="danger" />
// 				<span style={{ color: '#fff', marginLeft: 10 }}>Loading Media...</span>
// 			</div>
// 		);
// 	}

// 	const currentFile = mediaFiles[index];
// 	const currentUrl = currentFile?.Url;

// 	return (
// 		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000', position: 'relative' }}>
// 			{loading && !hasLoadedOnce && (
// 				<div
// 					style={{
// 						position: 'absolute',
// 						top: 0,
// 						left: 0,
// 						width: '100%',
// 						height: '100%',
// 						background: 'rgba(0,0,0,0.6)',
// 						display: 'flex',
// 						alignItems: 'center',
// 						justifyContent: 'center',
// 						zIndex: 99999,
// 					}}
// 				>
// 					<h1 style={{ color: 'white', position: 'absolute', zIndex: 99999 }}>LOADING...</h1>
// 					<Spinner animation="border" variant="danger" />
// 				</div>
// 			)}

// 			{isYouTube(currentUrl) ? (
// 				<iframe
// 					key={currentUrl}
// 					id={`ytplayer-${index}`}
// 					src={`https://www.youtube.com/embed/${extractYouTubeId(currentUrl)}?autoplay=1&controls=0&mute=1&enablejsapi=1`}
// 					frameBorder="0"
// 					allow="autoplay; fullscreen"
// 					allowFullScreen
// 					style={{ width: '100%', height: '100%' }}
// 					onLoad={() => {
// 						handleFirstMediaReady();
// 						if (window.YT) {
// 							new window.YT.Player(`ytplayer-${index}`, {
// 								events: {
// 									onStateChange: (event) => {
// 										if (event.data === window.YT.PlayerState.ENDED) {
// 											handleNextMedia();
// 										}
// 									},
// 								},
// 							});
// 						}
// 					}}
// 				/>
// 			) : isVideo(currentUrl) ? (
// 				<video
// 					key={currentUrl}
// 					src={currentUrl}
// 					autoPlay
// 					controls={false}
// 					onCanPlay={handleFirstMediaReady}
// 					onEnded={handleNextMedia}
// 					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// 				/>
// 			) : (
// 				<img
// 					key={currentUrl}
// 					src={currentUrl}
// 					alt="media"
// 					onLoad={handleFirstMediaReady}
// 					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default StreamingPage;



// import React, { useEffect, useState, useRef } from "react";
// import useMediaStore from '../store/useMediaStore'; // your Zustand store
// import YouTube from "react-youtube";

// // Helper to get file extension type
// const getMediaType = (url) => {
//   if (!url) return null;
//   const ext = url.split(".").pop().toLowerCase();
//   if (["mp4", "webm", "ogg"].includes(ext)) return "video";
//   if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
//   if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
//   return "unknown";
// };

// const StreamingPage = () => {
//   const { layout_list } = useMediaStore((state) => state); // from Zustand
//   const [allMediaFiles, setAllMediaFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const imageTimerRef = useRef(null);
//   const videoRef = useRef(null);

//   // Flatten all media files across layouts/zones
//   useEffect(() => {
//     const files = [];
//     layout_list?.forEach((layout) => {
//       layout?.zonelist?.forEach((zone) => {
//         zone?.media_list?.forEach((media) => {
//           if (media?.url) {
//             const type = getMediaType(media.url);
//             files.push({
//               url: media.url,
//               duration: media.Duration || 15, // fallback 15s
//               type,
//             });
//           }
//         });
//       });
//     });
//     setAllMediaFiles(files);
//   }, [layout_list]);

//   // Handle next media
//   const handleNextMedia = () => {
//     clearTimeout(imageTimerRef.current);
//     setCurrentIndex((prev) => (prev + 1) % allMediaFiles.length);
//   };

//   // Auto-advance for images
//   useEffect(() => {
//     const currentMedia = allMediaFiles[currentIndex];
//     if (!currentMedia) return;

//     if (currentMedia.type === "image") {
//       setIsLoading(false);
//       imageTimerRef.current = setTimeout(
//         handleNextMedia,
//         currentMedia.duration * 1000
//       );
//     }
//     // Videos and YouTube handled by onEnded/onStateChange
//   }, [currentIndex, allMediaFiles]);

//   if (!allMediaFiles.length) return <div>Loading...</div>;

//   const currentMedia = allMediaFiles[currentIndex];

//   return (
//     <div style={{ width: "100%", height: "100%", background: "#000" }}>
//       {currentMedia?.type === "image" && (
//         <img
//           src={currentMedia.url}
//           alt="Streaming Media"
//           style={{ width: "100%", height: "100%", objectFit: "contain" }}
//           onLoad={() => setIsLoading(false)}
//         />
//       )}

//       {currentMedia?.type === "video" && (
//         <video
//           ref={videoRef}
//           src={currentMedia.url}
//           style={{ width: "100%", height: "100%", objectFit: "contain" }}
//           autoPlay
//           muted
//           onCanPlay={() => setIsLoading(false)}
//           onEnded={handleNextMedia}
//         />
//       )}

//       {currentMedia?.type === "youtube" && (
//         <YouTube
//           videoId={extractYouTubeId(currentMedia.url)}
//           opts={{
//             width: "100%",
//             height: "100%",
//             playerVars: { autoplay: 1, controls: 0 },
//           }}
//           onReady={() => setIsLoading(false)}
//           onEnd={handleNextMedia}
//         />
//       )}

//       {isLoading && (
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             color: "#fff",
//             fontSize: 24,
//           }}
//         >
//           Loading...
//         </div>
//       )}
//     </div>
//   );
// };

// // Helper to extract YouTube video ID from URL
// function extractYouTubeId(url) {
//   const regExp =
//     /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   return match && match[2].length === 11 ? match[2] : null;
// }

// export default StreamingPage;
