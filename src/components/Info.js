import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Info extends Component{
    state = {
        current: 0
    };

    next = (index)=>{
        this.setState({current:index});
    }

    render() {
        const visibility = (this.props.visible?'':' hide');
        let   displayEvses = this.props.evses.map((evse,index)=>{            
                return <div key={evse.id} className="eves">{evse.id}</div>;
        })           
        return (
            <div className={"infoPosition".concat(visibility)}>
                <h3 className="infoTitle">{this.props.name}</h3>
                <h6>{this.props.address}</h6>
                <div className="evse-wrapper">
                    {displayEvses}
                </div>               
            </div>   
        )
    }        
}

export default Info;

Info.propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
    evses: PropTypes.array
} 

Info.defaultProps = {
    name: '',
    address: '',
    evses: []
};