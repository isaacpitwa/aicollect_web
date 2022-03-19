import { useContext } from 'react';
import { TaskContext } from '../contexts/task-creation-context';

export const useTask = () => useContext(TaskContext);
