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

// Untill video play Works and Stucked in youtube 



// import React, { useEffect, useState } from 'react';
// import useMediaStore from '../store/useMediaStore';
// import useDownloadOnce from '../hooks/useDownloadOnce';
// import { useDeviceStatus } from '../context/DeviceStatusPollerContext';
// import fetchAndDownloadMedia from '../API-Handling/usePlaylistFetch';
// import Spinner from 'react-bootstrap/Spinner';
// import OfflineScreen from './OfflineScreen'; //  separate import
// import DeviceStatusPoller from '../API-Handling/CheckDeviceOnline';
// // import ReactPlayer from "react-player/youtube";

// const FOLDER_NAME = 'IQMediaFiles';

// const isVideo = (f) => /\.(mp4|webm|ogg)$/i.test(f);
// const isImage = (f) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f);
// const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url);
// const isPdf = (f) => /\.pdf$/i.test(f);


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

// 	const [index, setIndex] = useState(0);
// 	const [loading, setLoading] = useState(true);
// 	const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
// 	const mediaUrls = useMediaStore((state) => state.mediaUrls);
// 	const mediaFiles = useMediaStore((state) => state.mediaFiles);
// 	const [currentUrl, setCurrentUrl] = useState('');
// 	const [imageEnded, setImageEnded] = useState(false);
// 	const [count, setCount] = useState(0)
// 	const [duration, setDuration] = useState(0)

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


// 	const handleYoutubeEnd = () => {
// 		console.log("YouTube video ended, skipping to next...");
// 		handleVideoEnd(); // reuse your existing logic for <video> end
// 	};


// 	useEffect(() => {
// 	}, [])

// 	// useEffect(() => {
// 	// 	if (!mediaFiles.length) return;

// 	// 	const currentFile = mediaFiles[index];

// 	// 	if (!isVideo(currentFile.Url) && !isYouTube(currentFile.Url)) {
// 	// 		const duration = currentFile?.Duration
// 	// 			? Number(currentFile.Duration) * 1000
// 	// 			: 5000;

// 	// 		const timer = setTimeout(() => {
// 	// 			setIndex((i) => (i + 1) % mediaFiles.length);
// 	// 		}, duration);

// 	// 		return () => clearTimeout(timer);
// 	// 	}
// 	// }, [index, mediaFiles]);


// 	const handleNextMedia = () => setIndex((i) => (i + 1) % mediaUrls.length);

// 	useEffect(() => {
// 		if (!mediaUrls.length) return;

// 		const currentMedia = mediaUrls[index];
// 		if (!currentMedia) return;  // safety check

// 		// If mediaUrls contains strings
// 		const url = typeof currentMedia === "string" ? currentMedia : currentMedia.url;

// 		// console.log(url)
// 		setDuration(currentMedia.duration ? Number(currentMedia.duration) * 1000 : 5000);
// 		// console.log(duration)

// 		setCurrentUrl(url);
// 		// setImageEnded(false); // reset each time media changes

// 		if (isVideo(url) || isYouTube(url)) {
// 			// Video will call handleNextMedia on its own via onEnded
// 			return;
// 		}



// 		//  Skip PDFs safely here
// 		if (isPdf(url)) {
// 			console.log("Skipping PDF:", url);
// 			handleNextMedia();
// 			return;
// 		}

// 	}, [index, mediaUrls]);

// 	// when image ends → move to next
// 	useEffect(() => {
// 		if (imageEnded) {
// 			handleNextMedia();
// 		}
// 	}, [imageEnded]);


// 	// For Youtube Contents Logics

// 	useEffect(() => {
// 		if (!window.YT) {
// 			const tag = document.createElement("script");
// 			tag.src = "https://www.youtube.com/iframe_api";
// 			const firstScriptTag = document.getElementsByTagName("script")[0];
// 			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 		}
// 	}, []);


// 	useEffect(() => {
// 		window.onYouTubeIframeAPIReady = () => {
// 			new window.YT.Player(`ytplayer-${index}`, {
// 				events: {
// 					onReady: (event) => {
// 						handleFirstMediaReady();
// 						event.target.unMute();
// 						event.target.playVideo();
// 					},
// 					onStateChange: (event) => {
// 						if (event.data === window.YT.PlayerState.ENDED) {
// 							handleVideoEnd();
// 						}
// 					}
// 				}
// 			});
// 		};
// 	}, [index, currentUrl]);


// 	// console.log(isOnline)



// 	const handleVideoEnd = () => setIndex((i) => (i + 1) % mediaUrls.length);

// 	const handleFirstMediaReady = () => {
// 		if (!hasLoadedOnce) {
// 			setLoading(false);
// 			setHasLoadedOnce(true);
// 		}
// 	};

// 	// If offline, show OfflineScreen
// 	if (!isOnline) {
// 		return <OfflineScreen />;
// 	}

// 	return (
// 		<>

// 			<div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000', position: 'relative' }}>
// 				{loading && !hasLoadedOnce && (
// 					<div
// 						style={{
// 							position: 'absolute',
// 							top: 0,
// 							left: 0,
// 							width: '100%',
// 							height: '100%',
// 							background: 'rgba(0,0,0,0.6)',
// 							display: 'flex',
// 							alignItems: 'center',
// 							justifyContent: 'center',
// 							zIndex: 99999,
// 						}}
// 					>
// 						<h1 style={{ color: 'white', position: 'absolute', zIndex: 99999 }}>LOADING...</h1>
// 						<Spinner animation="border" variant="danger" />
// 					</div>
// 				)}

// 				{isYouTube(currentUrl) ? (
// 					<iframe
// 						key={currentUrl}
// 						id={`ytplayer-${index}`}
// 						src={`https://www.youtube.com/embed/${extractYouTubeId(currentUrl)}?autoplay=1&controls=0&enablejsapi=1`}
// 						frameBorder="0"
// 						allow="autoplay; fullscreen"
// 						allowFullScreen
// 						style={{ width: "100%", height: "100%" }}
// 					/>

// 				) : isVideo(currentUrl) ? (
// 					<video
// 						key={currentUrl}
// 						src={currentUrl}
// 						autoPlay
// 						controls={false}
// 						onCanPlay={handleFirstMediaReady}
// 						onEnded={handleVideoEnd}
// 						style={{ width: '100%', height: '100%', objectFit: 'fill' }}
// 					/>
// 				) : (
// 					<img
// 						key={currentUrl}
// 						src={currentUrl}
// 						alt="media"
// 						onLoad={() => {
// 							handleFirstMediaReady();
// 							// simulate "onEnded" for image
// 							setTimeout(() => {
// 								handleVideoEnd();
// 							}, duration); // use API-provided duration
// 						}}
// 						style={{ width: '100%', height: '100%', objectFit: 'fill' }}
// 					/>
// 				)}
// 			</div>
// 			<DeviceStatusPoller />
// 		</>
// 	);

// };

// export default StreamingPage;



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




// // check pdf works 

// import React, { useEffect, useState, useRef } from 'react';
// import useMediaStore from '../store/useMediaStore';
// import useDownloadOnce from '../hooks/useDownloadOnce';
// import { useDeviceStatus } from '../context/DeviceStatusPollerContext';
// import fetchAndDownloadMedia from '../API-Handling/usePlaylistFetch';
// import Spinner from 'react-bootstrap/Spinner';
// import OfflineScreen from './OfflineScreen';
// import DeviceStatusPoller from '../API-Handling/CheckDeviceOnline';

// const FOLDER_NAME = 'IQMediaFiles';

// const isVideo = (f) => /\.(mp4|webm|ogg)$/i.test(f);
// const isImage = (f) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f);
// const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url);
// const isPdf = (f) => /\.pdf$/i.test(f);

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
// 	const downloadOnce = useDownloadOnce(); // get and Store Download Function On var

// 	const [index, setIndex] = useState(0);
// 	const [loading, setLoading] = useState(true);
// 	const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
// 	const mediaUrls = useMediaStore((state) => state.mediaUrls);
// 	const [currentUrl, setCurrentUrl] = useState('');
// 	const [duration, setDuration] = useState(0);
// 	const ytPlayerRef = useRef(null);


// 	useEffect(() => {
// 		const fetchAndUpdateMedia = async () => {
// 			if (!hasLoadedOnce) setLoading(true);

// 			if (isOnline) {
// 				await fetchAndDownloadMedia();
// 				await downloadOnce();// call download once Logic to download All Files 
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

// 	const handleNextMedia = () => setIndex((i) => (i + 1) % mediaUrls.length);

// 	useEffect(() => {
// 		if (!mediaUrls.length) return;

// 		const currentMedia = mediaUrls[index];
// 		if (!currentMedia) return;

// 		const url = typeof currentMedia === 'string' ? currentMedia : currentMedia.url;
// 		setDuration(currentMedia.duration ? Number(currentMedia.duration) * 1000 : 5000);
// 		setCurrentUrl(url);

// 		// PDF Skipping Logic
// 		if (isPdf(url)) {
// 			console.log('Skipping PDF:', url);
// 			handleNextMedia();
// 		}
// 	}, [index, mediaUrls]);

// 	// Load YouTube iframe API once
// 	useEffect(() => {
// 		if (!window.YT) {
// 			const tag = document.createElement('script');
// 			tag.src = 'https://www.youtube.com/iframe_api';
// 			document.body.appendChild(tag);
// 		}
// 	}, []);

// 	// Initialize new YT player whenever a YouTube URL is current
// 	useEffect(() => {
// 		if (isYouTube(currentUrl) && window.YT) {
// 			const player = new window.YT.Player(`ytplayer-${index}`, {
// 				events: {
// 					onReady: (event) => {
// 						handleFirstMediaReady();
// 						event.target.unMute();
// 						event.target.playVideo();
// 					},
// 					onStateChange: (event) => {
// 						if (event.data === window.YT.PlayerState.ENDED) {
// 							handleNextMedia();
// 						}
// 					},
// 				},
// 			});
// 			ytPlayerRef.current = player;
// 		}
// 	}, [index, currentUrl]);

// 	const handleFirstMediaReady = () => {
// 		if (!hasLoadedOnce) {
// 			setLoading(false);
// 			setHasLoadedOnce(true);
// 		}
// 	};

// 	if (!isOnline) {
// 		return <OfflineScreen />;
// 	}

// 	return (
// 		<>
// 			<div
// 				style={{
// 					width: '100vw',
// 					height: '100vh',
// 					overflow: 'hidden',
// 					background: '#000',
// 					position: 'relative',
// 				}}
// 			>
// 				{loading && !hasLoadedOnce && (
// 					<div
// 						style={{
// 							position: 'absolute',
// 							top: 0,
// 							left: 0,
// 							width: '100%',
// 							height: '100%',
// 							background: 'rgba(0,0,0,0.6)',
// 							display: 'flex',
// 							alignItems: 'center',
// 							justifyContent: 'center',
// 							zIndex: 99999,
// 						}}
// 					>
// 						<h1 style={{ color: 'white', position: 'absolute', zIndex: 99999 }}>LOADING...</h1>
// 						<Spinner animation="border" variant="danger" />
// 					</div>
// 				)}

// 				{isYouTube(currentUrl) ? (
// 					<iframe
// 						key={currentUrl}
// 						id={`ytplayer-${index}`}
// 						src={`https://www.youtube.com/embed/${extractYouTubeId(currentUrl)}?autoplay=1&controls=0&enablejsapi=1`}
// 						frameBorder="0"
// 						allow="autoplay; fullscreen"
// 						allowFullScreen
// 						style={{ width: '100%', height: '100%' }}
// 					/>
// 				) : isVideo(currentUrl) ? (
// 					<video
// 						key={currentUrl}
// 						src={currentUrl}
// 						autoPlay
// 						controls={false}
// 						onCanPlay={handleFirstMediaReady}
// 						onEnded={handleNextMedia}
// 						style={{ width: '100%', height: '100%', objectFit: 'fill' }}
// 					/>
// 				) : isPdf(currentUrl) ? (
// 					<iframe
// 						key={currentUrl}
// 						src={currentUrl}
// 						title="pdf-viewer"
// 						onLoad={() => {
// 							handleFirstMediaReady();
// 							setTimeout(() => {
// 								handleNextMedia();
// 							}, duration);
// 						}}
// 						style={{
// 							width: '100%',
// 							height: '100%',
// 							border: 'none',
// 							background: '#fff', // clean background for PDFs
// 						}}
// 					/>
// 				) : (
// 					<img
// 						key={currentUrl}
// 						src={currentUrl}
// 						alt="media"
// 						onLoad={() => {
// 							handleFirstMediaReady();
// 							setTimeout(() => {
// 								handleNextMedia();
// 							}, duration);
// 						}}
// 						style={{ width: '100%', height: '100%', objectFit: 'fill' }}
// 					/>
// 				)}

// 			</div>
// 			<DeviceStatusPoller />
// 		</>
// 	);
// };

// export default StreamingPage;






// Full functionality with youtube Video Play 

// import React, { useEffect, useState, useRef } from 'react';
// import useMediaStore from '../store/useMediaStore';
// import useDownloadOnce from '../hooks/useDownloadOnce';
// import { useDeviceStatus } from '../context/DeviceStatusPollerContext';
// import fetchAndDownloadMedia from '../API-Handling/usePlaylistFetch';
// import Spinner from 'react-bootstrap/Spinner';
// import OfflineScreen from './OfflineScreen';
// import DeviceStatusPoller from '../API-Handling/CheckDeviceOnline';
// import { getMediaPath } from '../utils/mediaPathResolver';


// // ✅ PDF Viewer
// import { Document, Page, pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const FOLDER_NAME = 'IQMediaFiles';

// const isVideo = (f) => /\.(mp4|webm|ogg)$/i.test(f);
// const isImage = (f) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f);
// const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url);
// const isPdf = (f) => /\.pdf$/i.test(f);

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
// 	const downloadOnce = useDownloadOnce();// get and Store Download Function On var

// 	const [index, setIndex] = useState(0);
// 	const [loading, setLoading] = useState(true);
// 	const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
// 	const mediaUrls = useMediaStore((state) => state.mediaUrls);
// 	const [currentUrl, setCurrentUrl] = useState('');
// 	const [duration, setDuration] = useState(0);
// 	const ytPlayerRef = useRef(null);



// 	// ✅ PDF state
// 	const [numPages, setNumPages] = useState(null);

// 	useEffect(() => {
// 		const fetchAndUpdateMedia = async () => {
// 			if (!hasLoadedOnce) setLoading(true);

// 			if (isOnline) {
// 				await fetchAndDownloadMedia();
// 				await downloadOnce();// call download once Logic to download All Files 
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

// 	const handleNextMedia = () => setIndex((i) => (i + 1) % mediaUrls.length);

// 	useEffect(() => {
// 		if (!mediaUrls.length) return;

// 		const currentMedia = mediaUrls[index];
// 		if (!currentMedia) return;

// 		const url = typeof currentMedia === 'string' ? currentMedia : currentMedia.url;
// 		setDuration(currentMedia.duration ? Number(currentMedia.duration) * 1000 : 5000);
// 		setCurrentUrl(url);

// 		//  resolve whether local file exists, otherwise fallback
// 		getMediaPath(url).then((finalUrl) => {
// 			setCurrentUrl(finalUrl);
// 		});


// 		// if (isPdf(url)) {
// 		// 	console.log('Skipping PDF:', url);
// 		// 	handleNextMedia();
// 		// }
// 	}, [index, mediaUrls]);

// 	// Load YouTube iframe API once
// 	useEffect(() => {
// 		if (!window.YT) {
// 			const tag = document.createElement('script');
// 			tag.src = 'https://www.youtube.com/iframe_api';
// 			document.body.appendChild(tag);

// 			window.onYouTubeIframeAPIReady = () => {
// 				console.log("YT API Ready");
// 			};
// 		}
// 	}, []);


// 	// Initialize new YT player whenever a YouTube URL is current
// 	useEffect(() => {
// 		if (isYouTube(currentUrl) && window.YT) {
// 			const player = new window.YT.Player(`ytplayer-${index}`, {
// 				events: {
// 					onReady: (event) => {
// 						handleFirstMediaReady();
// 						event.target.unMute();
// 						event.target.playVideo();
// 					},
// 					onStateChange: (event) => {
// 						if (event.data === window.YT.PlayerState.ENDED) {
// 							handleNextMedia();
// 						}
// 					},
// 				},
// 			});
// 			ytPlayerRef.current = player;
// 		}
// 	}, [index, currentUrl, hasLoadedOnce, loading]);

// 	const handleFirstMediaReady = () => {
// 		if (!hasLoadedOnce) {
// 			setLoading(false);
// 			setHasLoadedOnce(true);
// 		}
// 	};

// 	if (!isOnline) {
// 		return <OfflineScreen />;
// 	}

// 	return (
// 		<>
// 			<div
// 				style={{
// 					width: '100vw',
// 					height: '100vh',
// 					overflow: 'hidden',
// 					background: '#000',
// 					position: 'relative',
// 				}}
// 			>
// 				{loading && !hasLoadedOnce && (
// 					<div
// 						style={{
// 							position: 'absolute',
// 							top: 0,
// 							left: 0,
// 							width: '100%',
// 							height: '100%',
// 							background: 'rgba(0,0,0,0.6)',
// 							display: 'flex',
// 							alignItems: 'center',
// 							justifyContent: 'center',
// 							zIndex: 99999,
// 						}}
// 					>
// 						<h1 style={{ color: 'white', position: 'absolute', zIndex: 99999 }}>LOADING...</h1>
// 						<Spinner animation="border" variant="danger" />
// 					</div>
// 				)}

// 				{isYouTube(currentUrl) ? (
// 					<iframe
// 						key={currentUrl}
// 						id={`ytplayer-${index}`}
// 						src={`https://www.youtube.com/embed/${extractYouTubeId(currentUrl)}?autoplay=1&controls=0&enablejsapi=1`}
// 						frameBorder="0"
// 						allow="autoplay; fullscreen"
// 						allowFullScreen
// 						onLoad={handleFirstMediaReady}
// 						style={{ width: '100%', height: '100%' }}
// 					/>
// 				) : isVideo(currentUrl) ? (
// 					<video
// 						key={currentUrl}
// 						src={currentUrl}
// 						autoPlay
// 						controls={false}
// 						onCanPlay={handleFirstMediaReady}
// 						onEnded={handleNextMedia}
// 						style={{ width: '100%', height: '100%', objectFit: 'fill' }}
// 					/>
// 				) : isPdf(currentUrl) ? (
// 					<div
// 						key={currentUrl}
// 						style={{
// 							width: "100%",
// 							height: "100%",
// 							background: "#222",
// 							color: "#fff",
// 							display: "flex",
// 							alignItems: "center",
// 							justifyContent: "center",
// 							fontSize: "2rem",
// 						}}
// 					>
// 						📄 PDF Content
// 						{(() => {
// 							handleFirstMediaReady();
// 							setTimeout(() => {
// 								handleNextMedia();
// 							}, duration);
// 						})()}
// 					</div>
// 				) : (
// 					<img
// 						key={currentUrl}
// 						src={currentUrl}
// 						alt="media"
// 						onLoad={() => {
// 							handleFirstMediaReady();
// 							setTimeout(() => {
// 								handleNextMedia();
// 							}, duration);
// 						}}
// 						style={{ width: '100%', height: '100%', objectFit: 'fill' }}
// 					/>
// 				)}
// 			</div>
// 			<DeviceStatusPoller />
// 		</>
// 	);
// };

// export default StreamingPage;


// check pdf works 

import React, { useEffect, useState, useRef } from "react";
import useMediaStore from "../store/useMediaStore";
import useDownloadOnce from "../hooks/useDownloadOnce";
import { useDeviceStatus } from "../context/DeviceStatusPollerContext";
import fetchAndDownloadMedia from "../API-Handling/usePlaylistFetch";
import Spinner from "react-bootstrap/Spinner";
import OfflineScreen from "./OfflineScreen";
import DeviceStatusPoller from "../API-Handling/CheckDeviceOnline";
import { getMediaPath } from "../utils/mediaPathResolver";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";


//  TV-safe: avoid worker URL / CDN issues (white screen on webOS/Tizen).
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
// pdfjs.disableWorker = true; // <— important for file:// + CSP environments

const FOLDER_NAME = "IQMediaFiles";

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
	const [currentUrl, setCurrentUrl] = useState("");
	const [duration, setDuration] = useState(0);
	const ytPlayerRef = useRef(null);


	//  PDF state
	const [pdfData, setPdfData] = useState(null);
	const [numPages, setNumPages] = useState(null);

	useEffect(() => {
		const fetchAndUpdateMedia = async () => {
			if (!hasLoadedOnce) setLoading(true);

			if (isOnline) {
				await fetchAndDownloadMedia();
				await downloadOnce();
			} else {
				const cached = JSON.parse(localStorage.getItem("downloadedMediaFiles_IQMediaFiles") || "[]");
				const offlineList = cached.map((filename) => getLocalPath(filename));
				useMediaStore.getState().setMediaUrls(offlineList);
			}
		};

		fetchAndUpdateMedia();
		const interval = setInterval(fetchAndUpdateMedia, 3000);
		return () => clearInterval(interval);
	}, [isOnline, hasLoadedOnce]);


	// PDF LOGIC
	useEffect(() => {
		if (isPdf(currentUrl)) {
			fetch(currentUrl)
				.then(res => res.blob())
				.then(blob => {
					const url = URL.createObjectURL(blob);
					setPdfData(url);
				})
				.catch(err => console.error("PDF load error:", err));
		}
	}, [currentUrl]);

	const handleNextMedia = () => setIndex((i) => (i + 1) % mediaUrls.length);

	useEffect(() => {
		if (!mediaUrls.length) return;

		const currentMedia = mediaUrls[index];
		if (!currentMedia) return;

		const url = typeof currentMedia === "string" ? currentMedia : currentMedia.url;
		setDuration(currentMedia.duration ? Number(currentMedia.duration) * 1000 : 5000);
		setCurrentUrl(url);

		getMediaPath(url).then((finalUrl) => {
			setCurrentUrl(finalUrl);
		});
	}, [index, mediaUrls]);

	// Load YouTube iframe API once
	useEffect(() => {
		if (!window.YT) {
			const tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			document.body.appendChild(tag);

			window.onYouTubeIframeAPIReady = () => {
				console.log("YT API Ready");
			};
		}
	}, []);

	// YouTube player init
	useEffect(() => {
		if (isYouTube(currentUrl) && window.YT) {
			const player = new window.YT.Player(`ytplayer-${index}`, {
				events: {
					onReady: (event) => {
						handleFirstMediaReady();
						event.target.unMute();
						event.target.playVideo();
					},
					onStateChange: (event) => {
						if (event.data === window.YT.PlayerState.ENDED) {
							handleNextMedia();
						}
					},
				},
			});
			ytPlayerRef.current = player;
		}
	}, [index, currentUrl, hasLoadedOnce, loading]);

	const handleFirstMediaReady = () => {
		if (!hasLoadedOnce) {
			setLoading(false);
			setHasLoadedOnce(true);
		}
	};

	if (!isOnline) {
		return <OfflineScreen />;
	}

	return (
		<>
			<div
				style={{
					width: "100vw",
					height: "100vh",
					overflow: "hidden",
					background: "#000",
					position: "relative",
				}}
			>
				{loading && !hasLoadedOnce && (
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							background: "rgba(0,0,0,0.6)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 99999,
						}}
					>
						<h1 style={{ color: "white", position: "absolute", zIndex: 99999 }}>LOADING...</h1>
						<Spinner animation="border" variant="danger" />
					</div>
				)}

				{isYouTube(currentUrl) ? (
					<iframe
						key={currentUrl}
						id={`ytplayer-${index}`}
						src={`https://www.youtube.com/embed/${extractYouTubeId(currentUrl)}?autoplay=1&controls=0&enablejsapi=1`}
						frameBorder="0"
						allow="autoplay; fullscreen"
						allowFullScreen
						onLoad={handleFirstMediaReady}
						style={{ width: "100%", height: "100%" }}
					/>
				) : isVideo(currentUrl) ? (
					<video
						key={currentUrl}
						src={currentUrl}
						autoPlay
						controls={false}
						onCanPlay={handleFirstMediaReady}
						onEnded={handleNextMedia}
						style={{ width: "100%", height: "100%", objectFit: "fill" }}
					/>
				) : isPdf(currentUrl) ? (
					<PdfViewer
						key={currentUrl}
						src={currentUrl}
						duration={duration}
						onReady={handleFirstMediaReady}
						onTimeout={handleNextMedia}
						transition={mediaUrls[index]?.transition || "fade"}
					/>

				) : (
					<img
						key={currentUrl}
						src={currentUrl}
						alt="media"
						onLoad={() => {
							handleFirstMediaReady();
							setTimeout(() => {
								handleNextMedia();
							}, duration);
						}}
						style={{ width: "100%", height: "100%", objectFit: "fill" }}
					/>
				)}
			</div>
			<DeviceStatusPoller />
		</>
	);
};

function PdfViewer({ src, duration, onReady, onTimeout }) {
	const [blobUrl, setBlobUrl] = useState(null);
	const [numPages, setNumPages] = useState(0);
	const [page, setPage] = useState(1);
	const [scale, setScale] = useState(1);
	const containerRef = useRef(null);
	const pageTimerRef = useRef(null);

	// fetch → blob → objectURL
	useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				const res = await fetch(src);
				const blob = await res.blob();
				if (cancelled) return;
				const url = URL.createObjectURL(blob);
				setBlobUrl(url);
			} catch (e) {
				console.error("PDF fetch error:", e);
			}
		}
		load();
		return () => {
			cancelled = true;
		};
	}, [src]);

	// auto page advance with looping + extra time per page
	useEffect(() => {
		if (!numPages || !duration) return;

		const extraPerPage = 10000; // +10s per page
		const perPage = duration / numPages + extraPerPage;
		const totalDuration = perPage * numPages;

		clearInterval(pageTimerRef.current);
		pageTimerRef.current = setInterval(() => {
			setPage((p) => (p < numPages ? p + 1 : 1)); // loop pages
		}, perPage);

		const timeout = setTimeout(() => onTimeout?.(), totalDuration);

		return () => {
			clearInterval(pageTimerRef.current);
			clearTimeout(timeout);
		};
	}, [numPages, duration]);

	// cleanup object URL
	useEffect(() => {
		return () => {
			if (blobUrl) URL.revokeObjectURL(blobUrl);
		};
	}, [blobUrl]);

	// dynamically adjust scale to COVER container (no black bars)
	useEffect(() => {
		function updateScale() {
			if (!containerRef.current) return;
			const { clientWidth, clientHeight } = containerRef.current;

			const baseWidth = 595;  // A4 width (pt)
			const baseHeight = 842; // A4 height (pt)

			// calculate both scales
			const scaleX = clientWidth / baseWidth;
			const scaleY = clientHeight / baseHeight;

			// use the larger one → ensures cover, no black bars
			setScale(Math.max(scaleY));
		}
		updateScale();
		window.addEventListener("resize", updateScale);
		return () => window.removeEventListener("resize", updateScale);
	}, []);


	return (
		<div
			ref={containerRef}
			className="loader-container"
			style={{
				width: "100%",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#000",
				overflow: "hidden",
				objectFit: "fill",
			}}
		>
			{!blobUrl ? (
				<DottedLoader />
			) : (
				<Document
					file={blobUrl}
					onLoadSuccess={({ numPages: n }) => {
						setNumPages(n);
						onReady?.();
					}}
					loading={<div className="pdf-loader"><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>}
					error={<div style={{ color: "red" }}>⚠ Failed to load PDF</div>}
					noData={<div style={{ color: "gray" }}>No PDF found</div>}
				>
					<Page
						className={`pdf-page transition-fade`} // transition class
						pageNumber={page}
						scale={scale}
						renderAnnotationLayer={false}
						renderTextLayer={false}
						loading={<div className="pdf-loader"><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>}
					/>
				</Document>

			)}
		</div>
	);

}
const DottedLoader = () => (
	<div className="loader-container">
		<div className="dot"></div>
		<div className="dot"></div>
		<div className="dot"></div>
	</div>
);


export default StreamingPage;
