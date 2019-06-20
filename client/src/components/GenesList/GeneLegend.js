import React from 'react'

function GeneLegend() {
    return (
        <React.Fragment>
            <div className="flex">
                Click on any of the Gene to know more about:
            </div>
            <div className="flex">
                Gene Id
            </div>
            <div className="flex">
                Gene Name
            </div>
            <div className="flex">
                Is Gene Functional
            </div>

        </React.Fragment>
    )
}

export default GeneLegend
