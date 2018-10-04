import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar';

const mySinglePostBlockStyle = {
  postBlock: {
    marginBottom: '1px',
  },
  avatarWrapper: {
    paddingLeft: 0,
    paddingRight: 0,
    width: 'auto',
  },
  avatar: {
    width: '60px',
    height: '60px',
  },
  avatarText: {
    position: 'relative',
    top: '35%',
  },
  userName: {
    color: '#1f363d',
    fontWeight: 600,
  },
}

const MySinglePostBlock = props => (
  <Panel style={mySinglePostBlockStyle.postBlock}>
    <Container>
      <Row>
        <Col md="2" style={mySinglePostBlockStyle.avatarWrapper}>
          <div>
            <Avatar name={props.username} size='60'/>
          </div>
        </Col>
        <Col md="10">
          <p className="mui--text-left">
            <Link to="" className="m-r-md" style={mySinglePostBlockStyle.userName}>
              {props.username}
            </Link>
            <span>
              {props.date}
            </span>
          </p>
          <p className="mui--text-left">{props.text}</p>
        </Col>
      </Row>
    </Container>
  </Panel>
)

MySinglePostBlock.defaultProps = {
  username: '',
}

MySinglePostBlock.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default MySinglePostBlock

