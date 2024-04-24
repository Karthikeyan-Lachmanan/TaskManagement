import { AllTasks } from './components/TaskFilter';
import { CreateTask } from './components/CreateTask';

function App() {
  return (
    <>
      <div style={{textAlign: "center"}}>
        <h1>Welcome to Vajro Task Management</h1>
      </div>           
      <CreateTask />
      <AllTasks />
    </>    
  );
}

export default App;
