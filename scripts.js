import Action from "./classess/Action.js";
import ActionsManager from "./classess/ActionManager.js";

let manager = new ActionsManager();
let food = new Action("expense", "fruits", 200);
manager.addAction(food);
manager.addAction(new Action("income", "salary", 10000));
manager.addAction(new Action("expense", "cake", 250));
console.log(manager.actions);
// manager.deleteAction(food.id);
// console.log(manager.actions);
manager.updateAction(food.id, 350);
manager.calcBalance();
console.log(manager.balance);
//<i class="fa-solid fa-trash-can"></i>
//<i class="fa-regular fa-pen-to-square"></i>
// a function that shows all the actions according to manager.actions array
function showActionsInTable() {
    // JSON.parse(localStorage.getItem(user)) ????????????????????????????????????????????
    document.getElementById("actions").innerHTML = "";
    for (let action of manager.actions) {
    document.getElementById("actions").innerHTML += 
    `<tr class=${action.type == "income" ? "text-success" : "text-danger"}>
        <td>${action.description} </td> <td>${action.amount}</td>
        <td><i class="fa-regular fa-pen-to-square" onclick="updateAction(${action.id})"></i></td>
        <td><i class="fa-regular fa-trash-can" onclick="deleteAction(${action.id})"></i> </td></tr>`;
    }
}
showActionsInTable();

window.addNewAction = () => {
  ////take the form values/////////////////////////////////////////////////
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = +document.getElementById("amount").value;
  ///create action object//////////////////////////////////////////////////
    let newAction = new Action(type, description, amount);
  ///add newAction to manager actions array////////////////////////////////
    manager.addAction(newAction);
    console.log(manager.actions);
    localStorage.setItem("managerActions", JSON.stringify(manager.actions));

    document.getElementById("type").value = "income";
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    showActionsInTable();
};
//////////////////////////////////////////////////////////////////////////////
window.updateAction = (id) => {
  //prompt
    let newAmount = prompt("Enter new value");
    if (newAmount == null || newAmount == "" || newAmount != +newAmount)
    alert("ERROR");
    else {
    manager.updateAction(id, +newAmount);
    localStorage.setItem("managerActions", JSON.stringify(manager.actions));
    showActionsInTable();
    }
};
///////////////////////////////////////////////////////////////////////////////
window.deleteAction = (id) => {
  // confirm
    if (confirm("Are you sure?")) {
    manager.deleteAction(id);
    localStorage.setItem("managerActions", JSON.stringify(manager.actions));
    showActionsInTable();
    }
};
