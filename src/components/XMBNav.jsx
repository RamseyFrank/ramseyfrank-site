import { useState, useEffect } from 'react';

export default function XMBNav({ onCategoryChange, currentCategory, skillSelected }) {
  const [activeIndex, setActiveIndex] = useState(0);
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
    <div style={styles.root}>
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
                <div style={{...styles.icon, ...(isActive ? styles.iconActive : {}), ...(category.id === 'skills' && inSkillsCarousel && !skillSelected ? styles.iconSkillsGlow : {})}}>
                  {category.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom navigation dots with category label */}
      <div style={styles.dotContainer}>
        <div style={styles.categoryLabelBottom}>{categories[activeIndex].label}</div>
        <div style={styles.dotIndicator}>
          {categories.map((_, index) => (
            <div
              key={index}
              onClick={() => handleCategoryChange(index)}
              style={{
                ...styles.dot,
                ...(index === activeIndex ? styles.dotActive : {}),
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
    top: '15vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    pointerEvents: 'none',
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
`;
document.head.appendChild(styleSheet);