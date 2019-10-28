import React from "react";

class Nameform extends React.Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.clickOverride = this.clickOverride.bind(this);
  }
  clickOverride(e) {
    e.preventDefault();
    this.nameInput.current.focus();
    return this.props.handleClick();
  }
  render() {
    return (
      <form onSubmit={this.clickOverride}>
        <label htmlFor="name">
          Enter player {this.props.playerDisplay + 1}'s name
        </label>
        <br />
        <input
          className="textfield"
          id="name"
          type="text"
          value={this.props.textFieldValue}
          onChange={this.props.handleTextInput}
          autoFocus
          ref={this.nameInput}
          required
        />
        <br />
        <input
          className="button"
          type="submit"
          value="Submit"
        />
        <br />
      </form>
    );
  }
}

export default Nameform;
