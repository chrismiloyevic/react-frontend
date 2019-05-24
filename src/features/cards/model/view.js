// @flow
import { createEffect, createStore, createEvent } from "effector"
import type { Event, Effect, Store } from "effector"

import { createFetching, type Fetching } from "@lib/fetching"
import { cardsApi } from "../api"
import type { Card } from "../types"
import { $registry } from "./registry.store"
import { cardsToObject } from "./registry.model"

export const pageUnloaded: Event<void> = createEvent()

export const cardLoading: Effect<
  { cardId: number },
  { card: Card },
  void,
> = createEffect()
export const cardFetching: Fetching<*, void> = createFetching(
  cardLoading,
  "loading",
)

export const $card: Store<?Card> = createStore(null)

cardLoading.use(({ cardId }) => cardsApi.getById(cardId))

$card.on(cardLoading, (_, { cardId }) => $registry.getState()[cardId])
$card.on(cardLoading.done, (_, { result }) => result.card)
$card.reset(pageUnloaded)

$registry.on(cardLoading.done, (registry, { result }) => {
  return {
    ...registry,
    ...cardsToObject([result.card]),
  }
})
