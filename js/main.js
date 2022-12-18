document.querySelector('button').addEventListener('click', choose)

document.querySelector('.fwd').addEventListener('click', dateFoward)
document.querySelector('.bck').addEventListener('click', dateBackward)
document.querySelector('.rndm').addEventListener('click', searchRandomDate)

let selectedDate = new Date()


function choose(){
  let choice = document.querySelector('input').value
  selectedDate = new Date(choice)
  getFetch(choice)
}

function getFetch(date){
  let url = `https://api.nasa.gov/planetary/apod?api_key=XGX2aMHaHfOJY56GvNaxSX67wRLF57eyjl2EkOTx&date=${date}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        //  Conditional to handle if we receive back an image or a video
        if (data.media_type === 'image'){
          document.querySelector('img').src = data.hdurl
          document.querySelector('iframe').classList.add("hidden")
        } else if (data.media_type === 'video'){
          document.querySelector('iframe').src = data.url
          document.querySelector('img').classList.add("hidden")
        }
        // writes the description, title, amd date
        document.querySelector('.imgDescription').innerText = data.explanation
        document.querySelector('h3').classList.remove("hidden")
        document.querySelector('.title').innerText = `${data.title} - ${data.date}`
        
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    }

function dateFoward(){
  var myDateFwd = selectedDate
  var zeros = function(val) { 
    var str = val.toString()
    return (str.length < 2) ? "0" + str : str // Adds zero infront of number for single digits E.G 9 -> 09
  }
  myDateFwd.setDate(myDateFwd.getDate() + 1)
    let y = myDateFwd.getFullYear()
    let m = myDateFwd.getMonth() + 1 // january is treated as 0 is JS
    let d = myDateFwd.getDate()
    let dateString = [y, zeros(m), zeros(d)].join("-"); 
    getFetch(dateString)
}

function dateBackward(){
  var myDateBack = selectedDate
  var zeros = function(val) { 
    var str = val.toString()
    return (str.length < 2) ? "0" + str : str // Adds zero infront of number for single digits E.G 9 -> 09
  }
  myDateBack.setDate(myDateBack.getDate() - 1)
    let y = myDateBack.getFullYear()
    let m = myDateBack.getMonth() + 1 // january is treated as 0 is JS
    let d = myDateBack.getDate()
    let dateString = [y, zeros(m), zeros(d)].join("-") // converts the date into the format required by the API
    getFetch(dateString)
}

function searchRandomDate(){
  let myDateRandom = generateRandomDate(new Date(1995, 5, 20), new Date()) // generates a new date between 1995 and today. 1995 was chosen as this is the earliest the API goes back
  selectedDate = myDateRandom
  console.log(selectedDate)
  var zeros = function(val) { 
    var str = val.toString()
    return (str.length < 2) ? "0" + str : str // Adds zero infront of number for single digits E.G 9 -> 09
  }
  myDateRandom.setDate(myDateRandom.getDate() - 1)
    let y = myDateRandom.getFullYear()
    let m = myDateRandom.getMonth() + 1 // january is treated as 0 is JS
    let d = myDateRandom.getDate()
    let dateString = [y, zeros(m), zeros(d)].join("-") // converts the date into the format required by the API
    getFetch(dateString)

}

function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

