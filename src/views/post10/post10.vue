<template>
  <div class="post-content">

    <div class="game-info">
      <el-tag :type="gameStatus === 'playing' ? 'success' : gameStatus === 'user-win' ? 'warning' : 'danger'" size="large">
        {{ statusText }}
      </el-tag>
      <div class="score-board">
        <span class="score-item">你 (黑棋): {{ userWinCount }} 胜</span>
        <span class="score-item">AI (白棋): {{ aiWinCount }} 胜</span>
      </div>
    </div>

    <div class="board-container">
      <div class="board">
        <div v-for="(row, y) in board" :key="y" class="board-row">
          <div
            v-for="(cell, x) in row"
            :key="x"
            class="cell"
            :class="{ 'cell-hover': canPlace(x, y) && gameStatus === 'playing' }"
            @click="placeStone(x, y)"
          >
            <div v-if="cell === 1" class="stone black-stone"></div>
            <div v-else-if="cell === 2" class="stone white-stone"></div>
            <div v-else-if="x === 7 && y === 7" class="star-point"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <el-button type="primary" @click="resetGame" :icon="Refresh">重新开始</el-button>
      <el-button @click="undoMove" :icon="ArrowLeft" :disabled="moveHistory.length < 2 || gameStatus !== 'playing'">悔棋</el-button>
    </div>

    <div class="rules">
      <h4>游戏规则</h4>
      <ul>
        <li>用户执黑棋先行，AI执白棋后行</li>
        <li>任意一方先在横、竖、斜方向连成5子获胜</li>
        <li>点击棋盘空位放置棋子</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Refresh, ArrowLeft } from '@element-plus/icons-vue'
import BlogStyles from '../../components/BlogStyles.vue'

const BOARD_SIZE = 15
const EMPTY = 0
const USER = 1
const AI = 2

const board = ref([])
const currentPlayer = ref(USER)
const gameStatus = ref('playing')
const moveHistory = ref([])
const userWinCount = ref(0)
const aiWinCount = ref(0)

const statusText = computed(() => {
  if (gameStatus.value === 'user-win') return '恭喜！你赢了！'
  if (gameStatus.value === 'ai-win') return 'AI获胜！'
  if (gameStatus.value === 'draw') return '平局！'
  return currentPlayer.value === USER ? '轮到你下棋' : 'AI思考中...'
})

const initBoard = () => {
  board.value = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(EMPTY))
  currentPlayer.value = USER
  gameStatus.value = 'playing'
  moveHistory.value = []
}

const canPlace = (x, y) => {
  return board.value[y][x] === EMPTY
}

const placeStone = (x, y) => {
  if (!canPlace(x, y) || gameStatus.value !== 'playing') return
  if (currentPlayer.value !== USER) return

  board.value[y][x] = USER
  moveHistory.value.push({ x, y, player: USER })

  if (checkWin(USER, x, y)) {
    gameStatus.value = 'user-win'
    userWinCount.value++
    return
  }

  if (isBoardFull()) {
    gameStatus.value = 'draw'
    return
  }

  currentPlayer.value = AI
  setTimeout(aiMove, 500)
}

const aiMove = () => {
  if (gameStatus.value !== 'playing') return

  const move = findBestMove()
  if (move) {
    board.value[move.y][move.x] = AI
    moveHistory.value.push({ x: move.x, y: move.y, player: AI })

    if (checkWin(AI, move.x, move.y)) {
      gameStatus.value = 'ai-win'
      aiWinCount.value++
      return
    }

    if (isBoardFull()) {
      gameStatus.value = 'draw'
      return
    }
  }

  currentPlayer.value = USER
}

const findBestMove = () => {
  let bestScore = -Infinity
  let bestMove = null
  const candidates = []

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (board.value[y][x] === EMPTY) {
        const score = evaluatePosition(x, y)
        if (score > bestScore) {
          bestScore = score
          bestMove = { x, y }
        }
        if (score >= 10000) candidates.push({ x, y, score })
      }
    }
  }

  if (candidates.length > 0) {
    return candidates[0]
  }

  if (!bestMove) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (board.value[y][x] === EMPTY) {
          return { x, y }
        }
      }
    }
  }

  return bestMove
}

const evaluatePosition = (x, y) => {
  let score = 0
  const centerBonus = Math.min(7, Math.max(0, 14 - Math.abs(x - 7) - Math.abs(y - 7)))
  score += centerBonus * 2

  const directions = [[1, 0], [0, 1], [1, 1], [1, -1]]

  for (let i = 0; i < 4; i++) {
    const [dx, dy] = directions[i]

    const aiLine = countLine(x, y, dx, dy, AI)
    const userLine = countLine(x, y, dx, dy, USER)

    const aiScore = getLineScore(aiLine, true)
    const userScore = getLineScore(userLine, false)

    if (aiLine.count >= 4) score += 50000
    if (userLine.count >= 4) score += 40000
    if (aiLine.count === 3 && aiLine.open === 2) score += 5000
    if (userLine.count === 3 && userLine.open === 2) score += 3000
    if (aiLine.count === 2 && aiLine.open === 2) score += 500
    if (userLine.count === 2 && userLine.open === 2) score += 200

    score += aiScore * 1.1
    score += userScore
  }

  return score
}

const countLine = (x, y, dx, dy, player) => {
  let count = 0
  let open = 0
  let extended = 0

  let nx = x + dx
  let ny = y + dy
  while (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE) {
    if (board.value[ny][nx] === player) count++
    else if (board.value[ny][nx] === EMPTY) {
      open++
      break
    } else break
    nx += dx
    ny += dy
  }

  nx = x - dx
  ny = y - dy
  while (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE) {
    if (board.value[ny][nx] === player) count++
    else if (board.value[ny][nx] === EMPTY) {
      open++
      break
    } else break
    nx -= dx
    ny -= dy
  }

  return { count, open }
}

const getLineScore = (line, isAI) => {
  const { count, open } = line
  if (count === 0) return 0

  const baseScore = isAI ? [0, 10, 100, 1000, 10000][count] : [0, 5, 50, 500, 5000][count]
  return baseScore * (open + 1)
}

const checkWin = (player, x, y) => {
  const directions = [[1, 0], [0, 1], [1, 1], [1, -1]]

  for (const [dx, dy] of directions) {
    let count = 1

    for (let i = 1; i < 5; i++) {
      const nx = x + dx * i
      const ny = y + dy * i
      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE && board.value[ny][nx] === player) {
        count++
      } else break
    }

    for (let i = 1; i < 5; i++) {
      const nx = x - dx * i
      const ny = y - dy * i
      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE && board.value[ny][nx] === player) {
        count++
      } else break
    }

    if (count >= 5) return true
  }

  return false
}

const isBoardFull = () => {
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (board.value[y][x] === EMPTY) return false
    }
  }
  return true
}

const resetGame = () => {
  initBoard()
}

const undoMove = () => {
  if (moveHistory.value.length < 2) return

  const userMove = moveHistory.value.pop()
  const aiMove = moveHistory.value.pop()

  if (userMove) board.value[userMove.y][userMove.x] = EMPTY
  if (aiMove) board.value[aiMove.y][aiMove.x] = EMPTY

  currentPlayer.value = USER
  gameStatus.value = 'playing'
}

onMounted(() => {
  initBoard()
})
</script>

<style scoped>
.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: linear-gradient(135deg, #c4cdf4ff 0%, #84c5f0ff 100%);
  border-radius: 8px;
  color: white;
}

.score-board {
  display: flex;
  gap: 20px;
}

.score-item {
  font-size: 14px;
}

.board-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.board {
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #d4a574, #c49a6c);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 3px solid #8b6914;
}

.board-row {
  display: flex;
}

.cell {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  background: linear-gradient(145deg, #d4a574, #c49a6c);
  border: 1px solid rgba(139, 105, 20, 0.3);
}

.cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}

.cell-hover::before {
  opacity: 0.3;
  background: #000;
}

.cell:first-child {
  border-left: 2px solid #8b6914;
}

.cell:last-child {
  border-right: 2px solid #8b6914;
}

.board-row:first-child .cell {
  border-top: 2px solid #8b6914;
}

.board-row:last-child .cell {
  border-bottom: 2px solid #8b6914;
}

.stone {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.black-stone {
  background: radial-gradient(circle at 30% 30%, #555, #000);
}

.white-stone {
  background: radial-gradient(circle at 30% 30%, #fff, #ddd);
}

.star-point {
  width: 6px;
  height: 6px;
  background: #8b6914;
  border-radius: 50%;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.rules {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.rules h3 {
  margin-top: 0;
  color: #409eff;
}

.rules ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
}

.rules li {
  margin: 5px 0;
}
</style>
