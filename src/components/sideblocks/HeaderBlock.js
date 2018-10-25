import React from 'react'
import { Redirect, Link } from 'react-router-dom'


import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types'
import './../../styles/header.css'
import logo from './../../img/logo.png'
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
} from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)


const LogoImg = styled.img`
  width: 60px;
  height: 60px;
`

const Input = styled.input`
  border: none;
  width: 100px;
  margin-left: 10px;
  margin-top: 2px;
  float:left;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #ddd;
    font-style: italic;
  }
`

const SearchIcon = styled(FontAwesomeIcon)`
  width: 50px;
  display: inline;
  float: left;
  margin-top:4px;
  margin-left:2px;
  color: #666;
  cursor:pointer;

`

const DivSearch = styled.div`
  width: 140px;
  height: 20px;
  margin-top:20px;
  border: 1px solid #666;
  border-radius: 20px;
  padding:5px;
`

const SubmitInput = styled.input`
  display: none;
`

class HeaderBlock extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchInput: "",
      redirectSearch: false
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  onSearchChange(e) {
    this.setState({ searchInput: e.target.value })
  }

  handleSearch(e)
  {
    if(e) e.preventDefault();
    this.setState({ redirectSearch: true })
  }

  renderRedirect = () => {
    if (this.state.redirectSearch) {
      this.setState({ redirectSearch: false })
      return <Redirect to={{
        pathname:'/search',
        search: '?query=' + this.state.searchInput
      }} />
    }
  }

  render() {
    const isLoggedIn = localStorage.getItem('isLogged')

    return (
      <Container fluid className="header-top">

        <Container>
          <Row>
            <Col className="mui--text-left" md="8">
              <Link to="/">
                <div>

                  <div className="header-top-logo-wrap">
                    <LogoImg src={logo} alt="revolver logo" />
                  </div>
                  <div className="header-top-logo-descr">
                    <h2>Revolver</h2>
                    <p>Support Hub</p>
                  </div>

                </div>
              </Link>

            </Col>
            <Col md="2">
              {isLoggedIn ?
                <DivSearch>
                  <SearchIcon icon='search' onClick={this.handleSearch}/>
                  <form onSubmit={this.handleSearch}>
                    <Input type='text' name='search' placeholder='Search' onChange={this.onSearchChange} value={this.state.searchInput} />
                    <SubmitInput type="submit" value="Submit" />
                  </form>
                  {this.renderRedirect()}
                </DivSearch>
                : null}
            </Col>
            <Col className="mui--text-right" md="2">
              <h3>
                {isLoggedIn ?
                  <Link
                    className="header-top-logout-link"
                    to="/login"
                    onClick={() => this.props.logoutAction()}
                  >Logout
                  </Link> :
                  <Link className="header-top-signin-link-disabled" to="/login" onClick={e => e.preventDefault()}>Sign In</Link>}
              </h3>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}

HeaderBlock.defaultProps = {
  logoutAction: null,
}

HeaderBlock.propTypes = {
  logoutAction: PropTypes.func,
}

export default HeaderBlock
