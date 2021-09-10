import React from "react";
import Section from "./components/Section";
import FeedbackOptions from "./components/FeedbackOptions";
import Statistics from "./components/Statistics";
import Notification from "./components/Notification";
import styles from "./App.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    };
    this.onLeaveFeedback = this.onLeaveFeedback.bind(this);
  }

  onLeaveFeedback(intent) {
    this.setState(
      Object.assign({}, this.state, { [intent]: this.state[intent] + 1 })
    );
  }

  countTotalFeedback() {
    return Object.values(this.state).reduce((x, y) => x + y);
  }

  countPositiveFeedbackPercentage() {
    const totalFeedbackCount = this.countTotalFeedback();
    if (totalFeedbackCount === 0) return 0;
    if (this.state.good === 0) return 0;

    return Math.round((this.state.good / totalFeedbackCount) * 100);
  }

  render() {
    const total = this.countTotalFeedback();

    return (
      <div className={styles.main}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={["good", "neutral", "bad"]}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>

        <Section title="Statistics">
          {total === 0 && <Notification message="No feedback given" />}
          {total > 0 && (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
