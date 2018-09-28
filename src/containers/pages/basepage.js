import React from 'react'


import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import AsideUserBlock from '../../components/AsideUserBlock'
import HeaderBlock from '../../containers/HeaderBlock'
import FooterBlock from '../../components/FooterBlock'

import NetworkStatsBlock from '../../containers/NetworkStatsBlock'


const tabPageLayout = {
    background: '#e2e2e2',
    marginTop: '20px',
}

const homePageStyle = {
    background: '#e3e3e3',
}

class BasePage extends React.Component {

    // should be overridden in child page
    renderPage() {}

    render() {

        return (

            <div style={homePageStyle}>
                <HeaderBlock />
                <Container>
                    <Row>
                        <Col md="3" sm="12">
                            <AsideUserBlock />
                        </Col>
                        <Col md="6" sm="12">
                            <div style={tabPageLayout}>

                                {this.renderPage()}

                            </div>
                        </Col>
                        <Col md="3" sm="12">
                            <NetworkStatsBlock />
                        </Col>
                    </Row>
                </Container>
                <FooterBlock />
            </div>
        )
    }
}

export default BasePage;
