import React from 'react'
import styled from 'styled-components'

import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import HeaderBlock from '../sideblocks/HeaderBlock'
import FooterBlock from '../sideblocks/FooterBlock'

const FormContainer = styled(Container)`
  min-height: 600px;
  width: 600px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 40px;
`
const Header = styled.div`
  margin: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 20px;
  padding: 10px;
  text-transform: uppercase;
`

const RowInputForm = styled(Row)`
  margin-top: 20px;
`

class BaseFormPage extends React.Component {
  // should be overridden in child page
  renderPage() {}

  // should be overridden in child page
  getCaption() {
      return ''
  }


  render() {
    return (
      <Container fluid className="guest-page-wrapper">
        <HeaderBlock />

        <div className="m-t-xl">
          <FormContainer>
            <Row>
              <Col md="12">
                <Header>{this.getCaption()}</Header>
              </Col>
            </Row>
            <RowInputForm>
              <Col md="8" md-offset="2">
                {this.renderPage()}
              </Col>
            </RowInputForm>
          </FormContainer>
        </div>

        <FooterBlock />
      </Container>
    )
  }
}

export default BaseFormPage