// @flow
import { CardCreatePage } from "./create/page"
import { CardEditPage } from "./edit/page"
import { CardsHomePage } from "./home/page"
import { CardViewPage } from "./view/page"
import { JoinLoginPage } from "./join/login/page"
import { JoinRegistrationPage } from "./join/registration/page"
import { SettingsPage } from "./settings/page"
import { UserPage } from "./users/current/page"

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
    path: "/join/registration",
    exact: true,
    component: JoinRegistrationPage,
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
  {
    path: "/user/:userId",
    exact: true,
    component: UserPage,
  },
]
