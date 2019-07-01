import React from 'react'
import {Button, Table} from 'reactstrap'
import "react-input-range/lib/css/index.css"
import {  CustomInput} from 'reactstrap';

class GeneControl extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            checkedItems: new Map(),
            genes: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = params => e => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(
            prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked)}),
            );
        const array = this.state.genes;
        array[params].functional = false;
        this.setState({
            genes: array
        });
    };

    componentDidMount(prevProps,prevState) {

        if(this.props.genes){
            this.setState({
                genes: this.props.genes
            });
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.genes !== this.props.genes){
            this.setState({
                genes: this.props.genes
            })
        }
    }

    render() {

        if (this.props.genes) {
            const tableData = this.state && this.state.genes && this.props.genes.map((gene,index) => {
                return (
                    <tr data-div_id={gene.id}
                        key={gene.id}>

                        <td style={{width: "50%"}} >{gene.id}</td>
                        <td style={{width: "50%"}}>

                            <label key={gene.id}>
                                <CustomInput type="switch" id={gene.id} name={gene.id}  checked={this.state.checkedItems.get(gene.id)} onChange={this.handleChange(index)}/>
                            </label>

                        </td>

                    </tr>)
            });
            return (
                <div style={{borderBottom: "1px solid #adadad"}}>
                    <h3 >Gene Control &nbsp;
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
                            <tr>
                                <th style={{width: "15%"}}>Id</th>
                                <th style={{width: "85%"}}>
                                    Gene Knocked Off
                                    <Button
                                        color="warning" style={{marginLeft:"20px",padding: "3px 12px 3px 12px"}}>Save the State
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


export default GeneControl
