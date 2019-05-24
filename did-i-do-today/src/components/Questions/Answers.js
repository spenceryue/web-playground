import React, { Component } from 'react';
import Week from  '../Calendar/Week'
import BinaryQuestion from  '../BinaryQuestion'

import { withFirebase } from  '../Firebase'

class Questions extends Component {
  constructor (props) {
    super(props);
    this.state = {
      questions: { questions: [] }
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.props.firebase.doGetQuestions('gtang.gt', this.setQuestions);

  }

  setQuestions(questions) {
    this.setState({
      questions
    });
  }

  renderTitle() {
    if (typeof(this.state.questions.userId) === 'undefined') {
      return <h1>questions</h1>;
    }
    return <h1>{this.state.questions.userId + '\'s '}questions</h1>;
  }

  renderQuestions() {
    let ret = [];

    this.state.questions.questions.forEach((question, i) => {
      ret.push(
        <div key={question.value + (3 * i + 0)}>
          {question.value}
        </div>
      );
      ret.push(
        <br key={question.value + (3 * i + 1)} />
      );
      ret.push(
        <Week key={question.value + (3 * i + 2)} trailing={true} />
      );

      ret.push(
        <BinaryQuestion text={question.value}/>
      )
    });

    return ret;
  }

  render() {
    console.log(this.state.questions);
    return (
      <div>
        {this.renderTitle()}
        <br/>
        {this.renderQuestions()}
      </div>
    );
  }
}

export default withFirebase(Questions);
