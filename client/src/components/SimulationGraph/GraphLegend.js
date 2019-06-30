import React from 'react'

function GraphLegend() {
  return (
    <React.Fragment>
      <div className="flex">
        <div className="circle-icon blue" />- Metabolite Nodes
      </div>
      <div className="flex">
        <div className="circle-icon red" />- Reaction Nodes
      </div>
      <div className="flex">
        <div className="circle-icon green" />- Reactant Edge
      </div>
      <div className="flex">
        <div className="circle-icon yellow" />- Product Edge
      </div>
      <div className="flex">--> - Reversible reactions</div>
    </React.Fragment>
  )
}

export default GraphLegend
