import React, { Component } from "react";
import ReactDOM from "react-dom";
import Scoreboard from "./scoreboard";
import Playercountform from "./playercountform";
import Nameform from "./nameform";
import GameUI from "./gameui";
import "./styles.css";

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playercount: 2,
      players: [],
      turn: 0,
      playerdisplay: 0, //Which player we are displaying input for
      gamestate: "enterplayers"
    };
    //Event Handlers
    this.countSubmit = this.countSubmit.bind(this);
    this.nameSubmit = this.nameSubmit.bind(this);
    this.inputToState = this.inputToState.bind(this);
    this.nameInput = this.nameInput.bind(this);
    this.gameReset = this.gameReset.bind(this);
  }
  countSubmit() {
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
      this.setState({ gamestate: "game", players: newplayers });
    } else {
      this.setState({
        playerdisplay: this.state.playerdisplay + 1,
        players: newplayers
      });
    }
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
  gameReset() {
    this.setState({
      playercount: 2,
      players: [],
      turn: 0,
      playerdisplay: 0,
      gamestate: "enterplayers"
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
      case "game":
        ui = (
          <GameUI
            onWin={this.gameReset}
            players={this.state.players}
            turn={this.state.turn}
          />
        );
        break;

      default:
    }
    return <div className="gameboard">{ui}</div>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Gameboard />, rootElement);
