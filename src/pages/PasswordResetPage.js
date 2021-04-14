import React from 'react';
import { Container, FormControl, Button, FormLabel } from 'react-bootstrap';
import FormWrapper from '../components/FormWrapper';
import * as api from '../api/Account';
import { Redirect } from 'react-router-dom';
/**
 * @enum {number}
 */
const Progress = Object.freeze({
  ENTER_EMAIL: 1,
  ANSWER_QUESTION: 2,
  RESET_PASSWORD: 3,
  DONE: 4,
});

function EnterEmailForm({ move }={}) {
  async function sendEmail({ email }={}) {
    const res = await api.getQuestions(email);
    move(Progress.ANSWER_QUESTION, { email, ...res });
    return res;
  }

  return (
    <FormWrapper onSubmit={sendEmail}>
      {sending => <>
        <FormControl type="email" placeholder="Email" name="email" required />
        <br></br>
        <Button type="submit" variant="success" disabled={sending}>CONTINUE</Button>
      </>}
    </FormWrapper>
  );
}

function AnswerQuestionsForm({ move, payload }={}) {
  async function answer(data) {
    const res = await api.answerQuestions(data);
    move(Progress.RESET_PASSWORD, res);
    return res;
  }

  return (
    <FormWrapper onSubmit={answer}>
      {sending => <>
        <FormControl type="hidden" name="email" value={payload.email} required />
        <FormLabel>{payload.question1}</FormLabel>
        <FormControl type="text" name="answer1" required />
        <br></br>
        <FormLabel>{payload.question2}</FormLabel>
        <FormControl type="text" name="answer2" required />
        <br></br>
        <Button type="submit" variant="success" disabled={sending}>ANSWER QUESTIONS</Button>
      </>}
    </FormWrapper>
  );
}

function ResetPasswordForm({ move, payload }={}) {
  async function reset(data) {
    if (data.password !== data.passwordCheck) {
      throw new Error('Passwords are different');
    }
    const res = await api.passreset(data);
    move(Progress.DONE, res);
    return res;
  }

  return (
    <FormWrapper onSubmit={reset}>
      {sending => <>
        <FormControl type="hidden" name="token" value={payload} required />
        <FormLabel>New Password</FormLabel>
        <FormControl type="password" name="password" required />
        <FormLabel>Verify Password</FormLabel>
        <FormControl type="password" name="passwordCheck" required />
        <Button type="submit" variant="success" disabled={sending}>RESET PASSWORD</Button>
      </>}
    </FormWrapper>
  );
}

class PasswordResetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: Progress.ENTER_EMAIL,
      payload: {}
    };
    this.move = this.move.bind(this);
    this.getForm = this.getForm.bind(this);
  }

  move(progress, payload) {
    this.setState({ progress, payload });
  }

  getForm() {
    const { progress, payload } = this.state;
    if (progress === Progress.ENTER_EMAIL) {
      return <EnterEmailForm move={this.move} payload={payload} />
    } else if (progress === Progress.ANSWER_QUESTION) {
      return <AnswerQuestionsForm move={this.move} payload={payload} />
    } else if (progress === Progress.RESET_PASSWORD) {
      return <ResetPasswordForm move={this.move} payload={payload} />
    } else {
      return <Redirect to="/login" />
    }
  }

  render() {
    return (
      <Container className="w-50 pt-5">
        {this.getForm()}
      </Container>
    );
  }
}

export default PasswordResetPage;
