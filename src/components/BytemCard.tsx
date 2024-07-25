import { changeBytem } from '../shared/model'
import { Bytem, importance } from '../shared/types'

export const BytemCard = ({ bytem }: { bytem: Bytem }) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input
          style={{
            minHeight: '20px',
            height: '20px',
            minWidth: '20px',
            width: '20px',
          }}
          type="checkbox"
          checked={bytem.completed}
          onChange={() =>
            changeBytem({ ...bytem, completed: !bytem.completed })
          }
        />
        <div>
          <div>
            <span
              style={{
                fontSize: '1.1rem',
                textDecoration: bytem.completed ? 'line-through 2px' : 'none',
              }}
            >
              {bytem.title}
            </span>
            <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>
              {bytem.author && ` by ${bytem.author}`}
            </span>
          </div>
          <div style={{ opacity: 0.5, fontSize: '0.8rem' }}>
            {bytem.priceRUB && `${bytem.priceRUB}₽`}{' '}
            {bytem.amount && `x${bytem.amount}`}
          </div>
        </div>
      </div>
      <div style={{ padding: '0 0.5rem' }}>
        <select
          value={bytem.importance}
          onChange={(e) => {
            changeBytem({ ...bytem, importance: Number(e.target.value) })
          }}
          className="card-select"
        >
          {importance.map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
