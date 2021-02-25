
// getting Data From Firebase Database ................//



firebase.database().ref("todos").on("child_added",function(data){
     var main = document.getElementById('main');
    

    var list = document.createElement('div');

    var text = document.createElement('li');

    text.setAttribute("class","list-group-item")

    list.setAttribute('class',"card");

    var textVal = document.createTextNode(data.val().value);

    text.appendChild(textVal);


    ///////////////.......BUTTONS.......////////////////////////////


    var btn = document.createElement("button")  // create delete button

    var btnText = document.createTextNode("Delete")

    btn.setAttribute("onclick","todoDel()")

    btn.setAttribute("class","btn btn-outline-dark")

    btn.setAttribute('id',data.val().key)

    btn.appendChild(btnText)

    text.appendChild(btn);

    var editBtn = document.createElement('button') // create edit button

    var editText = document.createTextNode("Edit")

    editBtn.setAttribute("class","btn btn-outline-info")

    editBtn.setAttribute('id',data.val().key)

    editBtn.setAttribute("onclick","todoEdit()")

    editBtn.appendChild(editText);

    text.appendChild(editBtn)

    // ..........................//////////////.../////////////........//

    list.appendChild(text); //list of To-Do

    main.appendChild(list); //main is the parent of all these elemets which is located in html file (ul)
})


function add(){    // Add ToDo Function 

    var input = document.getElementById('inpValue');
    let firebaseDatabase = firebase.database().ref("todos")
    let key =firebaseDatabase.push().key
    let todo = {
        value : input.value,
        key : key
    }
    if(input.value==""){
        alert('Please enter Something') //if value is empty then stop user from adding it
    }


    else{ //if value is not empty then do this

    firebaseDatabase.child(key).set(todo)    

    input.value=("")
    }
}



function todoDel(){  // Delete ToDo Function..................//
    
    var btnid = event.target.id
    // console.log(btnid); // checking if it's working correctly..
    firebase.database().ref("todos").child(btnid).remove()
    
    var btn = event.target.parentNode
    btn.parentNode.remove()
    
}

function todoEdit(){  // Edit ToDo Function...................//
    let editBtnid = event.target.id
    
    // console.log(editBtnid); // checking id
    
    let editBtn = event.target.parentNode.firstChild.nodeValue = prompt("Edit",event.target.parentNode.firstChild.nodeValue)
    
    let editTodo = {
        value : editBtn,
        key : editBtnid
    }
    
    firebase.database().ref('todos').child(editBtnid).set(editTodo)
    
    
    // console.log(editTodo) // checking wheter it's working or not
}



function delAll(){   // Delete All ToDos Function................//

    firebase.database().ref("todos").remove()  //....... it will remove the main object ToDos.....//

    var del = document.getElementById('main')
    del.innerHTML=""
}



//Complete Todo App with Firebase Database Integration.........//