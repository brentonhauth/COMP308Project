import React from 'react';
import { Container } from 'react-bootstrap';
import * as api from '../../api/Workouts';
import Toast from '../../helpers/Toast';
import _get from 'lodash.get';
import YouTubeVideo from '../../components/YouTubeVideo';


class WorkoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { workouts: [] };
  }

  componentDidMount() {
    api.RecommendedWorkouts().then(workouts => {
      this.setState({
        workouts: workouts || []
      });
    }).catch(Toast.error);
  }

  render() {
    return (
      <Container>
        <h3>Workouts ({_get(this.state, 'workouts.length', 0)})</h3>
        {this.state.workouts.map((w, i) => (
          <div key={i}>
            {w.workoutName}
            <YouTubeVideo hyperlink={w.videoHyperlink} />
            <hr></hr>
          </div>
        ))}
      </Container>
    );
  }
}


export default WorkoutPage;

