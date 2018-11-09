import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styled from 'styled-components'


const supportsBlockStyle = {
  supportsLink: {
    fontSize: '18px',
    color: '#7d000f',
  },
  description: {
    fontSize: '16px',
  },
}

const Panel = styled.div`
  background: white;
  text-align: left;
  border: 1px solid #a1a1a1;
  border-top: none;
  text-align: center;
  padding: 20px;
`
const Caption = styled.div`
  text-transform: uppercase;
  margin: 0;
  text-align: left;
  border: 1px solid #a1a1a1;
  border-top: none;
  background: #fafafa;
  font-size: 14px;
  color: #832e55;
  padding: 8px 0 8px 15px;
`

const SupportsBlock = props => (
  <div>
    <Caption>Supports</Caption>
    <Panel>
      <div className="mui--text-left m-b-md">
        <table className="m-b-md full-width">
          <tbody>
            <tr>
              <td className="mui--text-left">
                <p style={supportsBlockStyle.description}>My supporters</p>
              </td>
              <td className="mui--text-right">
                <p>
                  <Link
                    to="/supported"
                    style={supportsBlockStyle.supportsLink}
                    onClick={() => props.getIncomingSupportsAction()}
                  >
                    {props.userSupportedCount} supports
                  </Link>
                </p>
              </td>
            </tr>
            <tr>
              <td className="mui--text-left">
                <p style={supportsBlockStyle.description}>I support</p>
              </td>
              <td className="mui--text-right">
                <p>
                  <Link
                    to="/supporting"
                    style={supportsBlockStyle.supportsLink}
                    onClick={() => props.getOutgoingSupportsAction()}
                  >
                    {props.userSupportingCount} supports
                  </Link>
                </p>
              </td>
            </tr>
            <tr>
              <td className="mui--text-left">Type</td>
              <td className="mui--text-right">{props.type}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <Link to="/generator" className="revolver-btn-main">
          Generator
        </Link>
      </div>
    </Panel>
  </div>
)

SupportsBlock.propTypes = {
  getIncomingSupportsAction: PropTypes.func.isRequired,
  getOutgoingSupportsAction: PropTypes.func.isRequired,
  createSupportAction: PropTypes.func.isRequired,

  userSupportedCount: PropTypes.number.isRequired,
  userSupportingCount: PropTypes.number.isRequired,
}

export default SupportsBlock
