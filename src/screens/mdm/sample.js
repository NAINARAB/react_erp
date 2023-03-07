function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

let activeItem = null

// <div class="text-start">
    //     <i class="fa-solid fa-backward fa-lg mt-5 ms-5 p-3 bg-light" id="back"></i>
    // </div>

let form = `
    <div class="text-start">
            <i class="fa-solid fa-backward fa-lg mt-5 ms-5 p-3 bg-light" id="back"></i>
    </div>
    <div class="text-end">
        <button type="button" class="btn btn-primary mt-5 btn-lg me-5" id="button">ADD BRANCH</button>
    </div>
    <div class='container mt-5 wave'> 
        <button class="close">X</button>
        <form id="branch-form" class='text-center show mb-5' method="post">
            

            <div id="val">
            </div>
            
            <input type="submit" value="submit" id="sum"  class="down">
           

           
   
    
        </form>
       
    </div>
    <div id="crr">
        
        
        <button class="up ms-5 mt-5 rounded" id="day">UPDATE</button>
    </div>
    </div>
    <div class="container" id="del" mt-5>
        <div class="table-responsive mt-5">
            <table class="table">
              <thead class="table-dark">
               <tr>
                    <th class='border border-4'>ID</th>
                    <th class='border border-4'>BRANCH_ID</th>
                    <th class='border border-4'>BRANCH_NAME</th>
                    <th class='border border-4'>CITY_NAME</th>
                    <th class='border border-4'>STATE</th>
                    <th class='border border-4'>PINCODE</th>
                    <th class='border border-4'>GST_NUMBER</th>
                    <th class='border border-4'>BRANCH_CODE</th>
                    <th class='border border-4'>UPDATE</th>
                    <th class='border border-4'>DELETE</th>
               </tr>
             <thead>
             <tbody id="table_body">
             </tbody>
            </table>
        </div>
      
     
    </div>

    
`

document.getElementById("list-wrapper").innerHTML += form;



import {  myObject } from './form.js';



let container = document.getElementById("val");

for (let key of Object.keys(myObject)) {
        
            const input = document.createElement("input");
            const br = document.createElement("br");
            input.type = myObject[key].type;
            input.id = myObject[key].id;
            input.classList.add("form-control");
            input.name = myObject[key].name;
            input.placeholder = myObject[key].placeholder;
            container.appendChild(input);
            container.appendChild(br);
            
}







document.getElementById('button').addEventListener("click",function(){
    document.querySelector(".wave").style.display = "flex";
    document.querySelector(".up").style.display = "none";
    document.querySelector("#sum").style.display = "flex";
})

document.querySelector('.close').addEventListener("click",function(){
    document.querySelector(".wave").style.display = "none";
    document.querySelector(".up").style.display = "none";
    document.getElementById('branch-form').reset()
    //
})

const baseEndpoint3 = "http://127.0.0.1:8000/branch/"




const BranchForm = document.getElementById('branch-form')




function work(){
     const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken,
        },
        
    }

        fetch(baseEndpoint3,options)
        .then((data)=>{
            return data.json();
        }).then((objectdata)=>{
                // console.log(objectdata[0].branch_id);
                let tabledata = "";

         objectdata.map((values)=>{
            tabledata += `
                <tr>
                    <td>${values.pk}</td>
                    <td>${values.branch_id}</td>
                    <td>${values.branch_name}</td>
                    <td>${values.city_name}</td>
                    <td>${values.state}</td>
                    <td>${values.pincode}</td>
                    <td>${values.Gst_number}</td>
                    <td>${values.branch_code}</td>
                    <td><button class="editbtn" id="uptbtn">Update</button></td>
                    <td><button class="delbtn">Delete</button></td>
                </tr>`; 
       
        });
       
        document.getElementById('table_body').innerHTML= tabledata;
        console.log(tabledata)

        for(let i in objectdata){
            let editbtn = document.getElementsByClassName('editbtn')[i]
            let delbtn = document.getElementsByClassName('delbtn')[i]
            console.log(delbtn)
            editbtn.addEventListener('click',(function(tabledata){
              
                return function(){
                   document.querySelector(".wave").style.display = "flex";
                    
                   editItem(tabledata)
                   
                }
              
             })(objectdata[i]))
        
           delbtn.addEventListener('click',(function(tabledata){
                
            return function(){
               deleteItem(tabledata)
            }
          
           })(objectdata[i]))
           console.log(objectdata[i])
           


          
    }
})


}

work()




if (BranchForm) {

    BranchForm.addEventListener('submit', handleBranch)
}

function handleBranch(event) {
    event.preventDefault()
    const RegisterEndpoint = `${baseEndpoint3}`
    let BranchFormData = new FormData(BranchForm)
    console.log(BranchFormData)
    let BranchObjectData = Object.fromEntries(BranchFormData)
    let bodyStr = JSON.stringify(BranchObjectData)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken,
        },
        body: bodyStr
    }
    fetch(RegisterEndpoint, options)
    
    .then(function(){
        work()

        document.getElementById('branch-form').reset()
        
    })
}



const button1 = document.getElementById('back');

button1.addEventListener('click',() =>{

    window.location.href = `http://127.0.0.1:8000/main/` 
});






const button = document.getElementById('day');


button.addEventListener('click',()=>{
              
   
        let branch_id = document.getElementById('bid').value 
        let branch_name = document.getElementById('bname').value 
        let city_name =  document.getElementById('city').value  
        let state = document.getElementById('state').value
        let pincode = document.getElementById('pcode').value 
        let Gst_number = document.getElementById('gnum').value 
        let branch_code = document.getElementById('bcode').value 
    
        const data ={'branch_id':branch_id ,'branch_name' :branch_name, 'city_name' :city_name,
        'state' :state, 'pincode' :pincode,'Gst_number' :Gst_number,'branch_code' :branch_code,
        }
        let value = activeItem.pk
        console.log(value)
       
        let url = `http://127.0.0.1:8000/${value}/branch/`

        console.log(url)
        fetch(url,{
            method : "PUT",
            headers : {
                'content-Type' :'application/json',
                'X-CSRFToken': csrftoken,
            },
            body :JSON.stringify(data),
    
        }).then(function(){
            console.log('gow')
            work()
            console.log('vh')
            document.getElementById('branch-form').reset()
           
        })
        activeItem = null
    
})

   
   
      
