import React from 'react'
import { CustomInput, Table} from 'reactstrap'
import "react-input-range/lib/css/index.css"
import InputRange from 'react-input-range'
import { Switch } from 'antd'

class FluxControl extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            checkedItems: new Map(),
            reactions : null,
            updatedReactions: null,
            knockedOutReactions: [],
        };
        this.handleChangeReactions = this.handleChangeReactions.bind(this);
        this.handleChangeKnockOut= this.handleChangeKnockOut.bind(this);
    }

    handleChangeKnockOut = (params,id) => e => {

        const knockedOut = this.state.knockedOutReactions;
        let k;
        let flagk=0;
        for(k=0;k<knockedOut.length;k++){
            if(id===knockedOut[k].id){
                knockedOut.splice(k,1);
                k--;
                flagk=1;
            }
        }
        if(flagk===0){
            knockedOut.push({
                "id": id
            })
        }

        const item = id;
        const isChecked = e;
        this.setState(
          prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked)}),
        );
        const array = this.state.reactions;
        array[params].functional = !e;
        this.setState({
            reactions: array
        });

        const updated = this.state.updatedReactions;
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
            updatedReactions : updated,
            knockedOutReactions: knockedOut
        });

    };


    handleChangeReactions = (param,id) => event =>{

        const array = this.state.reactions;
        array[param].lower_bound = event.min;
        array[param].upper_bound = event.max;
        this.setState({
            reactions: array
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
                reactions: this.props.reactions
            });
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.reactions !== this.props.reactions){
            this.setState({
                reactions: nextProps.reactions
            });
        }
        this.setState({
            checkedItems: new Map()
        })
    }
    componentDidUpdate(prevProps,prevState) {
        if(prevProps.reactions !== this.props.reactions){
            this.setState({
                reactions: this.props.reactions,
                updatedReactions: this.props.updatedReactions,
                knockedOutReactions: this.props.knockedOutReactions
            });
        }

    }

    render() {
        if (this.state.reactions && this.props.reactions) {
            const tableData = this.props.reactions.map((reaction,index) => {
                return (
                  <tr data-div_id={reaction.id}
                      key={reaction.id}>
                      <td >{reaction.id}</td>
                      <td >
                          <InputRange
                            minValue={this.state.reactions[index].min}
                            maxValue={this.state.reactions[index].max}
                            value={{
                                min : this.state.reactions[index].lower_bound,
                                max: this.state.reactions[index].upper_bound
                            }}
                            onChange={this.handleChangeReactions(index,reaction.id)} />
                      </td>
                      {
                          this.props.knockOff ?
                            <td style={{padding: "5px"}}>
                                <label key={reaction.id} style={{float: "right"}}>
                                    <Switch id={reaction.id} name={reaction.id} size="small" checked={this.state.checkedItems.get(reaction.id)} onChange={this.handleChangeKnockOut(index,reaction.id)}/>
                                </label>
                            </td>           :
                            null
                      }
                  </tr>)
            });


            return (
              <div style={{borderBottom: "1px solid #adadad"}}>
                  <h3 >Flux Control &nbsp;
                  </h3>
                  <hr/>
                  <div style={{
                      height: this.props.height,
                      overflowY: 'scroll',
                      overflowX: 'none',
                      borderRight: "1px solid #adadad",
                      borderLeft: "1px solid #adadad"
                  }}>
                      <Table borderless>
                          <thead>
                          <tr >
                              <th >Id</th>
                              <th >
                                  Flux Control
                              </th>
                              {
                                  this.props.knockOff?
                                    <th>
                                        KnockOut?
                                    </th>           :
                                    null
                              }
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
