import { useState, useEffect } from 'react';

const SKILLS = [
  { id: 1, emoji: '⚛️', name: 'React' },
  { id: 2, emoji: '🟨', name: 'JavaScript' },
  { id: 3, emoji: '🎨', name: 'CSS' },
  { id: 4, emoji: '📦', name: 'Node.js' },
  { id: 5, emoji: '🟦', name: 'Three.js' },
  { id: 6, emoji: '🎯', name: 'WebGL' },
  { id: 7, emoji: '💾', name: 'SQL' },
  { id: 8, emoji: '🚀', name: 'Vite' },
  { id: 9, emoji: '🎭', name: 'UI/UX' },
];

export default function TileSystem({ selectedCategory = 'home' }) {
  const [selectedTile, setSelectedTile] = useState(null);
  const [skillRotation, setSkillRotation] = useState(0);

  const playNavigationSound = () => {
    const audio = new Audio('/audio_nav.mp3');
    audio.volume = 0.7;
    audio.play();
  };

  const categories = {
    home: {
      title: 'Home',
      type: 'text',
      tiles: [
        {
          id: 1,
          heading: '',
          content: (
            <div style={{fontSize: '24px', lineHeight: '1.8'}}>
              Hi, I'm <span style={{fontWeight: '900', color: '#ffffff'}}>Ramsey Frank</span>.
              <br />
              I'm <span style={{fontWeight: '900', color: '#6b7078'}}>learning to build</span> things on the web.
            </div>
          )
        }
      ]
    },
    projects: {
      title: 'Projects',
      type: 'text',
      tiles: [
        {
          id: 1,
          heading: 'Projects',
          content: 'A PS3-inspired navigation system with haptic feedback and audio cues.'
        }
      ]
    },
    experience: {
      title: 'Experience',
      type: 'text',
      tiles: [
        {
          id: 1,
          heading: 'Experience',
          content: 'A collection of my professional experience and journey.'
        }
      ]
    },
    skills: {
      title: 'Skills',
      type: 'skills'
    },
    contact: {
      title: 'Contact',
      type: 'text',
      tiles: [
        {
          id: 1,
          heading: 'Get In Touch',
          content: 'Have a project in mind? Let\'s connect and create something amazing together.'
        },
        {
          id: 2,
          heading: 'Social',
          content: 'Find me on GitHub, Twitter, and LinkedIn for updates on my latest work.'
        }
      ]
    }
  };

  const current = categories[selectedCategory];

  useEffect(() => {
    setSelectedTile(null);
  }, [selectedCategory]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (current.type === 'text') {
        const tiles = current.tiles;
        const currentIndex = tiles.findIndex(t => t.id === selectedTile);
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, tiles.length - 1);
          setSelectedTile(tiles[nextIndex].id);
          playNavigationSound();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
          setSelectedTile(tiles[prevIndex].id);
          playNavigationSound();
        }
      } else if (current.type === 'skills') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSkillRotation((prev) => prev + (360 / SKILLS.length));
          playNavigationSound();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSkillRotation((prev) => prev - (360 / SKILLS.length));
          playNavigationSound();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [current]);

  // Calculate vertical offset based on selected tile
  const getContainerOffset = () => {
    if (current.type === 'text') {
      const tileIndex = current.tiles.findIndex(t => t.id === selectedTile);
      if (tileIndex > 0) {
        return tileIndex * 220; // 180px tile + 24px gap + 16px padding
      }
    }
    return 0;
  };

  if (!current) return null;

  return (
    <div style={{
      ...styles.container,
      top: '400px',
      transform: `translateX(-50%) translateY(-${getContainerOffset()}px)`
    }}>
      {current.type === 'text' ? (
        <div style={styles.tilesContainer}>
          {current.tiles.map((tile, idx) => (
            <div
              key={tile.id}
              onClick={() => {
                setSelectedTile(tile.id);
                playNavigationSound();
              }}
              style={{
                ...styles.tile,
                ...(selectedTile === tile.id ? styles.tileActive : {}),
                animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                marginTop: idx === 0 && selectedTile && current.tiles[1]?.id === selectedTile ? '-350px' : idx === 1 && selectedTile && current.tiles[1]?.id === selectedTile ? '350px' : '0',
                transition: 'margin-top 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <h3 style={styles.tileHeading}>{tile.heading}</h3>
              <p style={styles.tileContent}>{tile.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.skillsScene}>
          <div style={styles.skillsCarousel}>
            <div
              style={{
                ...styles.skillsCarouselInner,
                transform: `rotateY(${skillRotation}deg)`,
              }}
            >
              {SKILLS.map((skill, idx) => {
                const anglePerItem = 360 / SKILLS.length;
                return (
                  <div
                    key={skill.id}
                    style={{
                      ...styles.skillItem,
                      transform: `rotateY(${idx * anglePerItem}deg) translateZ(280px)`,
                    }}
                    onClick={() => {
                      setSelectedTile(skill.id);
                      playNavigationSound();
                    }}
                  >
                    <div style={{...styles.skillTile, ...(selectedTile === skill.id ? styles.skillTileActive : {})}}>
                      <div style={styles.emoji}>{skill.emoji}</div>
                      <div style={styles.skillName}>{skill.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={styles.centerFocus}>
              <div style={styles.focusRing} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    left: '50%',
    width: '90%',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    zIndex: 50,
    pointerEvents: 'auto',
    fontFamily: 'sans-serif',
    paddingBottom: '40px',
    animation: 'fadeInCategory 0.4s ease-in-out',
    transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  tilesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  tile: {
    background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.25), rgba(40, 40, 40, 0.25))',
    border: '1px solid rgba(107, 112, 120, 0.25)',
    borderRadius: '12px',
    padding: '24px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    color: 'white',
    minHeight: '180px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    alignItems: 'center',
    textAlign: 'center',
  },
  tileActive: {
    background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.25), rgba(40, 40, 40, 0.25))',
    border: '2px solid rgba(107, 112, 120, 0.8)',
    boxShadow: '0 0 20px rgba(107, 112, 120, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    animation: 'glowBorder 2s ease-in-out infinite',
  },
  tileHeading: {
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    color: '#ffffff',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '0.5px',
  },
  tileContent: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.75)',
    margin: 0,
    lineHeight: '1.8',
    letterSpacing: '0.3px',
  },
  skillsScene: {
    perspective: '1200px',
    width: '100%',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    perspectiveOrigin: 'center center',
  },
  skillsCarousel: {
    position: 'relative',
    width: '600px',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspectiveOrigin: 'center center',
  },
  skillsCarouselInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    backfaceVisibility: 'visible',
  },
  skillItem: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
  },
  skillTile: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.4), rgba(40, 40, 40, 0.4))',
    border: '1px solid rgba(107, 112, 120, 0.3)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  skillTileActive: {
    background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.25), rgba(40, 40, 40, 0.25))',
    border: '2px solid rgba(107, 112, 120, 0.8)',
    boxShadow: '0 0 20px rgba(107, 112, 120, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    animation: 'glowBorder 2s ease-in-out infinite',
  },
  centerFocus: {
    position: 'absolute',
    width: '160px',
    height: '160px',
    pointerEvents: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  focusRing: {
    width: '100%',
    height: '100%',
    border: '2px solid rgba(107, 112, 120, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 0 30px rgba(107, 112, 120, 0.2) inset',
  },
  emoji: {
    fontSize: '48px',
    transition: 'transform 0.3s ease',
  },
  skillName: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: '0.5px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
};

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fallUp {
    0% {
      opacity: 0;
      transform: translateY(100px) scale(0.7);
    }
    85% {
      opacity: 1;
      transform: translateY(-3px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fadeInCategory {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes glowBorder {
    0%, 100% {
      box-shadow: 0 0 20px rgba(107, 112, 120, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      border-color: rgba(107, 112, 120, 0.8);
    }
    50% {
      box-shadow: 0 0 40px rgba(107, 112, 120, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.3);
      border-color: rgba(107, 112, 120, 1);
    }
  }

  div::-webkit-scrollbar {
    width: 8px;
  }

  div::-webkit-scrollbar-track {
    background: transparent;
  }

  div::-webkit-scrollbar-thumb {
    background: rgba(107, 112, 120, 0.3);
    border-radius: 4px;
  }

  div::-webkit-scrollbar-thumb:hover {
    background: rgba(107, 112, 120, 0.5);
  }
`;
document.head.appendChild(styleSheet);