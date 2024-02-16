document.getElementById("btn").addEventListener('click', function(event) {

    const dayInput = document.querySelector(".day").value.trim();
    const monthInput = document.querySelector(".month").value.trim();
    const yearInput = document.querySelector(".year").value.trim();

    let dobError = document.querySelector(".day-error");
    let monthError = document.querySelector(".month-error");
    let yearError = document.querySelector(".year-error");

    let isValid = isValidDate(dayInput, monthInput, yearInput);

    // Clear the previous error messages
    dobError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";

    if (dayInput === "") {
        dobError.textContent = "This field is required";
        event.preventDefault(); // Prevent form submission
    }

    if (monthInput === "") {
        monthError.textContent = "This field is required";
        event.preventDefault(); // Prevent form submission
    }

    if (yearInput === "") {
        yearError.textContent = "This field is required";
        event.preventDefault(); // Prevent form submission
    } else if (!isValid) {
        dobError.textContent = "Must be a valid day.";
        monthError.textContent = "Must be a valid month";
        yearError.textContent = "Must be in the past";
        event.preventDefault();; // You need to define this function
    } else {
        
        showAge(); // Prevent form submission
    }

    //checks if the erros message is active
    let errorday = document.querySelector(".day-error:not(:empty)");
    let errormonth = document.querySelector(".month-error:not(:empty)")
    let erroryear = document.querySelector(".year-error:not(:empty)")

    // if the error messages are active color the element red
    if (errorday) {
        document.querySelector("span").style.color = "hsl(0, 100%, 67%)";
        document.querySelector("input").style.border = "1px solid hsl(0, 100%, 67%)"; 
    }
    if (errormonth) {
        document.querySelector(".month-label").style.color = "hsl(0, 100%, 67%)";
        document.querySelector(".month").style.border = "1px solid hsl(0, 100%, 67%)";
    
    }

    if (erroryear) {
        document.querySelector(".year-label").style.color = "hsl(0, 100%, 67%)";
        document.querySelector(".year").style.border = "1px solid hsl(0, 100%, 67%)";
    
    }
})

function isValidDate(day, month, year) {
    const parsedDay = parseInt(day, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    // Check if inputs are numeric and within valid ranges
    if (isNaN(parsedDay) || isNaN(parsedMonth) || isNaN(parsedYear) ||
        parsedMonth < 1 || parsedMonth > 12 || parsedDay < 1) {
        return false;
    }

    // Get the last day of the given month
    const lastDayOfMonth = new Date(parsedYear, parsedMonth, 0).getDate();

    // Check if day is within the valid range for the month
    if (parsedDay > lastDayOfMonth) {
        return false;
    }

    // Check if the year is not greater than the current year
    const currentYear = new Date().getFullYear();
    if (parsedYear > currentYear) {
        return false;
    }

    return true; // Return true if all conditions are met
}



   

  
function showAge() {

    const day = parseInt(document.querySelector(".day").value);
    const month = parseInt(document.querySelector(".month").value);
    const year = parseInt(document.querySelector(".year").value);

 

    const dob = new Date(year, month - 1, day); // Subtract 1 from month to match JavaScript's month indexing (0-11)
    const now = new Date();

    let ageYears = now.getFullYear() - dob.getFullYear();
    let ageMonths = now.getMonth() - dob.getMonth();
    let ageDays = now.getDate() - dob.getDate();

    // Adjust for negative months or days
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
        if (ageDays < 0) {
            const lastMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            ageDays += lastMonthDays;
        }
    }

    // Display the result by replacing "--" with years, months and days
    document.querySelector(".year-print").textContent = document.querySelector(".year-print").textContent.replace("--", ageYears);
    document.querySelector(".month-print").textContent = document.querySelector(".month-print").textContent.replace("--", ageMonths);
    document.querySelector(".day-print").textContent = document.querySelector(".day-print").textContent.replace("--", ageDays);
  
}

;





