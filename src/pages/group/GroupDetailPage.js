import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as api from '../../api/Group';
import GroupCard from '../../components/GroupCard';
import Toast from '../../helpers/Toast';
import SortTable from '../../components/SortTable';
import Loading from '../../components/Loading';
import _get from 'lodash.get';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';


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
    const group = this.state.group;
    if (!group) {
      return <Loading />
    }

    return (
      <Container>
        <GroupCard group={group} />
        <SortTable data={_get(group, 'members', [])}>
          <SortTable.Col heading="ID" sort="_id">
            {m => <small>{m._id}</small>}
          </SortTable.Col>
          <SortTable.Col heading="Name" sort="lastName">
            {m => <span>{m.firstName} {m.lastName}</span>}
          </SortTable.Col>
        </SortTable>
          {/* <SortTable.Col heading="ID" sort="_id">
            {m => <small>{}</small>}
          </SortTable.Col> */}
      </Container>
    );
  }
}

export default function GroupDetailPage() {
  // Workaround for using params in stateful component
  const { id } = useParams();
  return (
    <EnsureLoggedIn>
      <$GroupDetailPage id={id} />
    </EnsureLoggedIn>
  );
}
