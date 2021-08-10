console.log("Client side js file")


const weatherDoc  = document.querySelector('form')
const searchValue = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherDoc.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchedValue = searchValue.value

    messageOne.textContent = 'Please wait Loading...'
    messageTwo.textContent = ''
     

    fetch(`http://localhost:3000/weather?address=${searchedValue}`).then((response) => {
    response.json().then((data) => {
    if(data.error) {
        messageOne.textContent = data.error
        
    }else {
        messageOne.textContent =  data.location
        messageTwo.textContent = `${data.data.Weather_Description}, with a temperature of ${data.data.temperature} degrees. But it feels like ${data.data.Apparent_Weather} degree outside.`
        console.log(data)
        // .Apparent_Weather  data.Weather_Description + data.temperature
        // 91 , Partly cloudy , 84
        
    }
       
})
})
    
})