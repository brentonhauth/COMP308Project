import React from 'react';

import { Container, Card, Button } from "react-bootstrap";
import _get from 'lodash.get';

// class GroupCard extends React.Component {
//   constructor(props) {
//     super(props);
//   }
// }


export default function GroupCard({ group }={}) {
  group = group || {};
  const coach = group.coach;

  return (
    <Card className="mx-auto w-75">
      <Card.Header className="d-flex justify-content-between">
        <span className="h3">[{group._id}] {group.name}</span>
        <Button
          variant="danger"
          className="h-50 mr-0"
          size="sm"
          disabled={false/*todo: disable if is coach */}
          style={{width:'10%'}}
        >Leave</Button>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Coach:{'\x20'}
          {typeof coach === 'string' ? coach : (
            <span>
              {coach.firstName} {coach.lastName}
            </span>
          )}
          <br></br>
          Members: <span className="text-success">{_get(group, 'members.length', 0)}</span>
          <br></br>
          Activities: <span className="text-success">{_get(group, 'activities.length', 0)}</span>
          <br></br>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
