import React from 'react'
import styled from 'styled-components';

import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import ColMUI from 'muicss/lib/react/col'
import AsideUserBlock from '../sideblocks/AsideUserBlock'
import HeaderBlock from '../../containers/sideblocks/HeaderBlock'
import FooterBlock from '../../components/sideblocks/FooterBlock'

import NetworkStatsBlock from '../../containers/sideblocks/NetworkStatsBlock'
import backImage from '../../img/main-bg.png'

const SiteContainer = styled.div`
    background: url(${backImage}) no-repeat;
    background-position: center;
    background-size: cover;
`

const PageContainer = styled(Container)`
    font-family: 'Open Sans', sans-serif;
    margin-top:10px;
    margin-bottom: 20px;
`
const Col = styled(ColMUI)`
    padding-left:10px;
    padding-right:10px;
`


class BasePage extends React.Component {

    // should be overridden in child page
    renderPage() {}

    render() {

        return (

            <SiteContainer>
                <HeaderBlock />
                <PageContainer>
                    <Row>
                        <Col md="3" sm="12">
                            <AsideUserBlock />
                        </Col>
                        <Col md="6" sm="12">
                            <div>
                                {this.renderPage()}
                            </div>
                        </Col>
                        <Col md="3" sm="12">
                            <NetworkStatsBlock />
                        </Col>
                    </Row>
                </PageContainer>
                <FooterBlock />
            </SiteContainer>
        )
    }
}

export default BasePage;
