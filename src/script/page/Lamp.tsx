import React, { useEffect } from "react";
import { useState } from "react";

const BASE_URL = "https://iot-api-two.vercel.app";

const LampSwitch: React.FC = () => {
  const [lampStatus, setLampStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  //fetch lamp status
  useEffect(() => {
    const fetchLampStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/light-status`);
        const data = await response.json();
        setLampStatus(data.status);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLampStatus();
  }, []);

  //toggle lamp status
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
      console.log(data);
      setLampStatus(data.status);
    } catch (error) {
      console.error(error);
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
