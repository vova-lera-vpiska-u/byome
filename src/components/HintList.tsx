import { useUnit } from 'effector-react'
import { $bytemTitle, $hints } from '../shared/model'

export const HintList = () => {
  const hints = useUnit($hints)
  const title = useUnit($bytemTitle)

  if (!title) return null
  return (
    <div
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {hints.map((hint) => (
        <span key={hint._id}>
          {hint.title}
          {'   '}
        </span>
      ))}
    </div>
  )
}
