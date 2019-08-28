import React from "react";

class Nameform extends React.Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.clickOverride = this.clickOverride.bind(this);
  }
  clickOverride(e) {
    this.nameInput.current.focus();
    return this.props.handleClick();
  }
  render() {
    return (
      <div>
        <label htmlFor="name">
          Enter player {this.props.playerDisplay + 1}'s name
        </label>
        <br />
        <input
          className="textfield"
          id="name"
          type="text"
          arrayname="playernames"
          value={this.props.textFieldValue}
          onChange={this.props.handleTextInput}
          autoFocus
          ref={this.nameInput}
        />
        <br />
        <input
          onClick={this.clickOverride}
          className="button"
          type="button"
          value="Submit"
        />
        <br />
      </div>
    );
  }
}

export default Nameform;
