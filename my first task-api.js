let input = document.getElementById("btn");
let list = document.getElementById("box1");
let n = document.querySelector("#name");
let namesarr;
let todoList = namesarr;

let delClicked = 0;

readTodo();
function readTodo() {
  fetch("https://63aaa3b8fdc006ba6047ae79.mockapi.io/todos")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      namesarr = data.map(
        (
          el
        ) => `<div  class="task" style="display:flex; justify-content: space-between;" id="${el.id}" >
           <p id="input">${el.name}</P>
        <button class="editBtn" id="editBtn-${el.id}" onclick="editCallBack(${el.id})" style="margin-left:auto;"><i class="fa fa-check" style="pointer-events: none;color: green; aria-hidden=true"></i></button>
        <button class="delBtn" id="delBtn-${el.id}" onclick="delCallBack(${el.id})"><i class="fa fa-times" style="color: rgb(210, 36, 36); pointer-events: none;" aria-hidden="true"></i></button>
           </div>`
      );

      document.querySelector("#box1").innerHTML = namesarr.join("");
    })
    .catch((err) => console.log("fetch error", err));
}

input.addEventListener("click", (e) => {
  e.preventDefault();

  if (n.value === " ") return;
  const newTodo = { id: Date.now(), name: n.value };
  n.value = "";
  readTodo();
  console.log(newTodo);

  fetch("https://63aaa3b8fdc006ba6047ae79.mockapi.io/todos", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json(response))
    .then((response) => readTodo());
});

function delCallBack(id) {
  console.log("i am deleting");
  fetch(`https://63aaa3b8fdc006ba6047ae79.mockapi.io/todos/${id}`, {
    method: "DELETE",
  }).then(() => readTodo());
}

// let resultArray = data;
//     .map(
//       (
//         todo
//       ) => `<div  class="task" style="display:flex; justify-content: space-between;" id="${todo.id}" >
//     <p id="input">${todo.name}</P>
//  <button class="editBtn" id="editBtn-${todo.id}" style="margin-left:auto;"><i class="fa fa-check" style="pointer-events: none;color: green; "aria-hidden="true"></i></button>
//  <button class="delBtn" id="delBtn-${todo.id}"><i class="fa fa-times" style="color: rgb(210, 36, 36); pointer-events: none;" aria-hidden="true"></i></button>
//     </div>`
//     )
//     .join("");
// list.innerHTML = resultArray;
// const delBtns = document.querySelectorAll(".delBtn");
// const editBtns = document.querySelectorAll(".editBtn");
// delBtns.forEach((delBtn) => delBtn.removeEventListener("click", delCallBack));
// delBtns.forEach((delBtn) => delBtn.addEventListener("click", delCallBack));
// editBtns.forEach((editBtn) =>
//   editBtn.removeEventListener("click", editCallBack())
// );
// editBtns.forEach((editBtn) => editBtn.addEventListener("click", editCallBack));

// let todoList = namesarr;

function editCallBack(id) {
  // const updateTodoId = event.target.id.split("-")[1];
  console.log("i am updating");
  // let singleTodoEl = todoList.find((todo) => todo.id === +updateTodoId);

  const updatePopup = document.querySelector(".updatePopup");
  updatePopup.classList.add("active");
  // let input1;
  // fetch(`https://63aaa3b8fdc006ba6047ae79.mockapi.io/todos/${id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // })
  //   .then((res) => res.json(res))
  //   .then((res) => (input1 = this.document.querySelector("#input")));
  // let input2 = document.getElementById("name2");
  // input2.value = input1;
  // console.log(input1);
  // console.log(input2);

  const updatePopupOverlay = document.querySelector(".updatePopup .overlay");
  const updatePopupName = document.querySelector(".updatePopup input");
  // updatePopupName.value = singleTodoEl.name;
  updatePopupOverlay.addEventListener("click", () =>
    updatePopup.classList.remove("active")
  );

  document.querySelector("#updateForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let input = document.getElementById("name2").value;
    console.log(input);
    let newTodo = { name: input };
    // n.value = "";
    // readTodo();
    console.log(newTodo);

    fetch(`https://63aaa3b8fdc006ba6047ae79.mockapi.io/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json(response))
      .then((response) => updatePopup.classList.remove("active"))
      .then((response) => readTodo());
  });

  // const index = todoList.findIndex((todo) => todo.id === +updateTodoId);
  // todoList.splice(index, 1, updatedTodoElement);
  // localStorage.setItem("todoList", JSON.stringify(todoList));
}

// function del() {
//   let v = document.getElementById("box1");
//   localStorage.clear();
//   readTodo();
// }
