const addUserBtn = document.getElementById("addUser");
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById("username");
const recordDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');
if (objStr != null) {
    userArray = JSON.parse(objStr);
}


addUserBtn.onclick = () => {
    const name = usernameTextField.value;
    if(edit_id != null){
        //edit
        userArray.splice(edit_id,1,{ 'name': name })
        edit_id = null;
    }else{
        //insert
        userArray.push({ 'name': name });
    }
    
    SaveInfo(userArray);
    usernameTextField.value = "";
    addUserBtn.innerText=btnText;
}

function SaveInfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
    Display();
}

function Display() {
    let statement = '';
    userArray.forEach((user, i) => {
        statement += `
                    <tr>
                    <th scope="row">${i+1}</th>
                    <td>${user.name}</td>
                    <td><i class="btn text-white btn-info fa-edit mx-2" onclick='EditInfo(${i})'></i>
                    <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
                    </tr>`
    });
    recordDisplay.innerHTML=statement;
}

function EditInfo(id) {
    edit_id = id;
    usernameTextField.value = userArray[id].name;
    addUserBtn.innerText = 'Save Change';
}

function DeleteInfo(id) {
    userArray.splice(id,1);
    SaveInfo(userArray);
    Display() ;
}