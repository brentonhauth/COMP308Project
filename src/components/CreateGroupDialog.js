import { Modal, FormControl, Button } from 'react-bootstrap';
import FormWrapper from './FormWrapper';
import * as api from '../api/Group';

export default function CreateGroupDialog(props) {
  function createGroup(data) {
    return api.createGroup(data).then(created => {
      props.onClose(true);
    });
  }

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="createGroupDialogTitle"
      onHide={() => props.onClose(false)}
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="createGroupDialogTitle">
          Create Group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormWrapper onSubmit={createGroup}>
          {sending => <>
            <FormControl name="name" placeholder="Group Name" required />
            <Button variant="success" type="submit" disabled={sending}>CREATE</Button>
          </>}
        </FormWrapper>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={() => props.onClose(false)}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

