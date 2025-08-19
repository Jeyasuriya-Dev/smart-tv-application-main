// import React, { useEffect, useState } from 'react';

// const CACHE_KEY = 'downloadedMediaFiles_IQMediaFiles';

// // Helper to detect media type
// const isVideoFile = (filename) => /\.(mp4|webm|ogg)$/i.test(filename);
// const isImageFile = (filename) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filename);

// const OfflineScreen = () => {
//   const [mediaFiles, setMediaFiles] = useState([]);

//   useEffect(() => {
//     // Get downloaded file names from localStorage
//     const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
//     setMediaFiles(cached);
//   }, []);

//   const getMediaPath = (filename) => {
//     // Platform-specific logic
//     if (window.webOS) {
//       return `file:///media/developer/${FOLDER_NAME}/${filename}`;
//     } else if (window.tizen) {
//       return `downloads/${FOLDER_NAME}/${filename}`;
//     } else {
//       // Browser fallback (browser downloads don’t support path access)
//       return null; // Or use a fallback placeholder
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2> No Internet Connection</h2>
//       <p>Showing downloaded media from "{FOLDER_NAME}" folder</p>

//       {mediaFiles.length === 0 ? (
//         <p> No downloaded files found.</p>
//       ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
//           {mediaFiles.map((filename, index) => {
//             const path = getMediaPath(filename);

//             // For browser, skip preview (no path access)
//             if (!path && !window.webOS && !window.tizen) {
//               return (
//                 <div key={index}>
//                   <p>{filename}</p>
//                   <small> Downloaded (preview not available)</small>
//                 </div>
//               );
//             }

//             if (isVideoFile(filename)) {
//               return (
//                 <video
//                   key={index}
//                   controls
//                   width="320"
//                   height="240"
//                   src={path}
//                   style={{ backgroundColor: '#000' }}
//                 />
//               );
//             } else if (isImageFile(filename)) {
//               return (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={filename}
//                   style={{ width: 320, height: 240, objectFit: 'cover' }}
//                 />
//               );
//             } else {
//               return (
//                 <div key={index}>
//                   <p>{filename}</p>
//                   <small> Unsupported file type</small>
//                 </div>
//               );
//             }
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfflineScreen;

// const FOLDER_NAME = 'IQMediaFiles';



import React, { useEffect, useState } from 'react';

const CACHE_KEY = 'downloadedMediaFiles_IQMediaFiles';
const FOLDER_NAME = 'IQMediaFiles';

// Helper to detect media type
const isVideoFile = (filename) => /\.(mp4|webm|ogg)$/i.test(filename);
const isImageFile = (filename) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filename);

const OfflineScreen = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [noInternetImage, setNoInternetImage] = useState('');

  // Load cached media from localStorage
  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
    setMediaFiles(cached);
  }, []);

  // Orientation-based image handling
  useEffect(() => {
    const updateImage = () => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth > innerHeight) {
        setNoInternetImage('assets/nointernet-landscape.jpeg');
      } else {
        setNoInternetImage('assets/noInternet-portrait.jpeg');
      }
    };

    updateImage();
    window.addEventListener('resize', updateImage);
    window.addEventListener('orientationchange', updateImage);

    return () => {
      window.removeEventListener('resize', updateImage);
      window.removeEventListener('orientationchange', updateImage);
    };
  }, []);

  const getMediaPath = (filename) => {
    if (window.webOS) {
      return `file:///media/developer/${FOLDER_NAME}/${filename}`;
    } else if (window.tizen) {
      return `downloads/${FOLDER_NAME}/${filename}`;
    } else {
      return null; // Browser fallback
    }
  };

  // If no files found → Show No Internet image based on orientation
  if (mediaFiles.length === 0) {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <img
          src={noInternetImage}
          alt="No Internet"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    );
  }

  // If files found → Show media list
  return (
    <div style={{ padding: 20, display : 'flex', flexDirection : 'column' , justifyContent :'center' , alignItems :'center' }}>
      <h2>No Internet Connection</h2>
      <p>Showing downloaded media from "{FOLDER_NAME}" folder</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {mediaFiles.map((filename, index) => {
          const path = getMediaPath(filename);

          if (!path && !window.webOS && !window.tizen) {
            return (
              <div key={index}>
                <p>{filename}</p>
                <small>Downloaded (preview not available)</small>
              </div>
            );
          }

          if (isVideoFile(filename)) {
            return (
              <video
                key={index}
                controls
                width="320"
                height="240"
                src={path}
                style={{ backgroundColor: '#000' }}
              />
            );
          } else if (isImageFile(filename)) {
            return (
              <img
                key={index}
                src={path}
                alt={filename}
                style={{ width: 320, height: 240, objectFit: 'cover' }}
              />
            );
          } else {
            return (
              <div key={index}>
                <p>{filename}</p>
                <small>Unsupported file type</small>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default OfflineScreen;
