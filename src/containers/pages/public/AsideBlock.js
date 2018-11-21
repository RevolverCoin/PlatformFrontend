import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import Avatar from 'react-avatar'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;

  img {
    border-radius: 50%;
  }
`
const Panel = styled.div`
  background: #fafafa;
  text-align: left;
  border: 1px solid #a1a1a1;
  text-align: center;
  padding: 20px;
`
const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`

class AsideBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount()
  {
  }

  render() {
    return (
        <Panel>
        <Wrapper className="m-b">
              <Avatar name='Guest User' size="150px" round={true} />
         </Wrapper>
         <Name>
          Guest User
        </Name>
        <Link className="revolver-btn-main" to="/login">
          Sign In
        </Link>
      </Panel>
    )
  }
}


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideBlock)
