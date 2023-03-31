//Inputs /Dom elements 

const homeValue = document.getElementById("homeValue");
const downPayment = document.getElementById("downPayment");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanDuration = document.getElementById("loanDuration");

const form = document.getElementById("mortgage");

//Event listener listening for when the user releases the key
//The value class gets the value in the loanAmount and downPayment elements
//The downpayment is subtracted from the home value, and is stored in the new variable loanAmountValue
//The variable loanAmountValue is then returned
downPayment.addEventListener("keyup", () => {
    loanAmount.value=homeValue.value - downPayment.value;

    let loanAmountValue = loanAmount.value;
    return loanAmountValue;
})

//Calculate the mortgage using three values: Loan amount, interest rate, number of payments

function calculateMortgage (loanAmount,interestRate,numberMonthlyPayments){

    //function to convert user input in to percentage
    function percentageToDecimal(percent){
        return percent / 12 / 100;
    }

    //reassign interest rate using the percentage to decimal function 
    interestRate = percentageToDecimal(interestRate);

    //function to convert years to months 
    function yearsToMonths(year){
    return year * 12;
    }

    numberMonthlyPayments = yearsToMonths(numberMonthlyPayments)

//use a forumula to calculate the mortgage    
let mortgage = (interestRate * loanAmount)/(1-Math.pow(1+interestRate,-numberMonthlyPayments))

return parseFloat(mortgage.toFixed(2));
}

//onsubmit event listener, callback function takes in the event itself as an argument
form.onsubmit=(e)=>{
    e.preventDefault();
    validate()
    let loanAmount = homeValue.value - downPayment.value;

    //call the calculateMortgage Function
    let monthlyPayment = calculateMortgage(loanAmount,interestRate.value,loanDuration.value);

    document.getElementById("monthlyPayment").innerHTML= `£ ${monthlyPayment}`;
}

//function to prompt the user to complete all fields, if any are left blank 
function validate(){
    
    //if/else statement to provide a custom alert if any fields are left blank
    if(
        homeValue.value==="" || downPayment.value==="" || interestRate.value===""|| loanDuration.value===""
    ){
        let alert = document.createElement("div");
        alert.className = "btn red btn-large";
        alert.innerHTML = `<span> Please complete all fields </span>`;
        alert.style.margin = ".5rem 35%";
        form.parentNode.insertBefore(alert,form);
    }
}
