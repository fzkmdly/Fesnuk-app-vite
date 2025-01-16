import React, { useEffect, useState } from "react";

const BASE_URL = "https://iot-api-two.vercel.app";

const LampSwitch: React.FC = () => {
  const [lampStatus, setLampStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch lamp status
  const fetchLampStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/light-status`);
      const data = await response.json();
      setLampStatus(data.status);
    } catch (error) {
      console.error("Error fetching lamp status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Polling to keep status updated
  useEffect(() => {
    fetchLampStatus(); // Fetch on component mount

    const intervalId = setInterval(() => {
      fetchLampStatus();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Toggle lamp status
  const toggleLamp = async () => {
    const action = lampStatus ? "off" : "on";
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/control-light`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      console.log("Toggle response:", data);
      setLampStatus(data.status);
    } catch (error) {
      console.error("Error toggling lamp:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Lamp Control</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={`lamp-status ${lampStatus ? "on" : "off"}`}>
            Lamp is currently: <span>{lampStatus ? "ON" : "OFF"}</span>
          </div>
          <div
            className={`switch ${lampStatus ? "on" : "off"}`}
            onClick={toggleLamp}
            role="button"
            aria-pressed={lampStatus}
          >
            <div className="slider"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default LampSwitch;