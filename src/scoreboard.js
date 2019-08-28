import React from "react";

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.players.map(player => {
          return (
            <div className="score-row" key={"player-" + player.name}>
              {player.name}
              {player.letters.split().map(letter => {
                return (
                  <span
                    className="position-icon"
                    key={player + "-" + player.letter}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
export default Scoreboard;
