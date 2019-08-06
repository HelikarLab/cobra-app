import React from 'react'
import {Table} from 'reactstrap'
import "react-input-range/lib/css/index.css"
import { Switch } from 'antd'

class GeneControl extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      checkedItems: new Map(),
      genes: [],
      updatedGenes: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (params,id) => e => {

    const item = id;
    const isChecked = e;
    this.setState(
      prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked)}),
    );
    const array = this.state.genes;
    array[params].functional = !e;
    this.setState({
      genes: array
    });

    const updated = this.state.updatedGenes;
    let i;
    let flag=0;
    for(i=0;i<updated.length;i++){
      if(id===updated[i].id){
        updated[i].functional = !e;
        flag=1;
      }
    }
    if(flag===0) {
      updated.push({
        "id": id,
        "functional": !e
      });
    }

    this.setState({
      updatedGenes : updated
    });

  };

  componentDidMount(prevProps,prevState) {
    if(this.props.genes){
      this.setState({
        genes: this.props.genes
      });
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.reactions !== this.props.reactions){
      this.setState({
        genes: nextProps.genes,
      });
    }
    this.setState({
      checkedItems: new Map()
    })
  }
  componentDidUpdate(prevProps) {
    if(prevProps.genes !== this.props.genes){
      this.setState({
        genes: this.props.genes,
        updatedGenes: this.props.updatedGenes
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
                <Switch type="switch" id={gene.id} name={gene.id}  checked={this.state.checkedItems.get(gene.id)} onChange={this.handleChange(index,gene.id)}/>
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
            height: '325px',
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
