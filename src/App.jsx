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
      <div 
        className="h-screen w-full flex flex-col justify-center items-center overflow-hidden"
        style={{ background: 'linear-gradient(320deg, #3f00e6, #962cff)' }}
      >
        <div className="relative flex justify-center items-center">
          {/* Outer pinging rings */}
          <div className="absolute w-20 h-20 rounded-full border border-white opacity-20 animate-ping"></div>
          <div className="absolute w-16 h-16 rounded-full border border-white opacity-40 animate-ping" style={{ animationDelay: '0.2s' }}></div>
          {/* Inner spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-l-[3px] border-white relative z-10"></div>
        </div>
        <p className="text-white mt-8 font-semibold tracking-[0.25em] text-[13px] animate-pulse">
          LOADING
        </p>
      </div>
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
        className="h-screen w-full flex justify-center items-stretch p-3 md:p-5 lg:p-6 overflow-hidden box-border app-entry"
        style={{ background: 'linear-gradient(320deg, #3f00e6, #962cff)' }}
      >
        <Textbox/>
      </div>
    </>
  )
}

export default App
