import React from "react";

class Turnselect extends React.Component {
  constructor(props) {
    super(props);
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
                onClick={this.props.handleSubmit}
              ></input>
            </div>
          );
        })}
        <div>
          <input className="button" type="button" value="Random"></input>
        </div>
      </div>
    );
  }
}

export default Turnselect;
