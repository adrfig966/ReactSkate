import React from "react";

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.players.map((player, index) => {
          var activeclass = "";
          if(index == this.props.turn){activeclass = "offensive"}
          return (
            <div className={`score-row ${activeclass}`} key={"player-" + player.name}>
              {player.name}<br/>
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
