import React from 'react'
import {Button,  Table} from 'reactstrap'
import "react-input-range/lib/css/index.css"
import InputRange from 'react-input-range'

class FluxControl extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            values : null,
            updatedReactions: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (param,id) => event =>{
        const array = this.state.values;
        array[param].lower_bound = event.min;
        array[param].upper_bound = event.max;
        this.setState({
            values: array
        });

        const updated = this.state.updatedReactions;
        let i;
        let flag=0;
        for(i=0;i<updated.length;i++){
            if(id===updated[i].id){
                updated[i].lower_bound = event.min;
                updated[i].upper_bound = event.max;
                flag=1;
            }
        }
        if(flag===0) {
            updated.push({
                "id": id,
                "lower_bound": event.min,
                "upper_bound": event.max
            });
        }

        this.setState({
            updatedReactions : updated
        });
    };

    componentDidMount(prevProps,prevState) {

        if(this.props.reactions){
            this.setState({
                values: this.props.reactions
            });
        }
    }

    componentDidUpdate(prevProps,prevState) {

        console.log(prevProps);
        console.log(prevState);
        if(prevProps.reactions !== this.props.reactions){
            this.setState({
                values: this.props.reactions,
                updatedReactions: this.props.updatedReactions
            });
        }

    }

    render() {

        if (this.props.reactions) {

            const tableData = this.state&&this.state.values&&this.props.reactions.map((reaction,index) => {

                return (
                    <tr data-div_id={reaction.id}
                        key={reaction.id}>

                        <td style={{width: "15%"}} >{reaction.id}</td>
                        <td style={{width: "85%"}} >

                            <InputRange
                                minValue={this.state.values[index].min}
                                maxValue={this.state.values[index].max}
                                value={{
                                    min : this.state.values[index].lower_bound,
                                    max: this.state.values[index].upper_bound
                                }}
                                onChange={this.handleChange(index,reaction.id)} />
                        </td>

                    </tr>)
            });


            return (
                <div style={{borderBottom: "1px solid #adadad"}}>
                    <h3 >Flux Control &nbsp;
                    </h3>
                    <hr/>
                    <div style={{
                        height: '300px',
                        overflowY: 'scroll',
                        overflowX: 'none',
                        borderRight: "1px solid #adadad",
                        borderLeft: "1px solid #adadad"
                    }}>
                        <Table borderless>
                            <thead>
                            <tr >
                                <th style={{width: "15%"}}>Id</th>
                                <th style={{width: "85%"}}>
                                    Flux Control
                                    <Button
                                        color="warning" style={{marginLeft:"50px",padding: "3px 12px 3px 12px"}}>Save the State
                                    </Button>
                                </th>
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
}


export default FluxControl
