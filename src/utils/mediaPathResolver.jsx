// utils/mediaPathResolver.js
export const getMediaPath = async (url) => {
  try {
    // Extract filename from URL
    const fileName = url.split("/").pop();

    // webOS supports `webOSDownload` folder in device storage
    const localPath = `file:///media/developer/apps/usr/palm/applications/${window.PalmSystem?.identifier}/downloads/${fileName}`;

    // Check if local file exists (only works inside webOS environment)
    if (window.webOS && window.webOS.fetchAppInfo) {
      return new Promise((resolve) => {
        // Use `fetch` to see if file is accessible
        fetch(localPath)
          .then((res) => {
            if (res.ok) {
              console.log("✅ Using downloaded media:", localPath);
              resolve(localPath); // local copy found
            } else {
              console.log("⚠️ Local not found, fallback to URL:", url);
              resolve(url); // fallback
            }
          })
          .catch(() => {
            console.log("⚠️ Local fetch failed, fallback to URL:", url);
            resolve(url);
          });
      });
    }

    // On browser fallback
    return url;
  } catch (err) {
    console.error("getMediaPath error:", err);
    return url;
  }
};
