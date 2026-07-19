interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction = 
| { type: 'ADD_TODO', payload: string}
| { type: 'TOGGLE', payload: number}
| { type: 'DELETE_TODO', payload: number};

export const tasksReducer = (state: TaskState, action: TaskAction):TaskState => {


  return state;
}