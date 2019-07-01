import React from 'react'
import {Table, UncontrolledTooltip} from 'reactstrap'
import {Icon} from "react-icons-kit";
import GeneLegend from "./GeneLegend";
import { infoCircle } from 'react-icons-kit/fa/infoCircle';

function GenesList(props) {

    if (props.genes) {
        const tableData = props.genes.map(gene => {
            return (
                <tr
                    onClick={() => {
                        props.setInfo(gene)
                        props.setType('gene')
                    }}
                    data-div_id={gene.id}
                    key={gene.id} >
                    <th scope='row'>{gene.id}</th>
                    <td>{String(gene.functional)}</td>
                </tr>)
        });
        return (
            <div style={{borderBottom: "1px solid #adadad"}}>
                <h3 style={{ marginTop: 20 }}>Genes &nbsp;
                    <Icon icon={infoCircle} id="gene-legend-info" />
                    <UncontrolledTooltip placement="right" target="gene-legend-info">
                        <GeneLegend />
                    </UncontrolledTooltip>
                </h3>
                <hr/>
                <div style={{ height: '550px', overflowY: 'scroll',  borderRight: "1px solid #adadad" ,borderLeft: "1px solid #adadad"}}>
                    <Table borderless>
                        <thead>
                        <tr>
                            <th >Id</th>
                            <th>Functional</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    } else {
        return <div> </div>
    }
}


export default GenesList
