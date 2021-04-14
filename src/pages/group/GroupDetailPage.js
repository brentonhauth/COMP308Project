import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as api from '../../api/Group';
import Toast from '../../helpers/Toast';


class $GroupDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { group: null };
    this.tryGettingGroup = this.tryGettingGroup.bind(this);
  }

  componentDidMount() {
    this.tryGettingGroup();
  }

  tryGettingGroup() {
    const id = this.props.id;
    api.getGroup(id).then(group => {
      this.setState({ group });
    }).catch(Toast.error);
  }

  render() {
    if (!this.state.group) {
      return null;
    }

    return (
      <Container>
        {JSON.stringify(this.state.group)}
      </Container>
    );
  }
}

function GroupDetailPage() {
  // Workaround for using params in stateful component
  const { id } = useParams();
  return <$GroupDetailPage id={id} />
}

export default GroupDetailPage;
