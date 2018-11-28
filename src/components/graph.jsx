import React, { Component } from "react"
import Graph from "react-graph-vis"
import PropTypes from 'prop-types'


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  },
  physics: false,
  interaction: {
    dragNodes: false,
    dragView: false,
    zoomView: false
  }
}

const nodeFont = { color: "#049", background: "white" }

const nodeParams = {
  font: nodeFont, 
  shape: "circularImage",
  color: "#93b2d9"
}

const edgeFont = {
  strokeWidth: 0,
  color: "#fff",
  background: "#93b2d9",
}


function placeNodes(nodes, pivotNodeId) {
  const r = 200
  return nodes.map((n, index) => {
    if (n.id === pivotNodeId) {
      return Object.assign({}, n, {
        x: 0,
        y: 0
      })
    } else {
      const len = nodes.length - 1
      return Object.assign({}, n, {
        x: r * Math.cos((index * 2 * Math.PI) / len),
        y: r * Math.sin((index * 2 * Math.PI) / len)
      })
    }
  })
}

function createShadowNodes(graphNodes, graphEdges) {
  const edges = [...graphEdges]
  const nodes = graphNodes.reduce((acc, next) => {
    acc.push(next)

    if (!next.image) {
        //get name initials
      const initials = next.imageInitials
      const newId = `${next.id}-shadow`

      //create a shadow node to have both avatar text (text inside label)
      //and text underneath node for name
      const shadowNode = Object.assign({}, next, {
        id: newId,
        label: initials,
        margin: 18,
        shape: "circle",
        color: next.imageColor,
        background: 'transparent',
        font: {color: 'white'},
      })

      //point existing edges to a shadow node
      const to = edges.findIndex(e => e.to === next.id)
      const from = edges.findIndex(e => e.from === next.id)
      if (to >= 0) {
        edges[to].to = newId
      }
      if (from >= 0) {
        edges[from].from = newId
      }

      acc.push(shadowNode)
    }
    return acc
  }, [])

  return { nodes, edges }
}

function decorateEdges(edges) {
  return edges.map(e => ({ ...e, font: edgeFont }))
}

function decorateNodes(nodes) {
  return nodes.map(n => ({ ...n, ...nodeParams }))
}


function makeGraph(owner, supports) {
    const makeNode =  ({id, username, image, imageColor, imageInitials, userId}) => {
        return {id, label: username, image: image || '', imageColor, imageInitials, userId}
    }

    const makeEdge = (from,to, label, isBidirectional) => {
        const result =  { from, to, label }
        if (isBidirectional){
            const arrowTo = {
                scaleFactor:0.5,
                type: 'arrow',
                enabled:true
            }
            const arrowFrom = {
                scaleFactor:0.5,
                type: 'arrow',
                enabled:true
            }

            result.arrows = {
                to: arrowTo,
                from : arrowFrom
            }
        }
        return result
    }

    const {username, image, imageColor, imageInitials, userId }  = owner
    
    let nodes = [makeNode({id:0, username, image, imageColor, imageInitials, userId})]
    nodes = nodes.concat (supports.map ( (entry, index)=>{
        const { username, image, imageColor, imageInitials, userId} = entry
        return makeNode({id:index + 1, username, image, imageColor, imageInitials, userId})
    }))


    const edges = supports.map ( (entry, index)=>{
        const isBidirectional = !!(entry.from && entry.to)

        if (entry.from){
            return makeEdge(index + 1, 0, entry.amount.toString(), isBidirectional)
        }

        return makeEdge(0, index + 1, entry.amount.toString(), isBidirectional)
    })

    return {nodes, edges}
}

export function prepareData(owner, supports) {
  const {nodes, edges} = makeGraph(owner, supports)  
  return createShadowNodes(
    placeNodes(decorateNodes(nodes), 0),
    decorateEdges(edges)
  )
}





export default class SupportersGraph extends Component {
  constructor() {
    super()

    const findNode  = (nodes, id) => {
        return nodes.find( (entry) => entry.id === id)
    } 

    this.events = {
      doubleClick: event => {
        var { nodes, edges } = event
        const { onNodeDoubleClick, graph } = this.props
        if (nodes.length > 0) {
           const [selectedId] = nodes      
           const node = findNode(graph.nodes, selectedId)
           node && onNodeDoubleClick && onNodeDoubleClick(node.userId)
        }
      },
      select: event => {
        var { nodes, edges } = event
        const { onSelectNode, graph } = this.props
        if (nodes.length > 0) {
           const [selectedId] = nodes      
           const node = findNode(graph.nodes, selectedId)
           node && onSelectNode && onSelectNode(node.userId)
        }
      }
    }
  }
  render() {
      const {graph, className} = this.props
      return (
        <Graph
            graph={graph}
            options={options}
            events={ this.events }
            className = {className}
        />
    )
  }
}

SupportersGraph.propTypes = {
    className: PropTypes.string,
    graph: PropTypes.PropTypes.shape({
        nodes: PropTypes.array,
        edges: PropTypes.array
    })
}