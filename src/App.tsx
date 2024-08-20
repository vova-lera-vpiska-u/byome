import './App.css'
import { BytemList } from './components/BytemList'
import { useUnit } from 'effector-react'
import { $showCompleted, appStarted, toggleShowCompleted } from './shared/model'
import { useEffect } from 'react'
import { BytemAdder } from './components/BytemAdder'

function App() {
  const [showCompleted, setShowCompleted] = useUnit([
    $showCompleted,
    toggleShowCompleted,
  ])

  useEffect(() => {
    appStarted()
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div
        style={{
          height: '100%',
        }}
      >
        <div style={{ textAlign: 'right', padding: '1rem 0' }}>
          <label htmlFor="showChecked">Показывать выполненные</label>
          <input
            type="checkbox"
            name="showChecked"
            checked={showCompleted}
            onChange={() => setShowCompleted()}
          />
        </div>
        <BytemList />
      </div>
      <BytemAdder />
    </div>
  )
}

export default App
