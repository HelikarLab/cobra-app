import React from 'react'
import { Table, UncontrolledTooltip} from 'reactstrap'
import {Icon} from "react-icons-kit";
import ReactionLegend from "./ReactionLegend";
import { infoCircle } from 'react-icons-kit/fa/infoCircle';
import './index.css';

function ReactionsList(props) {

    if (props.reactions) {
        const tableData = props.reactions.map(reaction => {
            return (
                <tr
                   onClick={() => {
                       props.setInfo(reaction)
                       props.setType('reaction')
                   }}
                    id="reaction-row"
                    data-div_id={reaction.id}
                    key={reaction.id} >

                    <th className="hoverSection" style={{width: "35%"}} scope='row'>{reaction.id}</th>
                    <td className="hoverSection" style={{width: "65%"}}>{reaction.equation}</td>
                </tr>)
        });
        return (
            <div style={{borderBottom: "1px solid #adadad"}}>
                <h3 style={{ marginTop: 20 }}>Reactions &nbsp;
                <Icon icon={infoCircle} id="reaction-legend-info" />
                    <UncontrolledTooltip placement="right" target="reaction-legend-info">
                        <ReactionLegend />
                    </UncontrolledTooltip>
                </h3>
                <hr/>
                <div style={{ height: '550px', overflowY: 'scroll', borderRight: "1px solid #adadad" ,borderLeft: "1px solid #adadad" }}>
                    <Table borderless>
                        <thead>
                        <tr >
                            <th style={{width: "35%"}}>Id</th>
                            <th style={{width: "35%"}}>Equation</th>
                        </tr>
                        </thead>
                        <tbody id="reaction-list">
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


export default ReactionsList
