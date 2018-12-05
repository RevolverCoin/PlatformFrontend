import React from 'react'
import styled from 'styled-components'

import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { Link } from 'react-router-dom'

import '../../styles/front.css'
import supportsThumb from '../../img/supports-thumb.png'
import rewardsThumb from '../../img/rewards-thumb.png'
import fansThumb from '../../img/fans-thumb.png'
import nodesImg from '../../img/nodes.png'

import HeaderBlock from '../../containers/sideblocks/HeaderBlock'
import FooterBlock from '../sideblocks/FooterBlock'

const ComingSoon = styled.div`
  margin-top:30px;
  font-size: 30px;
  color:#ffdf49;
`
const BannerText =styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
`

const FrontPage = props => (
  <Container fluid className="guest-page-wrapper">
    <HeaderBlock />

    <Container fluid className="front-banner">
      <Row>
        <Col md="4" md-offset="4">
          <BannerText>
            <h1>Decentralized</h1>
            <h1>Reward platform</h1>
            <h3>be rewarder by your creations</h3>
          </BannerText>
        </Col>
      </Row>
    </Container>

    <Container fluid className="feature-block">
      <Container>
        <Row>
          <Col md="4">
            <div className="feature-item">
              <div className="feature-item-img item-supports" />
              <img src={supportsThumb} alt="supports" />
              <h3>
                <span>Support your</span>
                <span>favorite author</span>
              </h3>
            </div>
          </Col>
          <Col md="4">
            <div className="feature-item">
              <img src={rewardsThumb} alt="rewards" />
              <h3>
                <span>Get rewards for</span>
                <span>talent discovery</span>
              </h3>
            </div>
          </Col>
          <Col md="4">
            <div className="feature-item">
              <img src={fansThumb} alt="fans" />
              <h3>
                <span>Your fans earn</span>
                <span>together with you</span>
              </h3>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>

    <Container fluid className="description-block">
      <Container>
        <Row>
          <Col md="6">
            <h2 className="description-block-title">
              <span className="description-block-title-accent">Revolver support hub </span>
              is a simple social network that demonstrates the support functionality of the{' '}
              <span className="description-block-title-accent">revolver platform</span>. It is easy
              to support your favorite author and share the rewards
            </h2>
            <Link to="/login" className="front-signin-btn">
              Sign In
            </Link>
          </Col>
          <Col md="6">
            <img src={nodesImg} alt="nodes" width='220' />
          </Col>
        </Row>
      </Container>
    </Container>
    <FooterBlock />
  </Container>
)

export default FrontPage
