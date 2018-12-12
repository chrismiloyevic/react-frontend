import React from "react"
import PropTypes from "prop-types"
import { fetchStatus } from "symbiote-fetching"
import { compose, withPropsOnChange, branch, renderComponent } from "recompose"
import { connect } from "react-redux"

import { Col, Row } from "@lib/styled-components-layout"
import { H3 } from "@ui/atoms"
import { UsersCommonTemplate } from "../templates/common"
import * as selectors from "../selectors"
import { getUserWithCards } from "../effects"
import { LoadingView } from "../organisms/loading"
import { ErrorView } from "../organisms/error"

const mapStateToProps = (state, props) => ({
  user: selectors.currentUser(state, props),
  fetching: selectors.userFetching(state, props),
  useful: selectors.usefulCards(state, props),
  created: selectors.createdCards(state, props),
  userId: props.match.params.userId,
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (userId) => dispatch(getUserWithCards, userId),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPropsOnChange(
    (props, next) => props.userId !== next.userId,
    (props) => props.fetch(props.userId),
  ),
  branch((props) => isLoading(props.fetching), renderComponent(LoadingView)),
  branch((props) => isFailed(props.fetching), renderComponent(ErrorView)),
)

export const UserView = ({ user }) => (
  <UsersCommonTemplate sidebar={<UserInfo user={user} />}>
    Hello
  </UsersCommonTemplate>
)

UserView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
}

export const UserPage = enhance(UserView)

const isLoading = (fetching) =>
  [fetchStatus.loading, fetchStatus.initial].includes(fetching.status)

const isFailed = (fetching) => fetching.status === fetchStatus.failed

const UserInfo = ({ user }) => (
  <Col gap="1rem">
    <Row>
      <H3 narrow>{user.displayName || user.id}</H3>
    </Row>
    <CurrentUserInfo user={user} />
  </Col>
)

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
}

const CurrentUserInfo = ({ user }) =>
  user.email ? <Row>You: {user.email}</Row> : null

CurrentUserInfo.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
}
