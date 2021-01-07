console.log(`Client side js is loaded`);

// fetch(`http://puzzle.mead.io/puzzle`).then((res)=>{
//     res.json().then((data)=>{
//         console.log(data);
//     })
// })

fetch(`/weather?address=boston`).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else {
            console.log(data);
        }
    })
})


const weatherForm = document.querySelector(`form`)
const input = document.querySelector(`input`)
const outputA = document.querySelector(`#outputA`)
const outputB = document.querySelector(`#outputB`)


weatherForm.addEventListener(`submit`,(event)=>{
    event.preventDefault()
    const location = input.value
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            outputA.textContent = `${data.error}`
        }else {
            outputA.textContent = (data.forecast)
            outputB.textContent = (data.location)
        }
    })
})

})
