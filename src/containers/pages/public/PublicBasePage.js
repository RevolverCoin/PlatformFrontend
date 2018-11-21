import React from 'react'
import styled from 'styled-components';

import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import ColMUI from 'muicss/lib/react/col'
import AsideBlock from './AsideBlock'
import TopBlock from './TopBlock'

import HeaderBlock from '../../sideblocks/HeaderBlock'
import FooterBlock from '../../../components/sideblocks/FooterBlock'



const SiteContainer = styled.div`
    background: #e3e3e3;
`

const PageContainer = styled(Container)`
    font-family: 'Open Sans', sans-serif;
    margin-top:10px;
    margin-bottom: 20px;
    min-height: 600px;
`
const Col = styled(ColMUI)`
    padding-left:10px;
    padding-right:10px;
`


class PublicBasePage extends React.Component {

    // should be overridden in child page
    renderPage() {}

    render() {

        return (

            <SiteContainer>
                <HeaderBlock />
                <PageContainer>
                    <Row>
                        <Col md="3" sm="12">
                            <AsideBlock />
                        </Col>
                        <Col md="6" sm="12">
                            <div>
                                {this.renderPage()}
                            </div>
                        </Col>
                        <Col md="3" sm="12">
                            <TopBlock />
                        </Col>
                    </Row>
                </PageContainer>
                <FooterBlock />
            </SiteContainer>
        )
    }
}

export default PublicBasePage;
