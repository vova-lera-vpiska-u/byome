import './App.css'
import { Input } from './shared/ui/Input'
import { BytemList } from './components/BytemList'
import { useUnit } from 'effector-react'
import {
  $bytemImportance,
  $bytemsSorted,
  $bytemTitle,
  $showCompleted,
  appStarted,
  createBytem,
  setBytemImportance,
  setBytemTitle,
  toggleShowCompleted,
} from './shared/model'
import { importance } from './shared/types'
import { HintList } from './components/HintList'
import { useEffect, useRef } from 'react'

function App() {
  const [title, setTitle] = useUnit([$bytemTitle, setBytemTitle])
  const [showCompleted, setShowCompleted] = useUnit([
    $showCompleted,
    toggleShowCompleted,
  ])
  const [chosenImportance, setImportance] = useUnit([
    $bytemImportance,
    setBytemImportance,
  ])
  const bytems = useUnit($bytemsSorted)

  useEffect(() => {
    appStarted()
  }, [])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (bytems.some((bytem) => bytem.title === title)) {
      // TODO: highlight bytem with title
      return
    }
    createBytem({ title, importance: chosenImportance })
    titleInputRef.current?.focus()
  }

  const titleInputRef = useRef<HTMLInputElement>(null)

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
      <div>
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
      <div
        style={{
          textAlign: 'left',
          position: 'absolute',
          width: 'clamp(400px, 100%, 900px)',
          bottom: '0',
        }}
      >
        <HintList />
        <form
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'end',
            marginTop: '1rem',
          }}
          onSubmit={handleAdd}
        >
          <Input
            forwardedRef={titleInputRef}
            type="search"
            placeholder="Добавить"
            value={title}
            setValue={setTitle}
            style={{ width: '60%', height: '100%', padding: '0.5rem' }}
          />
          <select
            value={chosenImportance}
            onChange={(e) => setImportance(Number(e.target.value))}
            style={{ width: '40%', height: '100%', padding: '0.5rem' }}
          >
            {importance.map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <button style={{ maxHeight: '100%' }} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
