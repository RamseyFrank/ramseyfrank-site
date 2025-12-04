import { useState, useEffect } from 'react';

export default function XMBNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: '⌂',
      description: 'Welcome'
    },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: '◆',
      description: 'My Work'
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: '●',
      description: 'About Me'
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: '■',
      description: 'Get In Touch'
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
    audio.volume = 0.3;
    audio.play();
  };
  
  const playSelectionSound = () => {
    const audio = new Audio('/audio_nav.mp3');
    audio.volume = 0.3;
    audio.play();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        hapticFeedback();
        playNavigationSound('left');
        setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
      } else if (e.key === 'ArrowRight') {
        hapticFeedback();
        playNavigationSound('right');
        setActiveIndex((prev) => (prev + 1) % categories.length);
      } else if (e.key === 'Enter') {
        selectionHaptic();
        playSelectionSound();
        setSelectedCategory(categories[activeIndex]);
      } else if (e.key === 'Escape') {
        setSelectedCategory(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [categories, activeIndex]);

  return (
    <div style={styles.root}>
      {/* Main XMB Bar */}
      <div style={styles.xmbBar}>
        {/* Left gradient accent */}
        <div style={styles.leftAccent} />
        
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
                onClick={() => setActiveIndex(index)}
                style={{
                  ...styles.itemContainer,
                  transform: `translateX(${distance * 140}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
              >
                <div style={{...styles.icon, ...(isActive ? styles.iconActive : {})}}>
                  {category.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right gradient accent */}
        <div style={styles.rightAccent} />
      </div>

      {/* Bottom navigation dots */}
      <div style={styles.dotIndicator}>
        {categories.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              ...styles.dot,
              ...(index === activeIndex ? styles.dotActive : {}),
            }}
          />
        ))}
      </div>

      {/* Detail view modal */}
      {selectedCategory && (
        <div style={styles.modal} onClick={() => setSelectedCategory(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>{selectedCategory.label}</div>
            <div style={styles.modalBody}>
              <p>Content for {selectedCategory.label}</p>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.modalButton} onClick={() => setSelectedCategory(null)}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}
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
  leftAccent: {
    display: 'none'
  },
  rightAccent: {
    display: 'none'
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
    transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
  },
  icon: {
    fontSize: '64px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  iconActive: {
    fontSize: '70px',
    textShadow: '0 0 15px rgba(107, 112, 120, 0.8)',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  dotIndicator: {
    position: 'fixed',
    bottom: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
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
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);