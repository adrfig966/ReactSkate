import React from "react";
import Scoreboard from "./scoreboard";

class GameUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [...props.players],
      gamehistory: [],
      gamestate: "offensive",
      turn: this.props.turn,
      playerdisplay: this.props.display
    };

    this.landSubmit = this.landSubmit.bind(this);
    this.missSubmit = this.missSubmit.bind(this);
    this.undoSubmit = this.undoSubmit.bind(this);
  }
  getDefensiveTurn() {}
  landSubmit() {    
    var removehistory = JSON.parse(JSON.stringify(this.state))
    delete removehistory["gamehistory"];
    this.setState({gamehistory: [...this.state.gamehistory, removehistory]});

    if (this.state.gamestate == "offensive") {
      this.setState({
        gamestate: "defensive",
        playerdisplay:
          this.state.turn + 1 == this.state.players.length
            ? 0
            : this.state.turn + 1
      });
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
      }else{this.setState({ playerdisplay: newdisplay });}
    }
  }
  missSubmit() {    
    var removehistory = JSON.parse(JSON.stringify(this.state)) //Prevent references - quick solution for deep copy
    delete removehistory["gamehistory"];
    this.setState({gamehistory: [...this.state.gamehistory, removehistory]});

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
      }
      else{this.setState({ playerdisplay: newdisplay, players: updatedplayers });}
    }
  }
  undoSubmit(){
    var movesmade = this.state.gamehistory.length;
    if(movesmade >= 1){
      var newstate = this.state.gamehistory[movesmade-1];
      var newhistory = (movesmade == 1) ? [] : this.state.gamehistory.slice(0, movesmade-1);
      newstate.gamehistory = newhistory;
      this.setState(newstate);
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
    //Reset game if only one player left
    if (updatedplayers.length == 1) {
      this.props.onWin();
      return;
    }
    //Handles scenario where player is removed from the game
    //Reorders players based on shifting point
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
        <Scoreboard players={this.state.players} turn={this.state.turn} display={this.state.playerdisplay} />
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
        <input
          type="button"
          onClick={this.undoSubmit}
          className="button"
          value="Undo"
        />
        <br />
        {gameinfo}
      </div>
    );
  }
}

export default GameUI;
