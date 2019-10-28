import React from "react";

class Playeredit extends React.Component {
  constructor(props) {
    super(props);
    var resetplayers = this.props.players.map(player => {
      return { name: player.name, letters: "" };
    });
    this.state = {
      players: [...resetplayers],
      playername: ""
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
  }
  handleDelete(e) {
    if (this.state.players.length == 2) {
      return;
    }
    var updatedplayers = this.state.players.slice();
    updatedplayers.splice(parseInt(e.target.getAttribute("removeindex")), 1);
    this.setState({ players: updatedplayers });
  }
  handleEdit(e) {
    this.props.handleEdit(this.state.players);
  }
  handleNameInput(e){
    this.setState({playername: e.target.value})
  }
  handleNameSubmit(e){
    e.preventDefault();
    this.setState({players: [...this.state.players, {name: this.state.playername, letters: ""}], playername: ""})
  }
  render() {
    return (
      <div>
        <div>Tap to remove...</div>
        {this.state.players.map((player, index) => {
          return (
            <div>
              <input
                className="button"
                type="button"
                value={player.name}
                removeindex={index}
                onClick={this.handleDelete}
              ></input>
            </div>
          );
        })}
        <form onSubmit={this.handleNameSubmit}>
          <label htmlFor="name">
            ...or enter a new player.
          </label>
          <br />
          <input
            className="textfield"
            id="name"
            type="text"
            value={this.state.playername}
            onChange={this.handleNameInput}
            autoFocus
            required
          />
          <br />
          <input className="button" type="submit" value="Add player" />
          <br />
        </form>
        <hr />
        <div>
          <input
            className="button"
            type="button"
            value="Start"
            onClick={this.handleEdit}
          ></input>
          <input
            className="button"
            type="button"
            value="New Game"
            onClick={this.props.handleNew}
          ></input>
        </div>
      </div>
    );
  }
}

export default Playeredit;
