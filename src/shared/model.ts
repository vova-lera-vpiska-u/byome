import { createEvent, createStore, sample } from 'effector'
import { Bytem } from './types'
import {
  createBytemEffect,
  deleteBytemEffect,
  editBytemEffect,
  getBytemsEffect,
} from './api/bytems'

export const appStarted = createEvent()
export const setBytemTitle = createEvent<string>()
export const setBytemImportance = createEvent<number>()
export const createBytem = createEvent<Omit<Bytem, '_id'>>()
export const changeBytem = createEvent<Bytem>()
export const deleteBytem = createEvent<string>()
export const toggleShowCompleted = createEvent()

export const $bytemTitle = createStore('')
  .on(setBytemTitle, (_, title) => title)
  .reset(createBytem)
export const $bytemImportance = createStore(0)
  .on(setBytemImportance, (_, importance) => importance)
  .reset(createBytem)
export const $showCompleted = createStore(false).on(
  toggleShowCompleted,
  (state) => !state
)

const $bytems = createStore<Bytem[]>([])
export const $bytemsSorted = createStore<Bytem[]>([])
export const $hints = createStore<Bytem[]>([])
sample({
  clock: [$bytems, $showCompleted],
  source: { bytems: $bytems, showCompleted: $showCompleted },
  fn: ({ bytems, showCompleted }) =>
    showCompleted
      ? bytems.sort((a, b) => b.importance - a.importance)
      : bytems
          .filter((bytem) => bytem.completed === showCompleted)
          .sort((a, b) => b.importance - a.importance),
  target: $bytemsSorted,
})
sample({
  clock: [$bytems, $bytemTitle],
  source: { bytems: $bytems, title: $bytemTitle },
  fn: ({ bytems, title }) =>
    bytems.filter((bytem) =>
      bytem.title.toLowerCase().includes(title.toLowerCase())
    ),
  target: $hints,
})

sample({
  clock: appStarted,
  target: getBytemsEffect,
})

sample({
  clock: getBytemsEffect.doneData,
  target: $bytems,
})

sample({
  clock: createBytem,
  filter: (bytem) => Boolean(bytem.title.trim()),
  target: createBytemEffect,
})

sample({
  clock: changeBytem,
  target: editBytemEffect,
})

sample({
  clock: deleteBytem,
  target: deleteBytemEffect,
})

sample({
  clock: [createBytemEffect.done, editBytemEffect.done, deleteBytemEffect.done],
  target: getBytemsEffect,
})
