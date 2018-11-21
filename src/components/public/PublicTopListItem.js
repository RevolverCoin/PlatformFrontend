import React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import sanitize from 'sanitize-html'

const Container = styled.div`
  text-align: left;
  padding: 10px;
  position: relative;
  border-bottom: 1px solid #eee;
`

const DescriptionBlock = styled.div``

const Info = styled.div`
  display: inline-block;
  width: 150px;
  vertical-align: top;
  padding: 0 0 0 15px;
`

const Username = styled.div`
  margin-top: 5px;
  font-weight: bold;
`

const Content = styled.div`
  display: inline-block;
  color: #832e55;
  text-decoration: underline;
  text-transform: uppercase;
  cursor: pointer;
`

const AddressBlock = styled.div``

const ContentSupports = styled(Content)`
  text-transform: none;
  text-decoration: none;
  color: #1f363d;
  cursor: auto;
  margin-left: 45px;
`
const Index = styled.div`
  position: absolute;
  top: 10px;
  right: 0px;
`

class PublicTopListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Link to={'/public/user/' + this.props.userId}>
        <Container>
          <Index>#{this.props.index + 1}</Index>

          <DescriptionBlock>
            {this.props.avatar ? (
              <img src={this.props.avatar} width="30" style={{ 'border-radius': '50%' }} />
            ) : (
              <Avatar name={this.props.username} size="30" round={true} />
            )}

            <Info>
              <Username>{this.props.username}</Username>
            </Info>
          </DescriptionBlock>

          <ContentSupports>
            <div>{this.props.supportCount} Supports</div>
          </ContentSupports>
        </Container>
      </Link>
    )
  }
}

export default PublicTopListItem
