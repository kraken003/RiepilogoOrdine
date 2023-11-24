import { Product } from "./classi.js";

var coloriCiabatte=["rosa","rosso","blu"];
var prodotto1 :Product=new Product("abc","Ciabatte",coloriCiabatte,"Ciabatte belle",45,"Ciccio&Co");


const prodotto=document.querySelector("#prodotto");

var listaProdotti=[prodotto1,prodotto1,prodotto1,prodotto1];

for(let product of listaProdotti){
    var card=prodotto?.cloneNode(true);
    var figliCard=card?.firstChild?.childNodes
    
    if(card?.hasChildNodes){
        console.log(figliCard);
    }
} 