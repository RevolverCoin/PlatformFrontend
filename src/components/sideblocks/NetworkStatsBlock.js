import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const networkStatsBlockStyles = {
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
  background: #fafafa;
  font-size: 14px;
  color: #832e55;
  padding: 8px 0 8px 15px;
`

class NetworkStatsBlock extends React.Component {

  componentDidMount() {
    this.props.startFetchServiceInfo()
  }

  componentWillUnmount() {
    this.props.stopFetchServiceInfo()
  }

  render() {
    let blockTime = ''
    let blockTimeAgo = ''

    if (this.props.stats) {
      const date = new Date(this.props.stats.lastBlockTime)

      const currentTime = new Date(this.props.stats.currentTime)
      blockTime = date.toLocaleTimeString()

      const delta = currentTime - date
      blockTimeAgo = delta / 1000

      if (delta / 1000 < 60) {
        blockTimeAgo = '< 1 min'
      } else {
        const mins = delta / 1000 / 60
        blockTimeAgo = Math.floor(mins) + ' min'
      }
    }

    return (
      <div>
        <Caption>Network stats</Caption>
        <Panel>
          <table className="m-b-md full-width">
            <tbody>
              <tr>
                <td className="mui--text-left">
                  <p>Last Block</p>
                </td>
                <td className="mui--text-right">
                  <p>{this.props.stats.blockHeight}</p>
                </td>
              </tr>

              <tr>
                <td className="mui--text-left">
                  <p>Last Block Time</p>
                </td>
                <td className="mui--text-right">
                  <p>{blockTime}</p>
                </td>
              </tr>

              <tr>
                <td className="mui--text-left">
                  <p>Ago</p>
                </td>
                <td className="mui--text-right">
                  <p>{blockTimeAgo}</p>
                </td>
              </tr>

              <tr>
                <td className="mui--text-left">
                  <p>Total rewards</p>
                </td>
                <td className="mui--text-right">
                  <p style={networkStatsBlockStyles.description}>
                    {this.props.stats.blockHeight} XRE
                  </p>
                </td>
              </tr>

              <tr>
                <td className="mui--text-left">
                  <p style={networkStatsBlockStyles.description}>Users</p>
                </td>
                <td className="mui--text-right">
                  <p style={networkStatsBlockStyles.description}>{this.props.stats.users}</p>
                </td>
              </tr>

              <tr>
                <td className="mui--text-left">
                  <p style={networkStatsBlockStyles.description}>Generators</p>
                </td>
                <td className="mui--text-right">
                  <p style={networkStatsBlockStyles.description}>{this.props.stats.generators}</p>
                </td>
              </tr>

              <tr>
                <td className="mui--text-left">
                  <p style={networkStatsBlockStyles.description}>Total Supports</p>
                </td>
                <td className="mui--text-right">
                  <p style={networkStatsBlockStyles.description}>{this.props.stats.supports}</p>
                </td>
              </tr>

              <tr>
                <td className="mui--text-left">
                  <p style={networkStatsBlockStyles.description}>Supporting</p>
                </td>
                <td className="mui--text-right">
                  <p style={networkStatsBlockStyles.description}>{this.props.stats.supporting}</p>
                </td>
              </tr>

              <tr>
                <td className="mui--text-left">
                  <p style={networkStatsBlockStyles.description}>Supported</p>
                </td>
                <td className="mui--text-right">
                  <p style={networkStatsBlockStyles.description}>{this.props.stats.supported}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </Panel>
      </div>
    )
  }
}
NetworkStatsBlock.propTypes = {
  stats: PropTypes.object.isRequired,
  startFetchServiceInfo: PropTypes.func.isRequired,
  stopFetchServiceInfo: PropTypes.func.isRequired,
}

export default NetworkStatsBlock
