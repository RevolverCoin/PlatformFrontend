import React from 'react'
import Panel from 'muicss/lib/react/panel'
import PropTypes from 'prop-types'

const networkStatsBlockStyles = {
  description: {
    fontSize: '16px',
  },
}

class NetworkStatsBlock extends React.Component {
  constructor(props)
  {
    super(props)
  }

  componentDidMount(){
    this.props.startFetchServiceInfo()
  }

  componentWillUnmount()
  {
    this.props.stopFetchServiceInfo()
  }
 

  render() {

    let blockTime = '';
    
    if (this.props.stats) {
      const date = (new Date(this.props.stats.lastBlockTime))
      blockTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    
    return (
      <Panel className="m-t-md" style={networkStatsBlockStyles}>
        <h3 className="mui--text-center m-t-none block-title">Network stats</h3>
        <table className="m-b-md full-width">
          <tbody>
    
            <tr>
              <td className="mui--text-left">
                <p style={networkStatsBlockStyles.description}>
                  Last Block
                </p>
              </td>
              <td className="mui--text-right">
                <p style={networkStatsBlockStyles.description}>
                  {this.props.stats.blockHeight}
                </p>
              </td>
            </tr>
    
            <tr>
    
              <td className="mui--text-left">
                <p style={networkStatsBlockStyles.description}>
                  Block Time
                </p>
              </td>
              <td className="mui--text-right">
                <p style={networkStatsBlockStyles.description}>
                  {blockTime}
                </p>
              </td>
            </tr>


            <tr>
              <td className="mui--text-left">
                <p style={networkStatsBlockStyles.description}>
                  Total rewards
                </p>
              </td>
              <td className="mui--text-right">
                <p style={networkStatsBlockStyles.description}>
                  {this.props.stats.blockHeight} XRE
                </p>
              </td>
            </tr>

    
    
            <tr>
    
              <td className="mui--text-left">
                <p style={networkStatsBlockStyles.description}>
                  Users
                </p>
              </td>
              <td className="mui--text-right">
                <p style={networkStatsBlockStyles.description}>
                  {this.props.stats.users}
                </p>
              </td>
            </tr>

            <tr>
              <td className="mui--text-left">
                <p style={networkStatsBlockStyles.description}>
                  Generators
                </p>
              </td>
              <td className="mui--text-right">
                <p style={networkStatsBlockStyles.description}>
                  {this.props.stats.generators}
                </p>
              </td>
            </tr>
    
            <tr>
    
              <td className="mui--text-left">
                <p style={networkStatsBlockStyles.description}>
                  Total Supports
                </p>
              </td>
              <td className="mui--text-right">
                <p style={networkStatsBlockStyles.description}>
                  {this.props.stats.supports}
                </p>
              </td>
            </tr>

            <tr>
              <td className="mui--text-left">
                <p style={networkStatsBlockStyles.description}>
                  Supporting
                </p>
              </td>
              <td className="mui--text-right">
                <p style={networkStatsBlockStyles.description}>
                  {this.props.stats.supporting}
                </p>
              </td>
            </tr>
    
            <tr>
              <td className="mui--text-left">
                <p style={networkStatsBlockStyles.description}>
                  Supported
                </p>
              </td>
              <td className="mui--text-right">
                <p style={networkStatsBlockStyles.description}>
                  {this.props.stats.supported}
                </p>
              </td>
            </tr>
    
    
    
          </tbody>
        </table>
      </Panel>
    )
    
  }
}  
NetworkStatsBlock.propTypes = {
  stats: PropTypes.object.isRequired,
  startFetchServiceInfo: PropTypes.func.isRequired, 
  stopFetchServiceInfo: PropTypes.func.isRequired

}

export default NetworkStatsBlock
