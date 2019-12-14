import React from 'react';

class Square extends React.Component {
    eventClick = () => {
        this.props.handleIconLocation(this.props.index)
    }
    render() {
        return(
            <div>
                <div
                    id="square"
                    onClick= {this.eventClick}
                >
                { this.props.value }
                </div>
            </div>
       )
    }
}



export default Square;
