export default function TileSystem({ selectedCategory = 'home' }) {
  const categories = {
    home: {
      title: 'Home',
      icon: '⌂',
      type: 'text',
      tiles: [
        {
          id: 1,
          heading: 'Welcome',
          content: 'Hi, I\'m Ramsey Frank. I\'m learning to build things on the web.'
        }
      ]
    },
    projects: {
      title: 'Projects',
      icon: '◆',
      type: 'text',
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
      type: 'skills'
    },
    contact: {
      title: 'Contact',
      icon: '■',
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

  const skills = [
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

  const current = categories[selectedCategory];

  if (!current) return null;

  return (
    <div style={styles.container}>
      {current.type === 'text' ? (
        // Text tiles for Home, Projects, Contact
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
      ) : (
        // Skills grid for About
        <div style={styles.skillsGrid}>
          {skills.map((skill, idx) => (
            <div
              key={skill.id}
              style={{
                ...styles.skillTile,
                animation: `fallUp 0.4s ease-out ${idx * 0.08}s both`
              }}
            >
              <div style={styles.emoji}>{skill.emoji}</div>
              <div style={styles.skillName}>{skill.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: '400px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    zIndex: 50,
    pointerEvents: 'auto',
    fontFamily: 'sans-serif',
    paddingBottom: '40px',
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
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.75)',
    margin: 0,
    lineHeight: '1.6',
    letterSpacing: '0.3px',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  skillTile: {
    background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.3), rgba(40, 40, 40, 0.3))',
    border: '1px solid rgba(107, 112, 120, 0.25)',
    borderRadius: '12px',
    padding: '0',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    aspectRatio: '1',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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