// src/components/QuizComponent.js
import React, { Component } from "react";
import "../styles/Quiz.css";
import questionsData from "../resources/questions.json";

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      selectedOption: null,
      userAnswers: Array(questionsData.length).fill(null),
      questions: questionsData,
    };
  }

  handleQuit = () => {
    const quitConfirmed = window.confirm("Are you sure you want to quit?");
    if (quitConfirmed) {
      this.props.onQuitClick();
    }
  };

  handleOptionClick = (index) => {
    this.setState({ selectedOption: index });
  };

  handlePrevious = () => {
    this.setState((prevState) => ({
      currentQuestionIndex: Math.max(0, prevState.currentQuestionIndex - 1),
      selectedOption: null,
    }));
  };

  handleNext = () => {
    const { currentQuestionIndex, selectedOption, userAnswers, questions } = this.state;

    // Save the user's answer
    userAnswers[currentQuestionIndex] = selectedOption;

    if (currentQuestionIndex < questions.length - 1) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        selectedOption: null,
        userAnswers: [...userAnswers],
      }));
    } else {
      // Quiz is completed, handle completion logic
      this.props.onQuizComplete(userAnswers);
    }
  };

  render() {
    const { currentQuestionIndex, questions } = this.state;
    const currentQuestionData = questions[currentQuestionIndex];

    return (
      <div className="flex">
        <div className="quiz-container">
          <h2>Question</h2>
          <h4>{`${currentQuestionIndex + 1} of ${questions.length}`}</h4>
          <p className="question">{currentQuestionData.question}</p>
          <div className="options-container">
            {currentQuestionData.options.map((option, index) => (
              <div
                key={index}
                className={`option-div flex ${
                  index === this.state.selectedOption ? "selected" : ""
                }`}
                onClick={() => this.handleOptionClick(index)}
              >
                {option}
              </div>
            ))}
          </div>

          <div className="button-container">
            <button className="previous-btn" onClick={this.handlePrevious}>
              Previous
            </button>
            <button className="next-btn" onClick={this.handleNext}>
              Next
            </button>
            <button className="quit-btn" onClick={this.handleQuit}>
              Quit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizComponent;
