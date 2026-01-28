"use client";

import { useEffect, useState } from "react";

// Status Bar Icons
const SignalIcon = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
    <rect x="0" y="8" width="3" height="4" rx="0.5" fillOpacity="0.3"/>
    <rect x="4.5" y="5" width="3" height="7" rx="0.5" fillOpacity="0.3"/>
    <rect x="9" y="2" width="3" height="10" rx="0.5"/>
    <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
  </svg>
);

const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
    <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
    <path d="M4.46 7.04a5 5 0 017.08 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M1.64 4.22a9 9 0 0112.72 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const BatteryIcon = ({ level = 80 }: { level?: number }) => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
    <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
    <rect x="2" y="2" width={17 * (level / 100)} height="8" rx="1" fill="currentColor"/>
    <path d="M23 4v4a2 2 0 000-4z" fill="currentColor" fillOpacity="0.4"/>
  </svg>
);

function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <div className="status-bar-left">
        <span className="status-time">{time}</span>
      </div>
      <div className="status-bar-notch" />
      <div className="status-bar-right">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon level={85} />
      </div>
    </div>
  );
}

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 430);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On actual mobile devices, render without frame
  if (isMobile) {
    return (
      <div className="app-shell mobile-native">
        {children}
      </div>
    );
  }

  // On desktop, render with phone frame
  return (
    <div className="phone-container">
      <div className="phone-frame">
        {/* Phone Bezel */}
        <div className="phone-bezel">
          {/* Dynamic Island / Notch */}
          <div className="phone-notch" />

          {/* Screen */}
          <div className="phone-screen">
            <StatusBar />
            <div className="app-shell">
              {children}
            </div>
          </div>

          {/* Home Indicator */}
          <div className="phone-home-indicator" />
        </div>
      </div>
    </div>
  );
}
