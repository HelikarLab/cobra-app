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

                <div>
                    Objective Value : &nbsp;
                    <Button color="info" disabled="true">
                        {
                            props.info
                        }
                    </Button>
                </div>

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
