// @flow
import * as React from "react"
import { useStore } from "effector-react"
import { $session, type Session } from "../model/session.store"

type Props = {|
  render?: ({ account: ?Session, accountId: ?number }) => React.Node,
  renderExists?: ({ account: Session, accountId: number }) => React.Node,
  renderEmpty?: ({ account: null, accountId: null }) => React.Node,
|}

export const WithAccount = (props: Props) => {
  const session = useStore($session)

  if (session && props.renderExists) {
    return props.renderExists({ account: session, accountId: session.id })
  }

  if (!session && props.renderEmpty) {
    return props.renderEmpty({ account: null, accountId: null })
  }

  return props.render
    ? props.render({ account: session, accountId: session ? session.id : null })
    : null
}
