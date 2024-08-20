import { getBytemsEffect } from '../shared/api/bytems'
import { $bytemsSorted } from '../shared/model'
import { Spinner } from '../shared/ui/spinner/Spinner'
import { BytemCard } from './BytemCard'
import { useUnit } from 'effector-react'

export const BytemList = () => {
  const [bytems, loading] = useUnit([$bytemsSorted, getBytemsEffect.pending])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        width: '100%',
        maxHeight: '85%',
        overflowY: 'auto',
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        bytems.map((bytem) => <BytemCard key={bytem._id} bytem={bytem} />)
      )}
    </div>
  )
}
