import { HintList } from './HintList'
import { Input } from '../shared/ui/Input'
import { useRef } from 'react'
import { useUnit } from 'effector-react'
import {
  $bytemImportance,
  $bytemsSorted,
  $bytemTitle,
  createBytem,
  setBytemImportance,
  setBytemTitle,
} from '../shared/model'
import { importance } from '../shared/types'

export const BytemAdder = () => {
  const palceholder = useRef(generatePlaceholder())

  const titleInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useUnit([$bytemTitle, setBytemTitle])
  const bytems = useUnit($bytemsSorted)
  const [chosenImportance, setImportance] = useUnit([
    $bytemImportance,
    setBytemImportance,
  ])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (bytems.some((bytem) => bytem.title === title)) {
      // TODO: highlight bytem with title
      return
    }
    createBytem({ title, importance: chosenImportance })
    titleInputRef.current?.focus()
  }
  return (
    <div
      style={{
        textAlign: 'left',
        position: 'absolute',
        width: '100%',
        maxWidth: '900px',
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
          placeholder={palceholder.current}
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
  )
}

const generatePlaceholder = () => {
  const placeholders = [
    'Велосипед 12000₽ х2 by Awh',
    'Ноутбук 80000₽ by Awh',
    'Телевизор 20000₽ by Awh',
    'Киянка by nerpyshka',
  ]

  return placeholders[Math.floor(Math.random() * placeholders.length)]
}
