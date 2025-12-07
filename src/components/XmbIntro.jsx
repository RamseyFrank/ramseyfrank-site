import { useState, useEffect } from 'react';

export default function XMBIntro() {
  const [showIntro, setShowIntro] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(false);

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

    // Duration of intro
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [soundPlayed]);

  if (!showIntro) return null;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>RF</div>
          <div style={styles.subtitle}>Ramsey Frank</div>
        </div>
        <div style={styles.loadingBar}>
          <div style={styles.loadingFill} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1818 50%, #0d0d0d 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    animation: 'fadeOutIntro 0.5s ease-out 4.5s forwards',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    textAlign: 'center',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    animation: 'scaleInLogo 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  logo: {
    fontSize: '80px',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '8px',
    textShadow: '0 0 30px rgba(107, 112, 120, 0.8)',
    fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(107, 112, 120, 0.9)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    animation: 'fadeInSubtitle 1s ease-out 0.5s backwards',
  },
  loadingBar: {
    width: '200px',
    height: '4px',
    background: 'rgba(107, 112, 120, 0.3)',
    borderRadius: '2px',
    overflow: 'hidden',
    border: '1px solid rgba(107, 112, 120, 0.5)',
  },
  loadingFill: {
    height: '100%',
    background: 'linear-gradient(90deg, rgba(107, 112, 120, 0.6), rgba(107, 112, 120, 1))',
    animation: 'loadingFill 3s ease-in-out forwards',
  },
};

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes scaleInLogo {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeInSubtitle {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes loadingFill {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes fadeOutIntro {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      pointer-events: none;
    }
  }
`;
document.head.appendChild(styleSheet);