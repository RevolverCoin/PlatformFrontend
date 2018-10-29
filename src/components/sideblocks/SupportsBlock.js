import React from 'react'
import Panel from 'muicss/lib/react/panel'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MainButton from './../MainButton'

const supportsBlockStyle = {
  supportsLink: {
    fontSize: '18px',
    color: '#7d000f',
  },
  description: {
    fontSize: '16px',
  },
}

const SupportsBlock = props => (
  <Panel>
    <div className="mui--text-left m-b-md">
      <h3 className="mui--text-center m-t-none block-title">Supports</h3>
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
            <td className="mui--text-left">
              Type
            </td>
            <td className="mui--text-right">
              {props.type}
            </td>
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
)

SupportsBlock.propTypes = {
  getIncomingSupportsAction: PropTypes.func.isRequired,
  getOutgoingSupportsAction: PropTypes.func.isRequired,
  createSupportAction: PropTypes.func.isRequired,
  
  userSupportedCount: PropTypes.number.isRequired,
  userSupportingCount: PropTypes.number.isRequired,
}

export default SupportsBlock
