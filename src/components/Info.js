import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Info extends Component{
    state = {
        stationId: '',
        station: {},
        current: 0, 
    };

    componentDidUpdate(prevState){
        if(this.props.stationId !== prevState.stationId){
            axios.get(`https://api.virta.fi/v4/stations/${this.props.stationId}`)
            .then((response)=> {
                // handle success
                this.setState({
                    stationId:response.data.id,
                    station:response.data,
                    current:0
                })
            })
            .catch(function (error) {
                // handle error
                console.log('request to fetch individual station\'s info failed',error);
            })
        }       
    }

    next = (index)=>{
        console.log(index)
        this.setState({current:index});
    }

    render() {
        const visibility = (this.props.visible?'':' hide');
        if(Object.keys(this.state.station).length ){
            let displayEvses = this.state.station.evses.map((evse,index)=>{            
                return <div  key={evse.id} className="eves"><button onClick={e=>this.next(index)}>ID: {evse.id}</button></div>;
            });     
                
            return (            
                <div className={"infoWindow ".concat(visibility)}>
                    <div className="infoTitle">{this.state.station.name}</div>
                    <div>{this.state.station.address}</div>
                    <div className="evse-wrapper">
                        {displayEvses}
                    </div> 
                    {/* below we assume at least there is one evse per station. so every time we fetch new station we set state.current to 0 and 
                        evses[0] will never be error so no need to check. and we check only the first connector proerty such as maxkwh to simplify it as
                        there is only one connector usually */}
                    <div>  
                    <div>EVSE ID - {this.state.station.evses[this.state.current].id}</div>
                    <div>Maximum power: {this.state.station.evses[this.state.current].connectors[0].maxKwh + ' KW'}</div> 
                    <div>Current type : {this.state.station.evses[this.state.current].connectors[0].currentType} </div>
                    <div>EUR {this.state.station.evses[this.state.current].pricing[0].priceCents}/ kwh ja EUR {this.state.station.evses[this.state.current].pricing[1].priceCents}/h</div>
                    </div>          
                </div>           
            )
        } else{  // if users didnt yet selected a place on the map and no data is passed as props... 
            return (<div className={"infoWindow ".concat(visibility)}>
                        <h3>Loading station info ... </h3>
                    </div>
            )
        }
    }        
}

export default Info;

Info.propTypes = {
    stationId: PropTypes.number,    
} 

Info.defaultProps = {
    stationId: -1,    
};