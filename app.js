const countrys =["AED","AFN","ALL", "AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"];
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

        const currencyDetails = new XMLHttpRequest();

        currencyDetails.open('GET','https://free.currconv.com/api/v7/currencies?apiKey=d84757083f9d0f4c08f3', true);

        currencyDetails.onload = function(){
            if(this.status == 200){
                const results = (JSON.parse(this.responseText));
                console.log(results);

                countrys.forEach(country=>{
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = `${country} - ${results["results"][country]["currencyName"]}`;
                    inputID.appendChild(option);
                    inputID.appendChild(option);
                   
                });
            }
        }

        currencyDetails.send();

        
}

form.addEventListener('submit', function(e){

    const inputValue = parseInt(inputAmount.value);
    e.preventDefault();
    const fromTO = `${inputFrom.value}_${inputTo.value}`;
    const toFrom = `${inputTo.value}_${inputFrom.value}`;
    const url = `https://free.currconv.com/api/v7/convert?q=${fromTO},${toFrom}&compact=ultra&apiKey=d84757083f9d0f4c08f3`;
 //create the object
 const xhr = new XMLHttpRequest();

 //open the connection
 xhr.open('GET',url, true);

 // Execute the function
 xhr.onload = function(){
      
      if(this.status === 200){
           
          const result= (JSON.parse(this.responseText));
          
          let rate = result[fromTO];
          let toFromRate = result[toFrom];
            rate = (rate * inputValue);
            rate = rate.toFixed(3);
            console.log(rate);
        const htmlResult = `
                <h5 class="card-title"><span>${inputValue} ${inputFrom.value} </span>=</h5>
                <h1 style="display: inline-block;">${rate} <span style="font-size: 25px;">${inputTo.value}</span></h1>
                <p class="card-text">1 ${inputTo.value} = ${toFromRate} ${inputFrom.value}</p>
                <p class="card-text">1 ${inputFrom.value} = ${rate} ${inputTo.value}</p>        
        `;


            displayTimeOut(htmlResult);
            // displayResult.innerHTML = htmlResult;

        
            
      }
 }

 //send the sequest
 xhr.send();
    
});

function displayTimeOut(htmlResult){
    const spinner = document.querySelector('.spinner');
        spinner.classList.remove('d-none');
        displayResult.classList.add('d-none');
    setTimeout(()=>{
        displayResult.classList.remove('d-none');
        spinner.classList.add('d-none');
        displayResult.innerHTML = htmlResult;
    },1000);
}