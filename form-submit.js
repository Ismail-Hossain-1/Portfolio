

let form = document.querySelector('#form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let data= new FormData(form);
    document.querySelector('#submit').value="Submitting.."
    fetch('https://script.google.com/macros/s/AKfycbxs-DDP9uq8VmDzADz8HgwmfAjnYOquReXzO769bOgVV8vr8xmHiNVJFAZUhZCJVUrp/exec', {
        method: "POST", 
        body:data
    }).then(res=>res.text()).then(
        data=>{
            alert("submitted");
            document.querySelector('#submit').value="Submit"
        }
    )
})