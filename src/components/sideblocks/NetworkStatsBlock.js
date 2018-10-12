import React from 'react'
import Panel from 'muicss/lib/react/panel'
import PropTypes from 'prop-types'

const networkStatsBlockStyles = {
  description: {
    fontSize: '16px',
  },
}

const NetworkStatsBlock = props => (
  <Panel className="m-t-md" style={networkStatsBlockStyles}>
    <h3 className="mui--text-center m-t-none block-title">Network stats</h3>
    <table className="m-b-md full-width">
      <tbody>
        <tr>
          <td className="mui--text-left">
            <p style={networkStatsBlockStyles.description}>
              Authors
            </p>
          </td>
          <td className="mui--text-right">
            <p style={networkStatsBlockStyles.description}>
              {props.networkStatsAuthors}
            </p>
          </td>
        </tr>
        <tr>
          <td className="mui--text-left">
            <p style={networkStatsBlockStyles.description}>
              Supporters
            </p>
          </td>
          <td className="mui--text-right">
            <p style={networkStatsBlockStyles.description}>
              {props.networkStatsSupporters}
            </p>
          </td>
        </tr>
        <tr>
          <td className="mui--text-left">
            <p style={networkStatsBlockStyles.description}>
              Generator
            </p>
          </td>
          <td className="mui--text-right">
            <p style={networkStatsBlockStyles.description}>
              {props.userSupportsGenerator}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </Panel>
)

NetworkStatsBlock.propTypes = {
  networkStatsAuthors: PropTypes.number.isRequired,
  networkStatsSupporters: PropTypes.number.isRequired,
  userSupportsGenerator: PropTypes.number.isRequired,
}

export default NetworkStatsBlock
