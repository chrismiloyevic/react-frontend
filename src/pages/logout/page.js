// @flow
import * as React from "react"

import { Col, Row } from "@lib/styled-components-layout"

import { Button, ButtonPrimary, Card, PrimitiveFooter } from "@howtocards/ui"
import { CenterContentTemplate, Container } from "@howtocards/ui/templates"

import { cancelPressed, logoutPressed } from "./model"

export const LogoutPage = () => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="stretch" width="40rem">
        <Card>
          <Row padding="0 0 2rem 0">Stop session?</Row>
          <Row gap="1rem">
            <ButtonPrimary grow onClick={logoutPressed}>
              Logout
            </ButtonPrimary>
            <Button onClick={cancelPressed}>Cancel</Button>
          </Row>
        </Card>
      </Col>
    </Container>
  </CenterContentTemplate>
)
