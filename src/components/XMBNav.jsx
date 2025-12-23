import { useState, useEffect } from 'react';

export default function XMBNav({ onCategoryChange, currentCategory, skillSelected = false, onThemeChange }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [themeDark, setThemeDark] = useState(false);
  const [inSkillsCarousel, setInSkillsCarousel] = useState(false);

  const categories = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: (
        <svg viewBox="0 0 28 28" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 12 12 3 21 12" />
          <polyline points="5 12 5 19 19 19 19 12" />
        </svg>
      ),  
    },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: (
        <svg viewBox="0 0 28 28" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12,3 21,19 3,19" />
        </svg>
      ), 
    },
    { 
      id: 'experience',
      label: 'Experience',
      icon: (
        <svg viewBox="0 0 28 28" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      ), 
    },
    { 
      id: 'skills',
      label: 'Skills',
      icon: (
        <svg viewBox="0 0 28 28" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="4" x2="24" y2="24" />
          <line x1="24" y1="4" x2="4" y2="24" />
        </svg>
      ), 
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: (
        <svg viewBox="0 0 28 28" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" />
        </svg>
      ), 
      
    },
  ];

  // Notify parent when theme changes
  useEffect(() => {
    onThemeChange?.(themeDark);
  }, [themeDark, onThemeChange]);

  const hapticFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const selectionHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
  };

  const playNavigationSound = () => {
    const audio = new Audio('/audio_nav.mp3');
    audio.volume = 0.7;
    audio.play();
  };
  
  const playSelectionSound = () => {
    const audio = new Audio('/audio_nav.mp3');
    audio.volume = 0.7;
    audio.play();
  };

  const handleCategoryChange = (index) => {
    setActiveIndex(index);
    onCategoryChange(categories[index].id);
    hapticFeedback();
    playNavigationSound();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      // If in skills carousel, block left/right from changing categories
      if (inSkillsCarousel && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newIndex = (activeIndex - 1 + categories.length) % categories.length;
        setActiveIndex(newIndex);
        onCategoryChange(categories[newIndex].id);
        hapticFeedback();
        playNavigationSound();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newIndex = (activeIndex + 1) % categories.length;
        setActiveIndex(newIndex);
        onCategoryChange(categories[newIndex].id);
        hapticFeedback();
        playNavigationSound();
      } else if (e.key === 'ArrowDown') {
        if (categories[activeIndex].id === 'skills') {
          e.preventDefault();
          setInSkillsCarousel(true);
        }
      } else if (e.key === 'ArrowUp') {
        if (inSkillsCarousel) {
          e.preventDefault();
          setInSkillsCarousel(false);
        }
      } else if (e.key === 'Enter') {
        selectionHaptic();
        playSelectionSound();
      } else if (e.key === 'Escape') {
        setInSkillsCarousel(false);
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeIndex, categories, inSkillsCarousel]);

  return (
    <div style={{
      ...styles.root,
      background: 'transparent'
    }}>
      {/* Light/Dark Mode Toggle */}
      <div style={styles.toggleContainer}>
        <button 
          style={{
            ...styles.toggleButton,
            ...(themeDark ? styles.toggleButtonActive : {}),
            color: themeDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.6)'
          }}
          onClick={() => setThemeDark(!themeDark)}
        >
          {themeDark ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
      {/* Main XMB Bar */}
      <div style={styles.xmbBar}>
        {/* Scrolling items container */}
        <div style={styles.itemsWrapper}>
          {categories.map((category, index) => {
            const distance = index - activeIndex;
            const isActive = index === activeIndex;
            const scale = Math.max(0.5, 1 - Math.abs(distance) * 0.2);
            const opacity = Math.max(0.3, 1 - Math.abs(distance) * 0.25);
            const zIndex = 100 - Math.abs(distance);
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryChange(index)}
                style={{
                  ...styles.itemContainer,
                  transform: `translateX(${distance * 140}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
              >
                <div style={{
                  ...styles.icon, 
                  ...(isActive ? styles.iconActive : {}), 
                  ...(category.id === 'skills' && inSkillsCarousel && !skillSelected ? styles.iconSkillsGlow : {}),
                  color: themeDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                  ...(isActive && themeDark ? {color: 'rgba(0, 0, 0, 0.9)'} : {}),
                }}>
                  {category.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom navigation dots with category label */}
      <div style={styles.dotContainer}>
        <div style={{...styles.categoryLabelBottom, color: themeDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}}>{categories[activeIndex].label}</div>
        <div style={styles.dotIndicator}>
          {categories.map((_, index) => (
            <div
              key={index}
              onClick={() => handleCategoryChange(index)}
              style={{
                ...styles.dot,
                ...(index === activeIndex ? styles.dotActive : {}),
                background: themeDark ? (index === activeIndex ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)') : (index === activeIndex ? 'rgba(107, 112, 120, 0.8)' : 'rgba(255, 255, 255, 0.3)'),
                borderColor: themeDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
              }}
            />
          ))}
        </div>
      </div>

      
    </div>
  );
}

const styles = {
  root: {
    position: 'fixed',
    bottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '15vh',
    zIndex: 50,
    pointerEvents: 'none',
    transition: 'background 0.6s ease',
  },
  toggleContainer: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 100,
    pointerEvents: 'auto',
  },
  toggleButton: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(107, 112, 120, 0.2)',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  toggleButtonActive: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(107, 112, 120, 0.4)',
    color: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 0 16px rgba(107, 112, 120, 0.4)',
    animation: 'toggleGlow 2s ease-in-out infinite',
  },
  xmbBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '200px',
    pointerEvents: 'auto',
    perspective: '1000px',
  },
  itemsWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
  },
  icon: {
    fontSize: '64px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActive: {
    fontSize: '70px',
    textShadow: '0 0 15px rgba(107, 112, 120, 0.8)',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  iconSkillsGlow: {
    animation: 'navSkillsGlow 2s ease-in-out infinite',
    textShadow: '0 0 20px rgba(107, 112, 120, 0.9), 0 0 40px rgba(107, 112, 120, 0.6)',
  },
  dotContainer: {
    position: 'fixed',
    bottom: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    pointerEvents: 'auto',
  },
  categoryLabelBottom: {
    fontSize: '11px',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    animation: 'fadeInLabel 0.4s ease-out',
    textAlign: 'center',
  },
  dotIndicator: {
    display: 'flex',
    gap: '12px',
    pointerEvents: 'auto',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  dotActive: {
    width: '24px',
    height: '8px',
    borderRadius: '4px',
    background: 'rgba(107, 112, 120, 0.8)',
    boxShadow: '0 0 12px rgba(107, 112, 120, 0.6)',
    borderColor: 'rgba(107, 112, 120, 0.6)',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    pointerEvents: 'auto',
    animation: 'fadeIn 0.3s ease',
  },
  modalContent: {
    background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.8), rgba(40, 40, 40, 0.8))',
    border: '1px solid rgba(107, 112, 120, 0.3)',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '600px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  modalHeader: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '20px',
    textShadow: '0 0 15px rgba(107, 112, 120, 0.5)',
  },
  modalBody: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  modalFooter: {
    display: 'flex',
    gap: '10px',
  },
  modalButton: {
    padding: '12px 30px',
    background: 'rgba(107, 112, 120, 0.5)',
    border: '1px solid rgba(107, 112, 120, 0.6)',
    color: '#ffffff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes navSkillsGlow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(107, 112, 120, 0.9), 0 0 40px rgba(107, 112, 120, 0.6);
    }
    50% {
      text-shadow: 0 0 30px rgba(107, 112, 120, 1), 0 0 60px rgba(107, 112, 120, 0.8);
    }
  }

  @keyframes fadeInLabel {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes toggleGlow {
    0%, 100% {
      box-shadow: 0 0 16px rgba(107, 112, 120, 0.4);
    }
    50% {
      box-shadow: 0 0 24px rgba(107, 112, 120, 0.6);
    }
  }

  svg {
    transition: all 0.5s ease;
    transform-origin: center;
  }

  button[style*="toggleButtonActive"] svg {
    animation: iconRotate 0.6s ease;
  }

  @keyframes iconRotate {
    0% {
      opacity: 0;
      transform: rotate(-180deg) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
  }

  button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: rgba(107, 112, 120, 0.4) !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }
`;
if (!document.head.querySelector('style[data-xmb-nav]')) {
  styleSheet.setAttribute('data-xmb-nav', 'true');
  document.head.appendChild(styleSheet);
}