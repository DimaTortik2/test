import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

/*
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
 *   ВАЖНО: Убедитесь, что этот мета-тег добавлен в ваш public/index.html,
 *   чтобы предотвратить масштабирование всей страницы на мобильных устройствах.
 */

// --- Константы для генерации ---
const TOTAL_NODES = 30
const NODE_VERTICAL_SPACING = 130 // Расстояние по вертикали между узлами
const NODE_START_TOP = 150 // Начальная позиция самого верхнего узла
const CONTENT_HEIGHT = NODE_START_TOP + TOTAL_NODES * NODE_VERTICAL_SPACING // Вычисляем общую высоту контента

// --- Генерация данных для узлов ---
const nodesData = Array.from({ length: TOTAL_NODES }, (_, i) => {
	const id = i + 1
	const top = NODE_START_TOP + i * NODE_VERTICAL_SPACING
	const left =
		id % 2 !== 0
			? 'calc(50% - 100px)' // Нечетные слева
			: 'calc(50% + 50px)' // Четные справа

	return { id, top, left }
})

// --- Стили ---
const styles = {
	appContainer: {
		backgroundColor: '#222',
		color: 'white',
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
		position: 'relative',
		fontFamily: 'sans-serif',
	},
	header: {
		position: 'fixed',
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
	footer: {
		position: 'fixed',
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
	canvasWrapper: {
		width: '100%',
		height: '100vh',
	},
	contentWrapper: {
		position: 'relative',
		width: '100%',
		// Динамически вычисляем высоту
		height: `${CONTENT_HEIGHT}px`,
	},
	node: {
		width: '90px',
		height: '90px',
		backgroundColor: '#555',
		border: '2px solid white',
		borderRadius: '50%',
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '24px',
		fontWeight: 'bold',
		zIndex: 5,
	},
	nodeLabel: {
		position: 'absolute',
		transform: 'translateX(-40px)',
		fontSize: '20px',
		color: '#aaa',
	},
	// Стили для соединительных линий
	line: {
		position: 'absolute',
		width: '155px',
		height: '2px',
		background: 'white',
		zIndex: 1,
		// Центрируем линию относительно ее левой точки
		left: 'calc(50% - 45px)',
	},
} as const

function App() {
	return (
		<div style={styles.appContainer}>
			<header style={styles.header}>
				<span style={styles.backArrow}>←</span>
			</header>

			<TransformWrapper
				limitToBounds={true}
				minScale={0.05} // Уменьшил минимальный зум, чтобы видеть всю карту
				maxScale={3}
				initialScale={0.8} // Начальный масштаб, чтобы больше влезало
				initialPositionY={0}
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
					{/* Рендерим все узлы */}
					{nodesData.map(node => (
						<div
							key={node.id}
							style={{
								...styles.node,
								top: `${node.top}px`,
								left: node.left,
							}}
						>
							<span
								style={{
									...styles.nodeLabel,
									left: node.id % 2 === 0 ? '120px' : '-50px',
								}}
							>
								{node.id}
							</span>
						</div>
					))}

					{/* АВТОМАТИЧЕСКИ РЕНДЕРИМ ВСЕ ЛИНИИ */}
					{nodesData.slice(0, -1).map((node, index) => {
						const nextNode = nodesData[index + 1]
						// Вычисляем позицию линии ровно посередине между двумя узлами
						const lineTop = (node.top + nextNode.top) / 2
						// Чередуем угол наклона
						const rotation = index % 2 === 0 ? 35 : -35

						return (
							<div
								key={`line-${node.id}`}
								style={{
									...styles.line,
									top: `${lineTop}px`,
									transform: `rotate(${rotation}deg)`,
								}}
							/>
						)
					})}
				</TransformComponent>
			</TransformWrapper>

			<footer style={styles.footer}>
				<span style={styles.footerIcon}>👥</span>
				<button style={styles.joinButton}>Вступить</button>
				<span style={styles.footerIcon}>🔔</span>
			</footer>
		</div>
	)
}

export default App
