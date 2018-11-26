import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
  background-color: white;
  text-align: left;
  border: 1px solid #a1a1a1;
`

const Caption = styled.div`
  background-color: #f1f1f1;
  border-bottom: 1px solid #a1a1a1;
  color: #832e55;
  text-transform: uppercase;
  font-size: 14px;
  padding: 8px 0 8px 15px;
`
const PagePanel = (props) => {
  return (
    <Panel>
      <Caption>{props.caption}</Caption>
      {props.children}
    </Panel>
  )
}

export default PagePanel
