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

export default function TileSystem({ selectedCategory = 'home', lightMode = false, onSkillSelect }) {
  const [selectedTile, setSelectedTile] = useState(null);
  const [skillRotation, setSkillRotation] = useState(0);
  const [inSkillsCarousel, setInSkillsCarousel] = useState(false);

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
              Hi, I'm <span style={{fontWeight: '900', color: lightMode ? '#1a1a1a' : '#ffffff'}}>Ramsey Frank</span>.
              <br />
              I'm <span style={{fontWeight: '900', color: lightMode ? '#FF6B35' : '#6b7078'}}>learning to build</span> things on the web.
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

  // Sync carousel state with category changes
  useEffect(() => {
    if (selectedCategory !== 'skills') {
      setInSkillsCarousel(false);
      setSelectedTile(null);
      onSkillSelect?.(false);
    }
  }, [selectedCategory, onSkillSelect]);

  // Update skill selection state
  useEffect(() => {
    const isSkillSelected = selectedCategory === 'skills' && selectedTile !== null;
    onSkillSelect?.(isSkillSelected);
  }, [selectedTile, selectedCategory, onSkillSelect]);

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
        if (!inSkillsCarousel) {
          // Navigation at nav level
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setInSkillsCarousel(true);
            playNavigationSound();
          }
        } else if (selectedTile) {
          // If a skill tile is selected, left/right navigate through skills
          const currentIndex = SKILLS.findIndex(s => s.id === selectedTile);
          
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentIndex < SKILLS.length - 1) {
              setSelectedTile(SKILLS[currentIndex + 1].id);
              setSkillRotation((prev) => prev + (360 / SKILLS.length));
              playNavigationSound();
            }
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentIndex > 0) {
              setSelectedTile(SKILLS[currentIndex - 1].id);
              setSkillRotation((prev) => prev - (360 / SKILLS.length));
              playNavigationSound();
            }
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setInSkillsCarousel(false);
            setSelectedTile(null);
            playNavigationSound();
          }
        } else {
          // Carousel visible but no skill selected yet
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setSkillRotation((prev) => prev + (360 / SKILLS.length));
            playNavigationSound();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            setSkillRotation((prev) => prev - (360 / SKILLS.length));
            playNavigationSound();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setInSkillsCarousel(false);
            playNavigationSound();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [current, inSkillsCarousel, selectedTile]);

  // Calculate vertical offset based on selected tile
  const getContainerOffset = () => {
    if (current.type === 'text') {
      const tileIndex = current.tiles.findIndex(t => t.id === selectedTile);
      if (tileIndex > 0) {
        return tileIndex * 220;
      }
    }
    return 0;
  };

  if (!current) return null;

  const getTileStyles = () => ({
    ...styles.tile,
    background: lightMode 
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(245, 248, 255, 0.7))'
      : 'linear-gradient(135deg, rgba(60, 60, 60, 0.25), rgba(40, 40, 40, 0.25))',
    border: lightMode 
      ? '1px solid rgba(0, 0, 0, 0.1)'
      : '1px solid rgba(107, 112, 120, 0.25)',
    color: lightMode ? '#1a1a1a' : 'white',
  });

  const getTileActiveStyles = () => ({
    ...styles.tileActive,
    background: lightMode 
      ? 'linear-gradient(135deg, rgba(255, 200, 124, 0.3), rgba(255, 180, 100, 0.3))'
      : 'linear-gradient(135deg, rgba(60, 60, 60, 0.25), rgba(40, 40, 40, 0.25))',
    border: lightMode 
      ? '2px solid rgba(255, 107, 53, 0.6)'
      : '2px solid rgba(107, 112, 120, 0.8)',
    boxShadow: lightMode
      ? '0 0 20px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(0, 0, 0, 0.05)'
      : '0 0 20px rgba(107, 112, 120, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  });

  const getSkillTileStyles = () => ({
    ...styles.skillTile,
    background: lightMode
      ? 'linear-gradient(135deg, rgba(255, 240, 220, 0.6), rgba(255, 230, 200, 0.6))'
      : 'linear-gradient(135deg, rgba(40, 40, 55, 0.5), rgba(30, 30, 45, 0.5))',
    border: lightMode
      ? '1px solid rgba(255, 107, 53, 0.2)'
      : '1px solid rgba(107, 112, 120, 0.2)',
    color: lightMode ? '#1a1a1a' : 'white',
  });

  const getSkillTileActiveStyles = () => ({
    ...styles.skillTileActive,
    background: lightMode
      ? 'linear-gradient(135deg, rgba(255, 150, 80, 0.5), rgba(255, 120, 40, 0.5))'
      : 'linear-gradient(135deg, rgba(100, 110, 130, 0.6), rgba(70, 80, 100, 0.6))',
    border: lightMode
      ? '1.5px solid rgba(255, 107, 53, 0.7)'
      : '1.5px solid rgba(107, 112, 120, 0.5)',
    boxShadow: lightMode
      ? '0 8px 24px rgba(255, 107, 53, 0.3)'
      : '0 8px 24px rgba(107, 112, 120, 0.3)',
  });

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
                ...getTileStyles(),
                ...(selectedTile === tile.id ? getTileActiveStyles() : {}),
                animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                marginTop: idx === 0 && selectedTile && current.tiles[1]?.id === selectedTile ? '-350px' : idx === 1 && selectedTile && current.tiles[1]?.id === selectedTile ? '350px' : '0',
                transition: 'margin-top 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), all 0.3s ease',
              }}
            >
              <h3 style={{...styles.tileHeading, color: lightMode ? '#1a1a1a' : '#ffffff'}}>{tile.heading}</h3>
              <p style={{...styles.tileContent, color: lightMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.75)'}}>{tile.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          ...styles.skillsScene,
          background: lightMode
            ? 'radial-gradient(ellipse at center, rgba(255, 107, 53, 0.05) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(107, 112, 120, 0.05) 0%, transparent 70%)',
        }}>
          <div style={styles.skillsCarousel}>
            <div
              style={{
                ...styles.skillsCarouselInner,
                transform: `rotateY(${skillRotation}deg)`,
              }}
            >
              {SKILLS.map((skill, idx) => {
                const anglePerItem = 360 / SKILLS.length;
                const selectedIdx = SKILLS.findIndex(s => s.id === selectedTile);
                const isSelected = selectedIdx === idx;
                
                return (
                  <div
                    key={skill.id}
                    style={{
                      ...styles.skillItem,
                      transform: `rotateY(${idx * anglePerItem}deg) translateZ(220px)`,
                    }}
                    onClick={() => {
                      setSelectedTile(skill.id);
                      const selectedIndex = SKILLS.findIndex(s => s.id === skill.id);
                      const currentIndex = selectedIdx;
                      const diff = selectedIndex - currentIndex;
                      const rotation = diff * (360 / SKILLS.length);
                      setSkillRotation((prev) => prev + rotation);
                      playNavigationSound();
                    }}
                  >
                    <div 
                      style={{
                        ...getSkillTileStyles(),
                        ...(isSelected ? getSkillTileActiveStyles() : {}),
                      }}
                    >
                      <div style={styles.emoji}>{skill.emoji}</div>
                      <div style={{...styles.skillName, color: lightMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'}}>{skill.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{
              ...styles.centerFocus,
              ...(!lightMode ? {} : {
                borderColor: 'rgba(255, 107, 53, 0.3)'
              })
            }}>
              <div style={{
                ...styles.focusRing,
                borderColor: lightMode ? 'rgba(255, 107, 53, 0.3)' : 'rgba(107, 112, 120, 0.3)',
                boxShadow: lightMode
                  ? '0 0 30px rgba(255, 107, 53, 0.2) inset'
                  : '0 0 30px rgba(107, 112, 120, 0.2) inset',
              }} />
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
    maxWidth: '500px',
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
    gap: '32px',
    marginTop: '60px',
    marginBottom: '60px',
  },
  tile: {
    background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.25), rgba(40, 40, 40, 0.25))',
    border: '1px solid rgba(107, 112, 120, 0.25)',
    borderRadius: '12px',
    padding: '60px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    color: 'white',
    minHeight: '380px',
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
    perspective: '1000px',
    width: '100%',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    perspectiveOrigin: 'center center',
    background: 'radial-gradient(ellipse at center, rgba(107, 112, 120, 0.05) 0%, transparent 70%)',
  },
  skillsCarousel: {
    position: 'relative',
    width: '500px',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillsCarouselInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, rgba(40, 40, 55, 0.5), rgba(30, 30, 45, 0.5))',
    border: '1px solid rgba(107, 112, 120, 0.2)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
  },
  skillTileActive: {
    background: 'linear-gradient(135deg, rgba(100, 110, 130, 0.6), rgba(70, 80, 100, 0.6))',
    border: '1.5px solid rgba(107, 112, 120, 0.5)',
    boxShadow: '0 8px 24px rgba(107, 112, 120, 0.3)',
    backdropFilter: 'blur(12px)',
    animation: 'skillGlow 2s ease-in-out infinite',
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
    transition: 'transform 0.4s ease',
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

  @keyframes skillGlow {
    0%, 100% {
      box-shadow: 0 8px 24px rgba(107, 112, 120, 0.3), inset 0 0 12px rgba(107, 112, 120, 0.1);
      border-color: rgba(107, 112, 120, 0.5);
    }
    50% {
      box-shadow: 0 12px 36px rgba(107, 112, 120, 0.5), inset 0 0 16px rgba(107, 112, 120, 0.2);
      border-color: rgba(107, 112, 120, 0.7);
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
if (!document.head.querySelector('style[data-tile-system]')) {
  styleSheet.setAttribute('data-tile-system', 'true');
  document.head.appendChild(styleSheet);
}