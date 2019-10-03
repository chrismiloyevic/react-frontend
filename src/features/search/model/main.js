// @flow
import { createEffect, createEvent, createStore, forward } from "effector"

import { type Fetching, createFetching } from "@lib/fetching"
import { $cardsRegistry, cardsToObject } from "@features/cards"
import type { Card } from "@features/common"
import { searchApi } from "@api/search"

export const searchTriggered = createEvent<string>()

const searchCards = createEffect<string, { cards: Card[] }, void>()

export const homeCardsFetching: Fetching<*, void> = createFetching(
  searchCards,
  "loading",
)

export const $searchCardsIds = createStore<number[]>([])

searchCards.use((query) => searchApi.search(query))

$searchCardsIds.on(searchCards.done, (_, { result }) =>
  result.cards.map((card) => card.id),
)

$cardsRegistry.on(searchCards.done, (registry, { result }) => {
  return {
    ...registry,
    ...cardsToObject(result.cards),
  }
})

forward({ from: searchTriggered, to: searchCards })
