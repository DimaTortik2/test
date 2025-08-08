
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';



//   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
// ВАЖНО ЧТОБЫ НЕ БЫЛО ПРИБЛИЖЕНИЯ



const styles = {
	// Главный контейнер, темный фон, на весь экран
	appContainer: {
		backgroundColor: '#222',
		color: 'white',
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
		position: 'relative', // TS теперь видит это как 'relative', а не string
		fontFamily: 'sans-serif',
	},
	// Хэдер со стрелкой
	header: {
		position: 'fixed', // TS теперь видит это как 'fixed'
		top: 0,
		left: 0,
		width: '100%',
		padding: '20px',
		boxSizing: 'border-box',
		zIndex: 10,
		background: '#212121',
	},
	backArrow: {
		fontSize: '30px',
		cursor: 'pointer',
	},
	// Футер с кнопками
	footer: {
		position: 'fixed', // TS теперь видит это как 'fixed'
		bottom: 0,
		left: 0,
		width: '100%',
		padding: '20px 25px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		boxSizing: 'border-box',
		zIndex: 10,
		background: '#212121',
	},
	footerIcon: {
		fontSize: '28px',
		cursor: 'pointer',
	},
	joinButton: {
		padding: '15px 45px',
		backgroundColor: '#e0e0e0',
		color: '#000',
		border: 'none',
		borderRadius: '30px',
		fontSize: '16px',
		fontWeight: 500,
		cursor: 'pointer',
	},
	// Сам холст для панорамирования
	canvasWrapper: {
		width: '100%',
		height: '100vh',
	},
	// Внутренний контейнер с контентом, который мы двигаем
	contentWrapper: {
		position: 'relative', // TS теперь видит это как 'relative'
		width: '100%',
		height: '1800px',
	},
	// Стили для кружков-узлов
	node: {
		width: '90px',
		height: '90px',
		backgroundColor: '#555',
		border: '2px solid white',
		borderRadius: '50%',
		position: 'absolute', // TS теперь видит это как 'absolute'
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '24px',
		fontWeight: 'bold',
		zIndex: 5,
	},
	// Стили для номера рядом с кружком
	nodeLabel: {
		position: 'absolute', // TS теперь видит это как 'absolute'
		transform: 'translateX(-40px)',
		fontSize: '20px',
		color: '#aaa',
	},
} as const // <--- ВОТ ИСПРАВЛЕНИЕ

// --- Данные для узлов ---
const nodesData = [
  { id: 1,  top: 150, left: 'calc(50% - 100px)' },
  { id: 2,  top: 280, left: 'calc(50% + 50px)'  },
  { id: 3,  top: 410, left: 'calc(50% - 100px)' },
  { id: 4,  top: 540, left: 'calc(50% + 50px)'  },
  { id: 5,  top: 670, left: 'calc(50% - 100px)' },
  { id: 6,  top: 800, left: 'calc(50% + 50px)'  },
  { id: 7,  top: 930, left: 'calc(50% - 100px)' },
  { id: 8,  top: 1060,left: 'calc(50% + 50px)'  },
  { id: 9,  top: 1190,left: 'calc(50% - 100px)' },
  { id: 10, top: 1320,left: 'calc(50% + 50px)'  },
  { id: 11, top: 1450,left: 'calc(50% - 100px)' },
];

function App() {
  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <span style={styles.backArrow}>←</span>
      </header>
      
      <TransformWrapper
        limitToBounds={true}
        minScale={0.2}
        maxScale={3}
        initialScale={1}
        initialPositionY={-100} // Сразу немного проскроллим вниз
        panning={{
          disabled: false,
          velocityDisabled: false,
        }}
        doubleClick={{ disabled: true }}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent
          wrapperStyle={styles.canvasWrapper}
          contentStyle={styles.contentWrapper}
        >
          {nodesData.map(node => (
            <div
              key={node.id}
              style={{
                ...styles.node,
                top: `${node.top}px`,
                left: node.left,
              }}
            >
              <span style={{...styles.nodeLabel, left: node.id % 2 === 0 ? '120px' : '-50px'}}>
                {node.id}
              </span>
            </div>
          ))}

          {/* Соединительные линии (грязный вариант) */}
          <div style={{ position: 'absolute', top: 215, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 345, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(-35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 475, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 605, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(-35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 735, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 865, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(-35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 995, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 1125, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(-35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 1255, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(35deg)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: 1385, left: 'calc(50% - 45px)', width: '155px', height: '2px', background: 'white', transform: 'rotate(-35deg)', zIndex: 1 }}></div>

        </TransformComponent>
      </TransformWrapper>

      <footer style={styles.footer}>
        <span style={styles.footerIcon}>👥</span>
        <button style={styles.joinButton}>Вступить</button>
        <span style={styles.footerIcon}>🔔</span>
      </footer>
    </div>
  );
}

export default App;
