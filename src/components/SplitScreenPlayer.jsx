// src/components/SplitScreenPlayer.jsx
import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { getMediaPath } from "../utils/mediaPathResolver";

const isVideo = (f) => /\.(mp4|webm|ogg)$/i.test(f);
const isImage = (f) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f);
const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url);
const isPdf = (f) => /\.pdf$/i.test(f);

const ZonePlayer = ({ zone }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [pdfData, setPdfData] = useState(null);

  const media = zone.media_list[mediaIndex];

  // Auto cycle through media list
  useEffect(() => {
    if (!media) return;
    const timer = setTimeout(() => {
      setMediaIndex((i) => (i + 1) % zone.media_list.length);
    }, Number(media.Duration) * 1000);
    return () => clearTimeout(timer);
  }, [mediaIndex, zone.media_list]);

  // Load PDF blob
  useEffect(() => {
    if (media && isPdf(media.Filename)) {
      fetch(media.Url)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setPdfData(url);
        });
    }
  }, [media]);

  if (!media) return null;

  return (
    <div
      style={{
        border: "1px solid #333",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
      }}
    >
      {isVideo(media.Filename) && (
        <video
          src={media.Url}
          autoPlay
          muted={zone.ismute}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {isImage(media.Filename) && (
        <img
          src={media.Url}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {isPdf(media.Filename) && pdfData && (
        <Document file={pdfData}>
          <Page pageNumber={1} width={400} />
        </Document>
      )}
      {isYouTube(media.Url) && (
        <iframe
          src={media.Url.replace("watch?v=", "embed/")}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen"
        />
      )}
    </div>
  );
};

const SplitScreenPlayer = ({ layout }) => {
  if (!layout || !layout.zonelist) return null;

  const rows = layout.rows || Math.ceil(layout.zonecount / 2);
  const cols = layout.cols || 2;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: "100vw",
        height: "100vh",
      }}
    >
      {layout.zonelist.map((zone) => (
        <ZonePlayer key={zone.id} zone={zone} />
      ))}
    </div>
  );
};

export default SplitScreenPlayer;
