
import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'

class MetabolitesList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            listOfMetabolites: []
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.listOfMetabolites !== this.props.listOfMetabolites) {
            this.setState({ listOfMetabolites: this.props.listOfMetabolites})
        }
    }
    render () {
        const { listOfMetabolites } = this.state
        const tableData = listOfMetabolites.map(metabolite => {
            return (
                <tr key={metabolite.id}>
                    <th scope='row'>{metabolite.id}</th>
                    <td>{metabolite.name}</td>
                    <td>{metabolite.formula}</td>
                </tr>)
        })
        return (
            <div>
                <h3 style={{ marginTop: 20 }}>Metabolites</h3>
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
        listOfMetabolites: state.data.model.listOfMetabolites
    }
}

export default connect(mapStateToProps, {})(MetabolitesList)
