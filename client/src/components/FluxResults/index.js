import React from 'react'
import {Table} from 'reactstrap'
import "react-input-range/lib/css/index.css"

function FluxResults(props){

    if (props.updatedReactions) {
        const tableData = props.updatedReactions.map((reaction,index) => {
            return (
                <tr data-div_id={reaction.id}
                    key={reaction.id}>
                    <td style={{width: "15%"}} >{reaction.id}</td>
                    <td style={{width: "85%"}} >{reaction.flux}
                    </td>
                </tr>)
        });

        return (
            <div style={{borderBottom: "1px solid #adadad"}}>
                <br/>
                <h3 >Flux Results &nbsp;
                </h3>
                <hr/>
                <div style={{
                    height: props.height,
                    overflowY: 'scroll',
                    overflowX: 'none',
                    borderRight: "1px solid #adadad",
                    borderLeft: "1px solid #adadad"
                }}>
                    <Table borderless>
                        <thead>
                        <tr >
                            <th style={{width: "15%"}}>Reaction Id</th>
                            <th style={{width: "85%"}}>Flux Values</th>
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
        return <div>
        </div>
    }
}


export default FluxResults
