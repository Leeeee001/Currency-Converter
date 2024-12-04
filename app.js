const key = `apikey=cur_live_jfJzRfPPAy0LdfgkIbLIu6ewj0zLwByi1HqXm6DD`;     //API key

const selectCountry = document.querySelectorAll(".country select");
const btn = document.querySelector(".exchangeBtn");
const fromCurr = document.getElementById("from");
const toCurr = document.getElementById("to");
const msg = document.querySelector(".msg")
const outPut = document.querySelector(".inputAmounts input[name='to']");




for(let select of selectCountry) {
    for(curCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(select.name === "from" && curCode === "USD") {
            newOption.selected = "selected";
        }else if(select.name === "to" && curCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e) => {
        changeFlag(e.target);
    });
}


const changeFlag = (element) => {
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", async(e) => {
    e.preventDefault();
    let amount = document.querySelector(".inputAmounts .amount");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value, "to" , toCurr.value); 
    const URL = `https://api.currencyapi.com/v3/latest?${key}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
    let res = await fetch(URL);
    let data = await res.json();
    let rate = data.data[toCurr.value].value
    let finalAmount = amtValue * rate;
    msg.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`;
    outPut.value = finalAmount;
    // console.log(finalAmount);
})


































































