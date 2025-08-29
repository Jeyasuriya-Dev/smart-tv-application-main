// src/components/ApprovalPendingPage.jsx
import React from "react";
import { Info } from "lucide-react"; // futuristic info icon

const ApprovalPendingPage = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <Info style={styles.icon} />
        <h1 style={styles.title}>Approval Pending...</h1>
        <p style={styles.text}>
          Please wait until your device is approved by admin.
        </p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #0f0f0f, #1a1a1a, #000000)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    padding: "20px",
  },
  card: {
    background: "rgba(20, 20, 20, 0.85)",
    borderRadius: "20px",
    padding: "40px 50px",
    textAlign: "center",
    boxShadow: "0 0 25px rgba(0, 200, 255, 0.4)",
    border: "2px solid rgba(0, 200, 255, 0.6)",
    backdropFilter: "blur(8px)",
    animation: "glow 2s infinite alternate",
  },
  icon: {
    width: "64px",
    height: "64px",
    color: "#00c8ff",
    marginBottom: "20px",
    animation: "pulse 1.5s infinite",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "12px",
    letterSpacing: "1px",
    color: "#00c8ff",
    animation: "fadeIn 2s ease-in-out infinite alternate",
  },
  text: {
    fontSize: "18px",
    color: "#ddd",
    lineHeight: "1.6",
  },
};

// Inject CSS animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes glow {
  from { box-shadow: 0 0 15px rgba(0,200,255,0.2); }
  to { box-shadow: 0 0 35px rgba(0,200,255,0.7); }
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes fadeIn {
  from { opacity: 0.7; }
  to { opacity: 1; }
}
`;
document.head.appendChild(styleSheet);

export default ApprovalPendingPage;
