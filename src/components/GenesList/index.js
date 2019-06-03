import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'

class GenesList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            listOfGenes: []
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.listOfGenes !== this.props.listOfGenes) {
            this.setState({ listOfGenes: this.props.listOfGenes})
        }
    }
    render () {
        const { listOfGenes } = this.state
        const tableData = listOfGenes.map(gene => {
            return (
                <tr key={gene.id}>
                    <th scope='row'>{gene.id}</th>
                    <td>{gene.name}</td>
                    <td>{String(gene.functional)}</td>
                </tr>)
        })
        return (
            <div>
                <h3 style={{ marginTop: 20 }}>Genes</h3>
                <hr/>
                <div style={{ height: '200px', overflowY: 'scroll', width: '650px' }}>
                    <Table borderless>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Formula</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        listOfGenes: state.data.model.listOfGenes
    }
}

export default connect(mapStateToProps, {})(GenesList)
