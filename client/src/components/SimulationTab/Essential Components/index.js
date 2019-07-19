import React from 'react'
import {Row,Col,Table} from 'reactstrap'
import "react-input-range/lib/css/index.css"

function EssentialComponents(props){
    if (props.analysisReactions && props.analysisGenes) {
        const reactionsTableData = props.analysisReactions.map((reaction,index) => {
            return (
                <tr data-div_id={reaction.id}
                    key={reaction.id}>
                    <td >{reaction.id}</td>
                    <td >{reaction.flux}
                    </td>
                </tr>)
        });

        const genesTableData = props.analysisGenes.map((gene,index) => {
            return (
                <tr data-div_id={gene.id}
                    key={gene.id}>
                    <td >{gene.id}</td>
                    <td >{gene.name}
                    </td>
                </tr>)
        });

        return (
            <div style={{borderBottom: "1px solid #adadad"}}>
                <br/>
                <h3 >Essential Components &nbsp;
                </h3>
                <hr/>
                <div style={{
                    height: props.height,
                    overflowY: 'scroll',
                    overflowX: 'none',
                    borderRight: "1px solid #adadad",
                    borderLeft: "1px solid #adadad"
                }}>

                    <Row>
                        <Col md="6">
                            <Table borderless>
                                <thead>
                                <tr >
                                    <th >Reaction Id</th>
                                    <th >Flux Values</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reactionsTableData}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md="6">
                            <Table borderless>
                                <thead>
                                <tr >
                                    <th >Gene Id</th>
                                    <th >Gene Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {genesTableData}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>

            </div>
        )
    } else {
        return <div>
        </div>
    }
}


export default EssentialComponents
