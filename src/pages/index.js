// @flow
import { CardCreatePage } from "./create/page"
import { CardEditPage } from "./edit/page"
import { CardsHomePage } from "./home/page"
import { CardViewPage } from "./view/page"
import { JoinLoginPage } from "./join/login/page"
import { SettingsPage } from "./settings/page"

export const routes = () => [
  {
    path: "/",
    exact: true,
    component: CardsHomePage,
  },
  {
    path: "/join",
    exact: true,
    component: JoinLoginPage,
  },
  {
    path: "/new/card",
    exact: true,
    component: CardCreatePage,
  },
  {
    path: "/open/:cardId",
    exact: true,
    component: CardViewPage,
  },
  {
    path: "/edit/:cardId",
    exact: true,
    component: CardEditPage,
  },
  {
    path: "/settings",
    exact: true,
    component: SettingsPage,
  },
]
