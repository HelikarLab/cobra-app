import React from 'react'
import {Table, UncontrolledTooltip} from 'reactstrap'
import {Icon} from "react-icons-kit";
import MetaboliteLegend from "./MetaboliteLegend";
import { infoCircle } from 'react-icons-kit/fa/infoCircle';

function MetabolitesList(props) {

    if (props.metabolites) {
        const tableData = props.metabolites.map(metabolite => {
            return (
                <tr  tag="button"
                     action
                     onClick={() => {
                         props.setInfo(metabolite)
                         props.setType('metabolite')
                     }}
                    data-div_id={metabolite.id}
                    key={metabolite.id} >
                    <th scope='row'>{metabolite.id}</th>
                    <td>{metabolite.name}</td>
                </tr>)
        });
        return (
            <div style={{borderBottom: "1px solid #adadad"}}>
                <h3 style={{ marginTop: 20 }}>Metabolites &nbsp;
                    <Icon icon={infoCircle} id="metabolite-legend-info" />
                    <UncontrolledTooltip placement="right" target="metabolite-legend-info">
                        <MetaboliteLegend />
                    </UncontrolledTooltip>
                </h3>
                <hr/>
                <div style={{ height: '550px', overflowY: 'scroll', borderRight: "1px solid #adadad" , borderLeft: "1px solid #adadad"}}>
                    <Table borderless>
                        <thead>
                        <tr>
                            <th >Id</th>
                            <th>Name</th>
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


export default MetabolitesList
