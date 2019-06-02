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
                    Model: &nbsp;&nbsp;
                    {
                        this.state && this.state.info && JSON.parse(this.state.info[0]).model
                    }
                </div>
                <br/>

                <div>
                    Total Number Of Reactions:&nbsp;&nbsp;
                    {
                        this.state && this.state.info && JSON.parse(this.state.info[0]).noOfReactions
                    }
                </div>
                <br/>
                <div>
                    List Of Reactions  [First 10]:<br/>
                    {
                        this.state && this.state.info &&
                        JSON.parse(this.state.info[0]).listOfReactions
                            .map( (key,index) =>
                                <div>
                                    <hr/>
                                    Reaction: {index+1}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#09; equation: {JSON.parse(this.state.info[0]).listOfReactions[index].equation}&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#09; reversibility:{JSON.parse(this.state.info[0]).listOfReactions[index].reversibility.toString()}
                                </div>)

                    }
                </div>
                <br/>

                <div>
                    Total Number Of Metabolites:&nbsp;&nbsp;
                    {
                        this.state && this.state.info && JSON.parse(this.state.info[0]).noOfMetabolites
                    }
                </div>
                <br/>

                <div>
                    List Of Metabolites  [First 10]:<br/>
                    {
                        this.state && this.state.info && JSON.parse(this.state.info[0]).listOfSpecies
                            .map( (key,index) =>
                                <div>
                                    <hr/>
                                    Metabolite: {index+1}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#09; id: {JSON.parse(this.state.info[0]).listOfSpecies[index].id}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#09;name:{JSON.parse(this.state.info[0]).listOfSpecies[index].name}
                                </div>)

                    }
                </div>
                <br/>

            </React.Fragment>
        )
    }
}

export default UploadSbml
