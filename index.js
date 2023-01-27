const content = document.querySelector("#content");
const btnsave = document.querySelector("#btnsave");
const btnupdate = document.querySelector("#btnupdate");

window.addEventListener('load', ()=>{
    getMembers();
});


btnsave.addEventListener('click', ()=>{

    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let gender = document.querySelector("#gender").value;

    let formData = { fname, lname, email, gender };

    fetch('http://localhost:5000/api/members',{
        method : 'POST',
        body   : JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

});

btnupdate.addEventListener('click', ()=> {
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let gender = document.querySelector("#gender").value;
    let id = document.querySelector("#userid").value;

    let formData = { fname, lname, email, gender, id };

    fetch('http://localhost:5000/api/members',{
        method : 'PUT',
        body   : JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
});

function getMembers(){

    let html ="";

    fetch('http://localhost:5000/api/members')
    .then(res =>{
        console.log(res);
        return res.json();
    })
    .then(data =>{
        console.log(data);
        
        data.forEach(element => {
            html += `<li class="li-cont">${element.first_name} ${element.last_name}  <a href="javascript:void(0)" class="slink link-update" onClick="updateMember(${element.id})">Edit</a> <a href="javascript:void(0)" class="slink link-delete" onClick="deleteMember(${element.id})">Delete</a></li>`;
        });

        content.innerHTML = html;
    })
    .catch(error =>{
        console.log(error);
    })
}


function deleteMember(id){
    let formData = { id };

    fetch('http://localhost:5000/api/members',{
        method : 'DELETE',
        body   : JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(error => console.log(error));
}


function updateMember(id){
    fetch(`http://localhost:5000/api/members/${id}`)
    .then(res => res.json())
    .then( (data) =>{
        document.querySelector("#fname").value = data[0].first_name;
        document.querySelector("#lname").value = data[0].last_name;
        document.querySelector("#email").value = data[0].email;
        document.querySelector("#gender").value = data[0].gender;
        document.querySelector("#userid").value = data[0].id;
    });
}