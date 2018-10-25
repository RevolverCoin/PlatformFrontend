import React from 'react'
import styled from 'styled-components'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import './../../styles/footer.css'
import logo from './../../img/logo.png'
import twitterLogo from './../../img/twitter.svg'
import discordLogo from './../../img/discord.svg'

const Team = styled.h3`
  margin-top: 0px;
`

const FooterBlock = () => (
  <Container fluid className="footer">
    <Container>
      <Row>
        <Col className="mui--text-left" md="6">
          <h3>Powered by</h3>
          <a href="http://revolvercoin.org" target="_blank">
            <div className="footer-logo-wrap">
              <img width="60px" height="60px" src={logo} alt="revolver logo" />
            </div>
            <div className="footer-logo-descr">
              <h2>Revolver</h2>
              <h2>Coin</h2>
            </div>
          </a>
        </Col>
        <Col className="mui--text-right" md="6">
          <div className="footer-logos-wrap">
            <a href='https://discord.gg/Gn5CeXb' target='blank'><img width="40px" height="40px" src={discordLogo} alt="discord" /></a>
            <a href='https://twitter.com/RevolverCoin' target='blank'><img width="40px" height="40px" src={twitterLogo} alt="twitter" /></a>
          </div>
          <Team>2018 revolver core team</Team>
        </Col>
      </Row>
    </Container>
  </Container>
)

export default FooterBlock
