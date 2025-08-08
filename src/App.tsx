import { useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

/*
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
 *   ВАЖНО: Убедитесь, что этот мета-тег добавлен в ваш public/index.html,
 *   чтобы предотвратить масштабирование всей страницы на мобильных устройствах.
 */

// --- Константы для генерации ---
const TOTAL_NODES = 30
const NODE_VERTICAL_SPACING = 130
const NODE_START_TOP = 150
const CONTENT_HEIGHT = NODE_START_TOP + TOTAL_NODES * NODE_VERTICAL_SPACING

// --- Генерация данных для узлов ---
const nodesData = Array.from({ length: TOTAL_NODES }, (_, i) => {
	const id = i + 1
	const top = NODE_START_TOP + i * NODE_VERTICAL_SPACING
	const left = id % 2 !== 0 ? 'calc(50% - 100px)' : 'calc(50% + 50px)'

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
		touchAction: 'none',
	},
	// --- ИЗМЕНЕНИЕ: Базовый стиль для круглых плавающих кнопок ---
	floatingButtonBase: {
		position: 'fixed',
		zIndex: 10,
		width: '56px',
		height: '56px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		background: 'rgba(40, 40, 40, 0.8)',
		border: '1px solid rgba(255, 255, 255, 0.1)',
		boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
		fontSize: '28px',
	},
	backButton: {
		position: 'fixed',
		zIndex: 10,
		width: '44px',
		height: '44px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		background: 'rgba(40, 40, 40, 0.8)',
		border: '1px solid rgba(255, 255, 255, 0.1)',
		fontSize: '28px',
		top: '20px',
		left: '20px',
	},
	groupsButton: {
		position: 'fixed',
		zIndex: 10,
		width: '56px',
		height: '56px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		background: 'rgba(40, 40, 40, 0.8)',
		border: '1px solid rgba(255, 255, 255, 0.1)',
		boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
		fontSize: '28px',
		bottom: '20px',
		left: '20px',
	},
	notificationsButton: {
		position: 'fixed',
		zIndex: 10,
		width: '56px',
		height: '56px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		background: 'rgba(40, 40, 40, 0.8)',
		border: '1px solid rgba(255, 255, 255, 0.1)',
		boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
		fontSize: '28px',
		bottom: '20px',
		right: '20px',
	},
	num: {
		position: 'fixed',
		zIndex: 10,

		borderRadius: '30%',
		padding: '10px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		background: 'rgba(40, 40, 40, 0.8)',
		border: '1px solid rgba(255, 255, 255, 0.1)',
		boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
		top: '20px',
		right: '20px',
	},
	// --- ИЗМЕНЕНИЕ: Стиль для главной кнопки "Вступить" ---
	joinButton: {
		position: 'fixed',
		zIndex: 10,
		bottom: '20px',
		left: '50%',
		transform: 'translateX(-50%)',
		padding: '15px 45px',
		backgroundColor: '#e0e0e0',
		color: '#000',
		border: 'none',
		borderRadius: '30px',
		fontSize: '16px',
		fontWeight: 500,
		cursor: 'pointer',
		boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
	},
	canvasWrapper: {
		width: '100%',
		height: '100vh',
		background: '#222',
	},
	contentWrapper: {
		position: 'relative',
		width: '100%',
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
	line: {
		position: 'absolute',
		width: '155px',
		height: '2px',
		background: 'white',
		zIndex: 1,
		left: 'calc(50% - 45px)',
	},
} as const

function App() {
	// Вся логика для скрытия удалена, код стал намного проще!

	const [isVisible, setIsVisible] = useState(true)
	return (
		<div style={styles.appContainer}>
			<div style={styles.backButton}>
				<span>←</span>
			</div>

			<TransformWrapper
				limitToBounds={false}
				centerOnInit={true}
				minScale={0.05}
				maxScale={3}
				initialScale={0.8}
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
						const lineTop = (node.top + nextNode.top) / 2
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

			{/* --- ИЗМЕНЕНИЕ: Футер заменен тремя независимыми плавающими кнопками --- */}
			<div style={styles.groupsButton}>👥</div>
			{isVisible && (
				<button onClick={() => setIsVisible(false)} style={styles.joinButton}>
					Вступить
				</button>
			)}
			{!isVisible && <div style={styles.num}>Вы 16</div>}
			<div style={styles.notificationsButton}>🔔</div>
		</div>
	)
}

export default App
