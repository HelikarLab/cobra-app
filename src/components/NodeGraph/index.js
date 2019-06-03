import React from 'react'
import { connect } from 'react-redux'

function NodeGraph (props) {
  return <div>

    <h3 style={{ marginTop: 20 }}>Model Info</h3>
    <hr/>
    <dl className={'row'}>

      <dt className={'col-sm-6'}>Model Name: </dt>
      <dd className={'col-sm-6'}>{props.modelName}</dd>

      <dt className={'col-sm-6'}>Number of Metabolites: </dt>
      <dd className={'col-sm-6'}>{props.noOfMetabolites}</dd>

      <dt className={'col-sm-6'}>Number Of Reactions: </dt>
      <dd className={'col-sm-6'}>{props.noOfReactions}</dd>

      <dt className={'col-sm-6'}>Number of Genes: </dt>
      <dd className={'col-sm-6'}>{props.noOfGenes}</dd>

    </dl>
  </div>
}

function mapStateToProps (state) {
  return {
    modelName: state.data.model.name,
    noOfMetabolites : state.data.model.noOfMetabolites,
    noOfReactions : state.data.model.noOfReactions,
    noOfGenes : state.data.model.noOfGenes

  }
}

export default connect(mapStateToProps, {})(NodeGraph)
