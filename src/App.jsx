import { useState, useEffect } from 'react'
import './App.css'
import Textbox from './components/Textbox'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show splash screen/loader for 1.5 seconds before rendering the app
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <style>
          {`
            .loader {
              position: absolute;
              width: 150px;
              height: 150px;
              border-radius: 999px;
              border: 2px solid #fff;
              border-top-color: transparent;
              border-bottom-color: transparent;
              animation: spinner .38s linear infinite;
            }
            .logo {
              position: absolute;
              width: 100px;
              height: 100px;
              margin-top: 8px;
              stroke-width: 15;
              stroke-dasharray: 1790;
              stroke-dashoffset: 1790;
            }
            .logo path {
              animation: loadLogo 0.5s ease-in-out both;
            }
            @keyframes spinner {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes loadLogo {
              0% { stroke-dashoffset: 1790; }
              100% { stroke-dashoffset: 0; }
            }
          `}
        </style>
        <div className="h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-tr from-[#3f00e6] to-[#962cff] relative">
          <span className="loader"></span>
          <svg className="logo" viewBox="0 0 738 441" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M390.002 411L390.002 258L435.002 258L494.002 180L424.002 180C424.002 180 409.275 179.216 399.502 167.5C389.729 155.784 390.002 147 390.002 147L390.002 58C390.002 58 389.609 41.893 399.502 31C409.395 20.1069 424.002 20 424.002 20L707.502 20L615.002 134.5L615.002 80L461.002 80L461.002 121.5L547.502 121.5C547.502 121.5 583.992 119.122 587.502 147C589.535 163.141 576.002 180 576.002 180L390.002 411Z"
              id="s"
              fill="none"
              fillRule="evenodd"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M337.5 411L337.5 258L292.5 258L233.5 180L303.5 180C303.5 180 318.227 179.216 328 167.5C337.773 155.784 337.5 147 337.5 147L337.5 58C337.5 58 337.893 41.893 328 31C318.107 20.1069 303.5 20 303.5 20L20 20L112.5 134.5L112.5 80L266.5 80L266.5 121.5L180 121.5C180 121.5 143.511 119.122 140 147C137.967 163.141 151.5 180 151.5 180L337.5 411Z"
              id="r"
              fill="none"
              fillRule="evenodd"
              stroke="#FFFFFF"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes slideFadeIn {
            0% { opacity: 0; transform: translateY(10px) scale(0.99); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .app-entry {
            animation: slideFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>
      <div 
        className="h-screen w-full flex justify-center items-stretch p-3 md:p-5 lg:p-6 overflow-hidden box-border app-entry bg-gradient-to-tr from-[#3f00e6] to-[#962cff]"
      >
        <Textbox/>
      </div>
    </>
  )
}

export default App
