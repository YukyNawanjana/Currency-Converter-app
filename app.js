 //create the object
 const xhr = new XMLHttpRequest();

 //open the connection
 xhr.open('GET','https://free.currconv.com/api/v7/convert?q=USD_AUD,AUD_USD&compact=ultra&apiKey=d84757083f9d0f4c08f3', true);

 // Execute the function
 xhr.onload = function(){
      
      if(this.status === 200){
           
          const result= (JSON.parse(this.responseText));
            
         
              console.log(result);
      
            
      }
 }

 //send the sequest
 xhr.send();