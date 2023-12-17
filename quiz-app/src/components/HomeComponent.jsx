// src/components/HomeComponent.js
import React, { Component } from "react";
import "../styles/Home.css";

class HomeComponent extends Component {
  render() {
    const { onPlayClick } = this.props;

    return (
      <div className="flex home-container">
        <div>
          <h1>Quiz App</h1>
          <button onClick={onPlayClick} className="play-button">
            Play
          </button>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
