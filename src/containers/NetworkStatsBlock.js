import { connect } from 'react-redux'

import NetworkStatsBlock from '../components/NetworkStatsBlock'


const mapStateToProps = (state) => {
  const { root } = state
  const stats = root.hasIn(['stats']) && root.getIn(['stats'])

  let authorsCount = stats && stats.get('authors') && stats.get('authors').size
  if (!authorsCount) authorsCount = 0;

  let supportersCount = stats && stats.get('supporters') && stats.get('supporters').size
  if (!supportersCount) supportersCount = 0;

  let generatorCount = stats && stats.get('generator') && stats.get('generator').size
  if (!generatorCount) generatorCount = 0;

  return {
    networkStatsAuthors: authorsCount,
    networkStatsSupporters: supportersCount,
    userSupportsGenerator: generatorCount,
  }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NetworkStatsBlock)
