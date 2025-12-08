import { useState, useEffect } from 'react';

export default function XMBIntro() {
  const [showIntro, setShowIntro] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const playIntroSound = () => {
      const audio = new Audio('/audio_startup.mp3');
      audio.volume = 1.0;
      audio.currentTime = 0;
      
      audio.play().catch(err => {
        console.error('Audio play failed:', err);
      });
      
      setSoundPlayed(true);
    };

    // Play sound on first user interaction
    const handleUserInteraction = () => {
      if (!soundPlayed) {
        playIntroSound();
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      }
    };

    // Add listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [soundPlayed]);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 8000); // 8 seconds
  };

  if (!showIntro) return null;

  return (
    <div 
      style={{...styles.container, ...(isExiting ? styles.containerExit : {})}}
      onClick={handleContinue}
    />
  );
}

const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9999,
      cursor: 'pointer',
      willChange: 'opacity, backdrop-filter',
  
      // Match animation's starting state
      opacity: 1,
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      transition: 'opacity 0.3s ease',
    },
  
    containerExit: {
      animation: 'smoothFadeOut 8s ease-in-out forwards',
    },
  };

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes smoothFadeOut {
    0% {
      opacity: 1;
      backdrop-filter: blur(40px);
      -webkit-backdrop-filter: blur(40px);
    }
    100% {
      opacity: 0;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
  }
`;
document.head.appendChild(styleSheet);