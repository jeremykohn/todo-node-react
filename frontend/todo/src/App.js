import React, {useState, useEffect} from 'react';

// import logo from './logo.svg';
// import './normalize.css';
import './ds-grid.css';
import './App.css';


// Form to add a todo item.
function TodoCreationForm(props) {

  const addTodoItem = props.callback;

  const getFormData = (event) => {

    // Don't submit form.
    event.preventDefault();

    const todoFormData = new FormData(event.target);

//    console.log(todoFormData.get('description'));
    
//    // console.log(todoFormData);
//    // Now get all three fields, and add todo to list.
//    // console.log("Each entry from todo form");
    for (const entry of todoFormData) {
       console.log(entry);
    }

    let todoItemData = {
      description: todoFormData.get('description'),
      attachment: todoFormData.get('attachment'),
      deadline: todoFormData.get('deadline')
    };

    // Three categories of tasks: Active, Completed, and Dismissed.
    // A newly created todo is added to the Active category.
    todoItemData.category = 'active';


//    console.log("Todo item data is")
//    console.log(todoItemData)

//    console.log("About to add todo item data");

    addTodoItem(todoItemData);

    // Clear form fields after todo is created.
    event.target.reset();

  }

  return(
    <form autoComplete="off" onSubmit={getFormData}>
      <ul>
        <li>
          Description: <input name="description" type="text" />
        </li>
        <li>
          Upload attachment: <input name="attachment" type="file" />
        </li>
        <li>
          Deadline: <input name="deadline" type="datetime-local" />
        </li>
        <li>
          <button type="submit">Create Todo</button>
        </li>
      </ul>
    </form>
  )
}


function TodoListItems(props) {

  // Retrieve state and enumerate list items in each category.

  console.log("Props, including current todo list items");
  console.log(props) 

  const markCompleted = (event) => {
    // Move todo item to completed items
    console.log("Mark completed")
    console.log("id is")
    console.log(event.target.attributes.itemID)

    let completedItemId = parseInt(event.target.attributes.itemID.value, 10);

    console.log("Completed item ID")
    console.log(completedItemId.value);
    console.log(parseInt(completedItemId.value, 10));

    
    // Get item with that ID, and change category to 'completed'.
    console.log('props.items');
    console.log(props.items);
    let completedItem = props.items.filter(item => item.id === completedItemId)[0];

    // Change that item's category.
    // Need to update state...
    completedItem.category = 'completed';

    console.log(completedItem);

    // Or, useEffect for change to checkbox?

  }

  // Sort list items by category.
  let activeItems = props.items.filter((item) => item.category === 'active');
  let completedItems = props.items.filter((item) => item.category === 'completed');
  let dismissedItems = props.items.filter((item) => item.category === 'dismissed');

  // useEffect 

  // Convert each category to HTML list items.
  const activeListItems = activeItems.map((activeItem) =>
    <li key={activeItem.id}>
      <input type="checkbox" itemID={activeItem.id} onClick={markCompleted} /> 
      Description: {activeItem.description} [[Also need attachment, deadline]]
    </li>
  );

  const completedListItems = completedItems.map((completedItem) =>
    <li key={completedItem.id}>
      Description: {completedItem.description} [[Also need attachment, deadline]]
    </li>
  );

  const dismissedListItems = dismissedItems.map((dismissedItem) =>
    <li key={dismissedItem.id}>
      Description: {dismissedItem.description} [[Also need attachment, deadline]]
    </li>
  );

  return(
    <>
      <h4>Active Tasks</h4>
      <ul>
        {activeListItems}
      </ul>
      <hr />
      <h4>Completed Tasks</h4>
      <ul>
        {completedListItems}
       </ul>
      <hr />
      <h4>Dismissed Tasks</h4>
      <ul>
        {dismissedListItems}
      </ul>
    </>
  )
}

function App() {

  // Keep track of the list of todos.
  // (Also send state to Node app.)

  const [currentTodoItems, setCurrentTodoItems] = useState([]);

  // Make sure every item has a unique ID.
  const [todoItemId, setTodoItemId] = useState(0);

  // Add a todo item.
  const addTodoItem = (newTodo) => {

    console.log("Before adding, current todo items are")
    console.log(currentTodoItems);

    console.log("Item to be added is")
    console.log(newTodo);

    // Give the new item an ID.
    newTodo.id = todoItemId;

    // And increment the state of the ID, so that each future item will get a different ID.
    setTodoItemId(todoItemId + 1);

//    console.log("Todo item to add to list")
//    console.log(newTodo);

    // Add the new todo item.
    setCurrentTodoItems([...currentTodoItems, newTodo]);
    


    // And/or send POST request to update database in Node app?
    // Or just effect hook for that?
  }

  


  // useEffect hook -- to react when the state of currentTodoItems changes 
  // (when a todo is added or moved to another category, or other changes)

  useEffect(() => {
    // Update todo list
    console.log("useEffect hook, when currentTodoItems is updated")
    console.log(currentTodoItems)
  }, [currentTodoItems] );


  // Later --
  // In final app version,
  // form sends POST request to server with database.
  // And when request returns, app sends GET request to load todo list items
  // and renders todo list items



  return (
    <div className="App">
      <div className="col sidebar">
        <h4>Add Todo</h4>
        <TodoCreationForm callback={addTodoItem}  />
      </div>
      <div className="col todoListItems">
        <h3>Todo List</h3>
        <TodoListItems items={currentTodoItems} />
      </div>
    </div>
  );
}

export default App;
