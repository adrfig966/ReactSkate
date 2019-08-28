import React from "react";

class PlayerCountForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <label htmlFor="count">Player count (2-10)</label>
        <input
          className="textfield"
          id="count"
          type="number"
          statename="playercount"
          onChange={this.props.handleNumInput}
          min="2"
          max="10"
          value={this.props.numFieldValue}
          autoFocus
        />
        <input
          onClick={this.props.handleClick}
          className="button"
          type="button"
          value="Submit"
        />
      </div>
    );
  }
}

export default PlayerCountForm;
