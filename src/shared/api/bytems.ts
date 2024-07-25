import { createEffect } from 'effector'
import { BYOME_URL } from './consts'
import { Bytem } from '../types'

export const getBytemsEffect = createEffect(async () => {
  const response = await fetch(BYOME_URL)
  return await response.json()
})

export const createBytemEffect = createEffect(
  async (bytem: Omit<Bytem, '_id'>) => {
    const response = await fetch(BYOME_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bytem),
    })
    return await response.json()
  }
)

export const editBytemEffect = createEffect(async (bytem: Bytem) => {
  const response = await fetch(`${BYOME_URL}/${bytem._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bytem),
  })
  return await response.json()
})

export const deleteBytemEffect = createEffect(async (id: string) => {
  const response = await fetch(`${BYOME_URL}/${id}`, {
    method: 'DELETE',
  })
  return await response.json()
})
