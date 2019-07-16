import React from 'react'
import Button from "reactstrap/es/Button";

function AnalysisInfo(props){

    if(props.info) {
        return (
            <div>

                <h3>Analysis Details</h3>

                <hr/><br/>
                <h5>{props.name}</h5>
                <br/>

                <h3>
                    Objective Value : &nbsp;
                    <Button color="info" disabled="true">
                        {
                            props.info
                        }
                    </Button>
                </h3>
                <hr/>

            </div>
        )
    }
    else{
        return (
            <div>

            </div>
        )
    }
}

export default AnalysisInfo;
