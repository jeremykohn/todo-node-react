// import logo from './logo.svg';
// import './normalize.css';
import './ds-grid.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="col sidebar">
        <h4>Add Todo</h4>
        <form onSubmit="{}">
          <ul>
            <li>
              Description: <input type="text" />
            </li>
            <li>
              Upload attachment: <input type="file" />
            </li>
            <li>
              Deadline: <input type="datetime-local" />
            </li>
            <li>
              <input type="submit" />
            </li>
          </ul>
        </form>
      </div>
      <div className="col todoListItems">
        <h3>Todo List</h3>
        <h4>Active Tasks</h4>
        <ul>
          <li><input type="checkbox" onClick="move to completed items" /> -Description- -Attachment- -Deadline- </li>
          ...one li per todo item...
        </ul>
        <hr />
        <h4>Completed Tasks</h4>
        <ul>
          <li><input type="checkbox" onClick="nothing" /> -Description- -Attachment- -Deadline- </li>
          ...one li per todo item...
        </ul>
        <hr />
        <h4>Dismissed Tasks</h4>
        <ul>
          <li><input type="checkbox" onClick="nothing" /> -Description- -Attachment- -Deadline- </li>
          ...one li per todo item...
        </ul>
        

      </div>
    </div>
  );
}

export default App;
