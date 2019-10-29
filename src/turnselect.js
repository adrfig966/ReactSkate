import React from "react";

class Turnselect extends React.Component {
  constructor(props) {
    super(props);
    this.turnSubmit = this.turnSubmit.bind(this);
  }
  turnSubmit(e){
    if(e.target.getAttribute("turnindex")){
      this.props.handleSubmit(parseInt(e.target.getAttribute("turnindex")));
    }
    else{
      this.props.handleSubmit(Math.floor(Math.random() * this.props.players.length));
    }
  }
  render() {
    return (
      <div>
        <div>Select first player:</div>
        {this.props.players.map((player, index) => {
          return (
            <div>
              <input
                className="button"
                type="button"
                value={player.name}
                turnindex={index}
                onClick={this.turnSubmit}
              ></input>
            </div>
          );
        })}
        <div>
          <input className="button" type="button" value="Random" onClick={this.turnSubmit}></input>
        </div>
      </div>
    );
  }
}

export default Turnselect;
