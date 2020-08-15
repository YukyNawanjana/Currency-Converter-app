const countrys =["ADE","AFN","ALL", "AMD","USD", "GBP"];
const form = document.getElementById('request-quote');
const inputAmount = document.getElementById('input-amount');
const inputFrom = document.getElementById('input-from');
const inputTo = document.getElementById('input-to');
const displayResult = document.getElementById('display-result');



eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded', function(){
        displayYears(inputFrom);
        displayYears(inputTo);
    });

}

function displayYears(inputID){


        countrys.forEach(country=>{
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        inputID.appendChild(option);
        inputID.appendChild(option);
        
    })
}

form.addEventListener('submit', function(e){

    const inputValue = parseInt(inputAmount.value);
    e.preventDefault();
    const fromTO = `${inputFrom.value}_${inputTo.value}`;
    const url = `https://free.currconv.com/api/v7/convert?q=${fromTO}&compact=ultra&apiKey=d84757083f9d0f4c08f3`;
 //create the object
 const xhr = new XMLHttpRequest();

 //open the connection
 xhr.open('GET',url, true);

 // Execute the function
 xhr.onload = function(){
      
      if(this.status === 200){
           
          const result= (JSON.parse(this.responseText));
          let rate = result[fromTO];
            rate = (rate * inputValue);
        
        const htmlResult = `
                <h5 class="card-title"><span>${inputValue} ${inputFrom.value}</span></h5>
                <h1 style="display: inline-block;">${rate} <span style="font-size: 25px;">${inputTo.value}</span></h1>
                <p class="card-text">1 USD = 184.072 LKR</p>
                <p class="card-text">1 LKR = 0.00543266 USD</p>        
        `;

        displayResult.innerHTML = htmlResult;
            
      }
 }

 //send the sequest
 xhr.send();
    
});
