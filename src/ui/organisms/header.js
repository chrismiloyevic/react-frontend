import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ToggleThemeConsumer } from 'lib/theme-context'
import { Container } from 'ui/templates'


// https://codepen.io/anon/pen/PebeaL

const HeaderBox = styled.header`
  border-bottom: 1px solid;
  display: flex;
  height: 6rem;
  justify-content: center;
  padding: 1rem 0;
  z-index: 1000;

  & > div > * + * {
    margin-left: 2rem;
  }

  ${({ theme }) => theme.embed.card}
`

const SearchBox = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: stretch;
`

const SearchInput = styled.input`
  appearance: none;
  border: none;
  border-radius: 6px;
  box-shadow: none;
  box-sizing: border-box;
  font-size: 1.6rem;
  outline: none;
  width: 100%;
  padding: 0 2rem;

  ${({ theme }) => theme.embed.canvas}
`

const NavItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;

  ${({ theme }) => theme.embed.link}
`

const NavLink = NavItem.withComponent(Link)


export const Header = ({ children }) => (
  <HeaderBox>
    <Container>
      <NavLink to="/">HowToCards</NavLink>
      <SearchBox>
        <SearchInput autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
      </SearchBox>
      <NavLink to="/feed">Feed</NavLink>
      <NavLink to="/table">Table</NavLink>
      <NavLink to="/join">Join</NavLink>
      <ToggleThemeConsumer>
        {({ toggleDark }) => (
          <NavItem onClick={toggleDark}>Toggle</NavItem>
        )}
      </ToggleThemeConsumer>
    </Container>
  </HeaderBox>
)
