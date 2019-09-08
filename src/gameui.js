import React from "react";
import Scoreboard from "./scoreboard";

class GameUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [...this.props.players],
      gamestate: "offensive",
      turn: this.props.turn,
      playerdisplay: 1
    };

    this.landSubmit = this.landSubmit.bind(this);
    this.missSubmit = this.missSubmit.bind(this);
  }
  getDefensiveTurn() {}
  landSubmit() {
    if (this.state.gamestate == "offensive") {
      this.setState({
        gamestate: "defensive",
        playerdisplay:
          this.state.turn + 1 == this.state.players.length
            ? 0
            : this.state.turn + 1
      });
      return;
    }
    if (this.state.gamestate == "defensive") {
      var newdisplay = this.state.playerdisplay + 1;
      if (newdisplay == this.state.players.length) {
        newdisplay = 0;
      }
      if (newdisplay == this.state.turn) {
        this.setState({
          gamestate: "offensive"
        });
        return;
      }
      this.setState({ playerdisplay: newdisplay });
    }
  }
  missSubmit() {
    if (this.state.gamestate == "offensive") {
      this.setState({
        turn:
          this.state.turn + 1 == this.state.players.length
            ? 0
            : this.state.turn + 1
      });
    }
    if (this.state.gamestate == "defensive") {
      var updatedplayers = this.state.players.slice();
      updatedplayers[this.state.playerdisplay].letters = "SKATE".substring(
        0,
        updatedplayers[this.state.playerdisplay].letters.length + 1
      );

      var newdisplay = this.state.playerdisplay + 1;
      if (newdisplay == this.state.players.length) {
        newdisplay = 0;
      }
      if (newdisplay == this.state.turn) {
        this.setState({
          gamestate: "offensive",
          players: updatedplayers
        });
        return;
      }
      this.setState({ playerdisplay: newdisplay, players: updatedplayers });
    }
  }

  componentDidUpdate() {
    //Removes player from game if they have SKATE
    var shiftpoint;
    var updatedplayers = this.state.players.filter((player, i) => {
      if (player.letters == "SKATE") {
        shiftpoint = i;
        return false;
      }
      return true;
    });
    //Reset game
    if (updatedplayers.length == 1) {
      this.props.onWin();
      return;
    }
    //Handles scenario where player is removed from the game
    if (this.state.players.length != updatedplayers.length) {
      var nextdisplay = shiftpoint;
      var nextgamestate = "defensive";

      if (shiftpoint + 1 == this.state.players.length) {
        nextdisplay = 0;
        if (this.state.turn == 0) {
          nextgamestate = "offensive";
        }
      } else if (shiftpoint + 1 == this.state.turn) {
        nextgamestate = "offensive";
      }
      this.setState({
        players: updatedplayers,
        gamestate: nextgamestate,
        playerdisplay: nextdisplay,
        turn:
          this.state.turn > shiftpoint ? this.state.turn - 1 : this.state.turn
      });
    }
  }
  render() {
    var gameinfo =
      "Your trick, " + this.state.players[this.state.turn].name + ".";
    if (this.state.gamestate == "defensive") {
      gameinfo =
        this.state.players[this.state.playerdisplay].name + ", copy the trick.";
    }

    return (
      <div>
        <Scoreboard players={this.state.players} />
        <input
          type="button"
          onClick={this.landSubmit}
          className="button"
          value="Land"
        />
        <input
          type="button"
          onClick={this.missSubmit}
          className="button"
          value="Miss"
        />
        <br />
        {gameinfo}
      </div>
    );
  }
}

export default GameUI;
