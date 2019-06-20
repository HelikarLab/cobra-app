import React from 'react';

function ModelMetaData(props) {
    if(props.data) {
        return (
            <div className="graph-canvas" style={{padding: "10px"}}>


                <dt className="col-sm-5">Model Name:</dt>
                <dd className="col-sm-12">{props.data}</dd>

            </div>
        )
    }
    else{
        return (
            <div className="graph-canvas" style={{padding: "10px"}}>

                <dt className="col-sm-12">Please Upload a Model using the import button</dt>

            </div>
        )
    }

}

export default ModelMetaData
