import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Caption = styled.div`
  background-color: #fafafa;
  border-bottom: 1px solid #a1a1a1;
  color: #832e55;
  text-transform: uppercase;
  font-size: 14px;
  padding: 8px 0 8px 15px;
`
const Category = styled.div`
  display: inline-block;
  padding: 0 5px;
  margin-right:10px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')}; 
  color: ${props => (props.active ? '#832e55' : '#333')};
`

const UserMenu = props => {
  return (
    <Caption>
      <Link to="/myposts/">
        <Category active={props.active==='myposts'}>My Posts</Category>
      </Link>
      <Link to="/timeline/">
        <Category active={props.active==='timeline'}>My Timeline</Category>
      </Link>

      <Link to="/discover/">
        <Category active={props.active==='discover'}>Discover</Category>
      </Link>

      <Link to="/top">
        <Category active={props.active==='top'}>Top 100</Category>
      </Link>
    </Caption>
  )
}

export default UserMenu
