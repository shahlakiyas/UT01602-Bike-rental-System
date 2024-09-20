document.addEventListener("DOMContentLoaded" ,() =>{
    const student = students.find(s => s.nicNumber == nic);

    if(student){
        document.getElementById("nic").value = student.nicNumber
        document.getElementById("fullname").value = student.fullName
        document.getElementById("email").value = student.email
        document.getElementById("phone").value = student.phone
    }

    document.getElementById('update-button').addEventListener("click",()=>{
        document.getElementById("fullname").disabled = false
        document.getElementById("email").disabled = false
        document.getElementById("phone").disabled = false

        document.getElementById('update-button').style.display = 'none'
        document.getElementById('save-button').style.display = 'block'
        document.getElementById('Cancel-button').style.display = 'block'
    })

    document.getElementById('save-button').addEventListener('click' , ()=>{
        const fullName = document.getElementById("fullname").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value

        student.fullName = fullName
        student.email = email
        student.phone = phone

        document.getElementById("fullname").disabled = true
        document.getElementById("email").disabled = true
        document.getElementById("phone").disabled = true

        document.getElementById('update-button').style.display = 'block'
        document.getElementById('save-button').style.display = 'none'

        localStorage.setItem('students' ,JSON.stringify(students))
    })

    document.getElementById('Cancel-button').addEventListener('click',()=>{
        document.getElementById("fullname").disabled = true
        document.getElementById("email").disabled = true
        document.getElementById("phone").disabled = true

        document.getElementById('update-button').style.display = 'block'
        document.getElementById('save-button').style.display = 'none'
        document.getElementById('Cancel-button').style.display = 'none'
    })

})

// Password Change

function Encryption(password){
    return btoa(password)
}

document.addEventListener("DOMContentLoaded" ,() =>{
    const student = students.find(s => s.nicNumber == nic);

    document.getElementById('update-password').addEventListener('click' , ()=>{
        const oldPassword = Encryption(document.getElementById('oldPassword').value);
        const newPassword = Encryption(document.getElementById('newPassword').value);
        const confirmPassword = Encryption(document.getElementById('confirmPassword').value);
        if(student){
            if(student.password == oldPassword){
                if(newPassword == confirmPassword){
                    student.password = newPassword
                    localStorage.setItem('students',JSON.stringify(students))
                    alert('Password Changed Successfully')
                }else{
                    alert('Password does not match')
                }
            }else{
                alert("Old Password is incorrect")
            }
        }
    })
})
