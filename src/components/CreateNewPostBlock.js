import React from 'react'
import styled from 'styled-components';
import Textarea from 'muicss/lib/react/textarea'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar';
import MainButton from './MainButton'


const Img = styled.img`
  border-radius:50%;
`

class CreateNewPostBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textInput: '',
      disableSubmitBtn: true,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const text = this.state.textInput
    this.props.createNewPostAction(text)
    this.setState({
      textInput: '',
    })
  }

  handleInputChange(e) {

    this.setState({
      textInput: e.target.value,
      disableSubmitBtn: !e.target.value.trim().length,
    })
  }

  render() {
    return (
      <Container className="m-t-md">
        <Row>
          <form onSubmit={this.onSubmit}>
            <Col md="2">
              {this.props.avatar ? 
                <Img src={this.props.avatar} width='60'/>
                :
                <Avatar name={this.props.username} size='60' round={true} />
              }

              
            </Col>
            <Col md="10">
              <Textarea
                onChange={this.handleInputChange}
                placeholder="Create new post"
                value={this.state.textInput}
              />
              <div className="mui--text-right">
                <MainButton className="revolver-btn-main" disabled={this.state.disableSubmitBtn} handleAction={this.onSubmit} text="Post" />
              </div>
            </Col>
          </form>
        </Row>
      </Container>
    )
  }
}

CreateNewPostBlock.propTypes = {
  createNewPostAction: PropTypes.func.isRequired,
}

export default CreateNewPostBlock
