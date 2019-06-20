import React from 'react'

function InfoPanel(props) {
  if (props.type === 'metabolite') {
    return (
      <div className="graph-canvas" style={{padding: "10px"}}>
        <dl className="row" style={{marginBottom: "0px"}}>
          <dt className="col-sm-5">Metabolite ID</dt>
          <dd className="col-sm-7">{props.data.id}</dd>

          <dt className="col-sm-5">Metabolite Name</dt>
          <dd className="col-sm-7">{props.data.name}</dd>

          <dt className="col-sm-5">Formula</dt>
          <dd className="col-sm-7">{props.data.formula}</dd>

        </dl>
      </div>
    )
  } else if (props.type === 'reaction') {
    return (
        <div className="graph-canvas" style={{padding: "10px"}}>
        <dl className="row" style={{marginBottom: "0px"}}>
          <dt className="col-sm-4">Reaction ID</dt>
          <dd className="col-sm-8">{props.data.id}</dd>

          <dt className="col-sm-4">Reaction Name</dt>
          <dd className="col-sm-8">{props.data.name}</dd>

          <dt className="col-sm-4">Reaction</dt>
          <dd className="col-sm-8">{props.data.equation}</dd>

          <dt className="col-sm-4">Reversible</dt>
          <dd className="col-sm-8">{String(props.data.reversible)}</dd>

        </dl>
      </div>
    )
  } else if (props.type === 'gene') {
    return (
        <div className="graph-canvas" style={{padding: "10px"}}>
          <dl className="row" style={{marginBottom: "0px"}}>
            <dt className="col-sm-4">Gene ID</dt>
            <dd className="col-sm-8">{props.data.id}</dd>

            <dt className="col-sm-4">Gene Name</dt>
            <dd className="col-sm-8">{props.data.name}</dd>

            <dt className="col-sm-4">Functional</dt>
            <dd className="col-sm-8">{String(props.data.functional)}</dd>

          </dl>
        </div>
    )
  }
  else {
    return (
        <div >
        {/*<h5 className="text-muted">Model Information</h5>
        <dl className="row" style={{marginBottom: "0px"}}>
          <dt className="col-sm-3">Model ID</dt>
          <dd className="col-sm-9">{props.modelId}</dd>

          <dt className="col-sm-3">Model Name</dt>
          <dd className="col-sm-9">{props.modelName}</dd>

          <dt className="col-sm-3">SBML Level</dt>
          <dd className="col-sm-9">{props.sbmlLevel}</dd>

          <dt className="col-sm-3">SBML Version</dt>
          <dd className="col-sm-9">{props.sbmlVersion}</dd>
        </dl>*/}
      </div>
    )
  }
}

export default InfoPanel
