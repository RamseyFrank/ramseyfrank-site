export default function TileSystem({ selectedCategory = 'home' }) {
    const categories = {
      home: {
        title: 'Home',
        icon: '⌂',
        tiles: [
          {
            id: 1,
            heading: 'Welcome',
            content: 'Hi, I\'m Ramsey Frank. I\'m learning to build things on the web.'
          },
          
        ]
      },
      projects: {
        title: 'Projects',
        icon: '◆',
        tiles: [
          {
            id: 1,
            heading: 'XMB Navigation',
            content: 'A PS3-inspired navigation system with haptic feedback and audio cues.'
          },
          {
            id: 2,
            heading: 'Particle Effects',
            content: 'WebGL-powered particle system with 3D camera controls and real-time rendering.'
          }
        ]
      },
      about: {
        title: 'About',
        icon: '●',
        tiles: [
          {
            id: 1,
            heading: 'Background',
            content: 'Full-stack developer passionate about creating immersive digital experiences.'
          },
          {
            id: 2,
            heading: 'Skills',
            content: 'React, JavaScript, Three.js, WebGL, CSS, Node.js, and creative problem-solving.'
          }
        ]
      },
      contact: {
        title: 'Contact',
        icon: '■',
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
  
    if (!current) return null;
  
    return (
      <div style={styles.container}>
        {/* Tiles Container */}
        <div style={styles.tilesContainer}>
          {current.tiles.map((tile, idx) => (
            <div
              key={tile.id}
              style={{
                ...styles.tile,
                animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
              }}
            >
              <h3 style={styles.tileHeading}>{tile.heading}</h3>
              <p style={styles.tileContent}>{tile.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      position: 'fixed',
      top: '400px',           // Below the nav icons
      left: '50%',
      transform: 'translateX(-50%)',  // Center it horizontally
      width: '90%',           // Take up 90% of screen width
      maxWidth: '900px',      // But not too wide
      display: 'flex',
      flexDirection: 'column', // Stack tiles vertically
      gap: '24px',
      zIndex: 50,
      pointerEvents: 'auto',
      fontFamily: 'sans-serif',
      paddingBottom: '40px',
    },
    tilesContainer: {
      display: 'flex',        // Changed from grid
      flexDirection: 'column', // Stack in a column
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
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
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
      fontSize: '13px',
      color: 'rgba(255, 255, 255, 0.75)',
      margin: 0,
      lineHeight: '1.6',
      letterSpacing: '0.3px',
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