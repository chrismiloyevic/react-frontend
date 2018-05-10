import React from 'react'
import styled from 'styled-components'
import { Header } from 'ui/organisms'


export const CommonContent = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow-y: auto;
  ${({ theme }) => theme.embed.canvas}
`

export const CommonContentTemplate = ({ children, header = <Header /> }) => (
  <React.Fragment>
    {header}
    <CommonContent>
      {children}
    </CommonContent>
  </React.Fragment>
)
