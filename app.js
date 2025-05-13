
// database connecting 



// Your web app's Firebase configuration

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCBy6dDElMHsf2-hN0BNDrvlyTOHu-RaCM",
  authDomain: "todo-app-db-81efb.firebaseapp.com",
  databaseURL: "https://todo-app-db-81efb-default-rtdb.firebaseio.com",
  projectId: "todo-app-db-81efb",
  storageBucket: "todo-app-db-81efb.appspot.com",
  messagingSenderId: "436128994087",
  appId: "1:436128994087:web:f18d6ee6c49b185d5e8f02"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Listen to database
firebase.database().ref("todos").on("child_added", function (data) {
  var todoData = data.val();

  var liElement = document.createElement("li");
  liElement.setAttribute("data-id", todoData.id); // optional: helps track items

  var textNode = document.createTextNode(todoData.todo_value);
  liElement.appendChild(textNode);

  // Delete Button
  var delBtn = document.createElement("button");
  delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  delBtn.className = "deletebtn";
  delBtn.id = todoData.id;
  delBtn.onclick = function () {
    deleteSingleTodo(this);
  };

  // Edit Button
  var editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editBtn.className = "Editbtn";
  editBtn.id = todoData.id;
  editBtn.onclick = function () {
    editSingleTodo(this);
  };

  liElement.appendChild(delBtn);
  liElement.appendChild(editBtn);

  document.getElementById("itemlist").appendChild(liElement);
});

// Add new todo
function addtodo() {
  var todoInput = document.getElementById("todo");
  var value = todoInput.value.trim();
  if (!value) {
    alert("Input field is required.");
    return;
  }

  var id = firebase.database().ref("todos").push().key;
  var obj = {
    todo_value: value,
    id: id
  };

  firebase.database().ref("todos/" + id).set(obj);
  todoInput.value = "";
}

// Delete all
function deleteallTodo() {
  document.getElementById("itemlist").innerHTML = "";
  firebase.database().ref("todos").remove();
}

// Delete single
function deleteSingleTodo(btn) {
  btn.parentNode.remove();
  firebase.database().ref("todos/" + btn.id).remove();
}

// Edit single
function editSingleTodo(btn) {
  const updatedValue = prompt("Enter updated value:");
  if (updatedValue && updatedValue.trim() !== "") {
    btn.parentNode.firstChild.nodeValue = updatedValue;

    const obj = {
      todo_value: updatedValue,
      id: btn.id
    };
    firebase.database().ref("todos/" + btn.id).set(obj);
  }
}

