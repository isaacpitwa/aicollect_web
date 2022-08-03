import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TaskContext = createContext({
  taskType: '',
  handleChangeTaskType: () => {},
});

export const TaskProvider = (props) => {
  const { children } = props;
  const [taskType, setTaskType] = useState('Registration');

  const handleChangeTaskType = (newTaskType) => {
    setTaskType(newTaskType);
  } 

  return (
    <TaskContext.Provider value={{ taskType, handleChangeTaskType: handleChangeTaskType }}>
      {children}
    </TaskContext.Provider>
  )
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const TaskConsumer = TaskContext.Consumer;
