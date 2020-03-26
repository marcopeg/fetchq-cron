import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import VisualComposerIcon from '@material-ui/icons/Visibility';
import CodeComposerIcon from '@material-ui/icons/Code';
import JsonEditor from '../JsonEditor';
import ConfigRestRequest from '../ConfigRestRequest';
import Form from '../../layouts/Form';
import FormSection from '../../layouts/FormSection';
import FormControl from './components/FormControl';
import TextField from './components/TextField';

const CreateTaskUI = () => {
  const [currentValue, setCurrentValue] = useState({
    group_name: '',
    task_name: '',
    description: '',
  });

  const [useVisualComposer, setUseVisualComposer] = useState(true);
  const [currentRequestValue, setCurrentRequestValue] = useState({
    type: 'rest',
    method: 'GET',
    url: '',
    headers: {},
    body: {},
  });

  const updateRequestValue = (evt, json) => {
    const update = { type: 'rest', ...json };
    update.type = 'rest';
    setCurrentRequestValue(update);
  };

  const onChangeProp = prop => evt => {
    setCurrentValue({
      ...currentValue,
      [prop]: evt.target.value,
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log('submit');
  };

  const handleCancel = evt => {
    evt.preventDefault();
    console.log('cancel');
  };

  // console.log(currentValue);

  return (
    <Form onSubmit={handleSubmit} onCancel={handleCancel}>
      <FormSection title="General">
        <FormControl fullWidth>
          <TextField
            required
            label="Task Name:"
            value={currentValue.task_name}
            onChange={onChangeProp('task_name')}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            label="Group Name:"
            value={currentValue.group_name}
            onChange={onChangeProp('group_name')}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            multiline
            rows="3"
            label="Description:"
            value={currentValue.description}
            onChange={onChangeProp('description')}
          />
        </FormControl>
      </FormSection>
      <FormSection
        title="Configure Webhook"
        floatingEl={
          useVisualComposer ? (
            <Button onClick={() => setUseVisualComposer(false)}>
              <CodeComposerIcon />
            </Button>
          ) : (
            <Button onClick={() => setUseVisualComposer(true)}>
              <VisualComposerIcon />
            </Button>
          )
        }
      >
        {useVisualComposer ? (
          <ConfigRestRequest
            value={currentRequestValue}
            onChange={updateRequestValue}
          />
        ) : (
          <JsonEditor
            value={currentRequestValue}
            onChange={updateRequestValue}
          />
        )}
      </FormSection>
    </Form>
  );
};

export default CreateTaskUI;
