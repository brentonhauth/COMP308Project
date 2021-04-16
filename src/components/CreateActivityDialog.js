import { Modal, FormControl, Button } from 'react-bootstrap';
import FormWrapper from './FormWrapper';
import * as api from '../api/Group';

export default function CreateActivityDialog(props) {
  function createActivity(data) {
    return api.createGroupActivity(props.groupId, data).then(created => {
      props.onClose(true);
    });
  }

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="createActivityDialogTitle"
      onHide={() => props.onClose(false)}
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="createActivityDialogTitle">
          Create Activity
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormWrapper onSubmit={createActivity}>
          {sending => <>
            <FormControl name="title" placeholder="Title" required />
            <FormControl name="hyperlink" placeholder="Hyperlink (Optional)" />
            <FormControl name="description" placeholder="description" required />
            <Button variant="success" type="submit" disabled={sending}>CREATE</Button>
          </>}
        </FormWrapper>
      </Modal.Body>
    </Modal>
  );
}

