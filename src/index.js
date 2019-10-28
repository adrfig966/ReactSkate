import React, { Component } from "react";
import ReactDOM from "react-dom";
import Scoreboard from "./scoreboard";
import Playercountform from "./playercountform";
import Nameform from "./nameform";
import Turnselect from "./turnselect";
import Playeredit from "./playeredit";
import GameUI from "./gameui";
import "./styles.css";

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playercount: 2,
      players: [],
      originalplayers: [],
      turn: 0,
      playerdisplay: 0, //Which player we are displaying input for
      gamestate: "enterplayers"
    };
    //Event Handlers
    this.countSubmit = this.countSubmit.bind(this);
    this.nameSubmit = this.nameSubmit.bind(this);
    this.inputToState = this.inputToState.bind(this);
    this.nameInput = this.nameInput.bind(this);
    this.turnSubmit = this.turnSubmit.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.newSubmit = this.newSubmit.bind(this);
    this.gameReset = this.gameReset.bind(this);
  }
  countSubmit(e) {
    e.preventDefault();
    if (this.state.playercount > 10 || this.state.playercount < 2) {
    } else {
      var newplayers = [{ name: "", letters: "" }];
      this.setState({ gamestate: "enternames", players: newplayers });
    }
  }
  nameSubmit() {
    //Don't insert blank player after current player being processed if the current player is the last
    var newplayers =
      this.state.playerdisplay < this.state.playercount - 1
        ? [...this.state.players, { name: "", letters: "" }]
        : [...this.state.players];

    if (this.state.playerdisplay + 1 == this.state.playercount) {
      this.setState({ gamestate: "turnselect", players: newplayers });
    } else {
      this.setState({
        playerdisplay: this.state.playerdisplay + 1,
        players: newplayers
      });
    }
  }
  turnSubmit(e) {
    this.setState({turn: parseInt(e.target.getAttribute("turnindex")), gamestate: "game", originalplayers: this.state.players});
  }
  inputToState(e) {
    var statetarget = e.target.getAttribute("statename");
    this.setState({ [statetarget]: e.target.value });
  }
  nameInput(e) {
    var newplayers = this.state.players;
    newplayers[this.state.playerdisplay].name = e.target.value;
    this.setState({ players: newplayers });
  }
  editSubmit(newplayers){
    this.setState({ gamestate: "turnselect", players: newplayers });
  }
  newSubmit(){
    this.setState({
      playercount: 2,
      players: [],
      originalplayers: [],
      turn: 0,
      playerdisplay: 0,
      gamestate: "enterplayers"
    });
  }
  gameReset() {
    this.setState({
      gamestate: "playeredit"
    });
  }
  render() {
    var ui;
    switch (this.state.gamestate) {
      case "enterplayers":
        ui = (
          <Playercountform
            numFieldValue={this.state.playercount}
            handleClick={this.countSubmit}
            handleNumInput={this.inputToState}
          />
        );
        break;
      case "enternames":
        ui = (
          <Nameform
            textFieldValue={this.state.players[this.state.playerdisplay].name}
            playerDisplay={this.state.playerdisplay}
            handleClick={this.nameSubmit}
            handleTextInput={this.nameInput}
          />
        );
        break;
      case "turnselect":
        ui = <Turnselect handleSubmit={this.turnSubmit} players={this.state.players}/>;
        break;
      case "game":
        ui = (
          <GameUI
            onWin={this.gameReset}
            players={this.state.players}
            turn={this.state.turn}
          />
        );
        break;
      case "playeredit":
        ui = <Playeredit handleEdit={this.editSubmit} handleNew={this.newSubmit} players={this.state.originalplayers}/>
        break;
      default:
    }
    return <div className="gameboard">{ui}</div>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Gameboard />, rootElement);
