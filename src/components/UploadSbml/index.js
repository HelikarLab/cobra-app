/* eslint-env browser */
import React, {Component} from 'react';
import axios from 'axios'
import { Formik } from 'formik'

class UploadSbml extends Component{

    constructor(props) {
        super(props);
        this.state= {
            info :null
        }

    }


    render() {
        return (
            <React.Fragment>
                <Formik initialValues={{upload: ''}}
                        onSubmit={(values, actions) => {
                            const formData = new FormData()
                            formData.append('file', values.file, values.file.name)
                            axios.post('/api/uploadSbml', formData)
                                .then(
                                    res => {
                                        this.setState({
                                            info : res.data
                                        })
                                    }
                                )
                        }}
                        render={(props) => (
                            <form onSubmit={props.handleSubmit}>
                                <input type='file' name='file' placeholder='Upload' onChange={(event) => {
                                    props.setFieldValue('file', event.currentTarget.files[0])
                                }}/>
                                <button type='submit'>Submit</button>
                            </form>
                        )}
                />

                <br/>
                <hr/>

                <div>
                    Version:
                    {
                        this.state && this.state.info && JSON.parse(this.state.info[0]).version
                    }
                </div>
                <br/>

                <div>
                    Total Number Of Species:
                    {
                        this.state && this.state.info && JSON.parse(this.state.info[0]).noOfSpecies
                    }
                </div>
                <br/>

                <div>
                    LIST OF SPECIES[First 5]:<br/>
                    {
                        this.state && this.state.info &&
                        JSON.parse(this.state.info[0]).listOfSpecies.map((species, index) => {
                            return <div>
                                {
                                    species
                                }
                            </div>
                        })
                    }
                </div>
                <br/>
                <div>
                    LIST OF Reactions[First 5]:<br/>
                    {
                        this.state && this.state.info &&
                        JSON.parse(this.state.info[0]).listOfReactions.map((reactions, index) => {
                            return <div>
                                {
                                    reactions
                                }
                            </div>
                        })
                    }
                </div>

            </React.Fragment>
        )
    }
}

export default UploadSbml
