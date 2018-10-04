import React from 'react'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Container = styled.div`
  text-align: left;
  padding: 10px;
`

const DescriptionBlock = styled.div``

const ProfileImage = styled.img`
  display: inline-block;
  width: 140px;
  text-align: left;
  border: 1px solid #a1a1a1;
`
const Info = styled.div`
  display: inline-block;
  width: 320px;
  vertical-align: top;
  padding: 0 0 0 30px;
`

const Username = styled.h2`
  margin-top: 10px;
  margin-bottom: 10px;
`

const Description = styled.p``

const SupportBlock = styled.div`
  margin-top: 20px;
`

const Row = styled.div`
  margin: 10px 0;
`

const Header = styled.div`
  display: inline-block;
  width: 160px;
`

const Content = styled.div`
  display: inline-block;
  color: #832e55;
  text-decoration: underline;
  text-transform: uppercase;
  cursor: pointer;
`



class UserHeaderBlock extends React.Component {
  constructor(props) {
    super(props)

    this.handleSupport = this.handleSupport.bind(this);
  }

  handleSupport()
  {    
    this.props.addSupport(this.props.addressMy, this.props.address);
    window.location.reload()
  }

  render() {

    const supporting = false;
    let SupportingButton = null;
    if (!supporting) {
      SupportingButton = <div className="revolver-btn-main" onClick={this.handleSupport}>Support</div>
    } else {
      SupportingButton = <div className="revolver-btn-main" onClick={this.handleSupport}>Unsupport</div>
    }

    return (
      <Container>
        <DescriptionBlock>
          <Avatar name={this.props.username} size='140px'/>
          <Info>
            <Username>{this.props.username}</Username>
            <Description>{this.props.description}</Description>
          </Info>
        </DescriptionBlock>
        <SupportBlock>
          <Row>
            <Header>Supporting</Header>
            <Content>9 Supports</Content>
          </Row>
          <Row>
            <Header>Supported</Header>
            <Content>12 Supports</Content>
          </Row>
          <Row>
            <Header></Header>
            <Content>
              
              {SupportingButton}
            </Content>
          </Row>
        </SupportBlock>
      </Container>
    )
  }
}

export default UserHeaderBlock