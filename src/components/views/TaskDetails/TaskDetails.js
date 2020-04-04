import React from 'react';
import { taskShape } from '../../../data-types/task';
import DetailsSection from '../../../layouts/DetailsSection';
import JsonViewer from '../../JsonViewer';
import TaskDetailsHeader from './TaskDetailsHeader';

const TaskDetails = ({ task }) => {
  const { payload } = task;

  return (
    <>
      <TaskDetailsHeader task={task} />

      <DetailsSection title="Schedule">
        <JsonViewer json={payload.schedule} />
      </DetailsSection>

      <DetailsSection title="Action">
        <JsonViewer json={payload.action} />
      </DetailsSection>
    </>
  );
};

TaskDetails.propTypes = {
  task: taskShape.isRequired,
};

export default TaskDetails;
