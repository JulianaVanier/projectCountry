// first option to datalist it was in html https://www.geeksforgeeks.org/how-to-display-suggestions-for-input-field-in-html/
// after I created the function below
//function to bring countries to datalist in html//
function loadNamesCountry() {
    const linkAPI = "https://restcountries.com/v3.1/all";
    fetch(linkAPI)
        .then((result) => result.json())
        .then((namesCountry) => {
            let dataList = document.querySelector("datalist");
            for (let i = 0; i < namesCountry.length; i++) {
                let itemDataList = document.createElement("option");
                itemDataList.value = `${namesCountry[i].name.common}`;
                itemDataList.textContent = `${namesCountry[i].name.common}`;
                dataList.appendChild(itemDataList);
                // console.log("name", namesCountry[i].name.common);
            }
            balance.focus();
        });
}
loadNamesCountry();
//*************************************************/

// get value from input

// get value with submit
submit.addEventListener("click", (event) => {
    executeValue(event);
});

// get value with enter / reference: https://stackoverflow.com/questions/16011312/how-can-i-execute-a-function-on-pressing-the-enter-key-in-an-input-field
balance.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        executeValue(event);
        event.preventDefault(); // I had problem to avoid reload the page / reference: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter
    }
});
//*************************************************/

// function to check value
function executeValue(event) {
    // console.log("Event", event);
    let country = balance.value;
    msg.textContent = "";
    if (balance.value == "") {
        msg.textContent = "Please enter a value";
        balance.focus();
    } else if (!isNaN(balance.value)) {
        msg.textContent = "Invalid input!";
        balance.value = "";
        balance.focus();
    } else {
        loadCountry();
    }
}
//*************************************************/

//function to fetch
function loadCountry() {
    const linkInf = `https://restcountries.com/v3.1/name/${balance.value}`;
    const linkInfAll = `https://restcountries.com/v3.1/${balance.value}`;

    if (balance.value == "all") {
        fetch(linkInfAll)
            .then((result) => result.json())
            .then((countryInfAll) => {
                let result = document.querySelector(".result");
                msg.textContent = "";
                console.log("resultado", countryInfAll);
                console.log("nome", countryInfAll[0].name.common);
                printAllCountries(countryInfAll); //call fucntion to print information
                balance.value = ""; //clean input after print information
            });
    } else {
        fetch(linkInf)
            .then((result) => result.json())
            .then((countryInf) => {
                let result = document.querySelector(".result");
                msg.textContent = "";
                if (countryInf.status == "404") {
                    //condition to if input is incorrect
                    msg.textContent = "Invalid input";
                    return;
                }
                printCountry(countryInf[0]); //call function to print information
                balance.value = ""; //clean input after print information
            });
    }
}
//*************************************************/

//button reset clean all the information
reset.addEventListener("click", (event) => {
    let result = document.querySelector(".result");
    result.innerHTML = "";
    msg.textContent = "";
    balance.value = "";
    balance.focus();
});
//*************************************************/

//function to print informations of the country
function printCountry(country) {
    let result = document.querySelector(".result");
    balance.focus();

    //container to receive informations//
    let newDivContainer = document.createElement("div");
    newDivContainer.classList = "containerInfCountry";
    result.appendChild(newDivContainer);
    //****************************//

    let newDiv2 = document.createElement("div");
    let aNewDiv2 = document.createElement("a");
    newDiv2.classList = "containerName";
    aNewDiv2.href = `${"https://en.wikipedia.org/wiki/" + country.name.common}`;
    aNewDiv2.target = "_blank";
    aNewDiv2.textContent = `${country.name.common}`;
    newDiv2.appendChild(aNewDiv2);

    newDivContainer.appendChild(newDiv2);

    let newDiv3 = document.createElement("div");
    newDiv3.classList = "containerRegion";
    newDiv3.textContent = `${country.region}`;
    newDivContainer.appendChild(newDiv3);

    let newDiv4 = document.createElement("div");
    newDiv4.classList = "containerCapital";
    newDiv4.textContent = `${country.capital}`;
    newDivContainer.appendChild(newDiv4);

    let newDiv5 = document.createElement("div");
    newDiv5.classList = "containerCurrencies";
    for (let prop in country.currencies) {
        newDiv5.textContent = `${country.currencies[prop].name}`;
    }
    newDivContainer.appendChild(newDiv5);

    let newDiv6 = document.createElement("div");
    newDiv6.classList = "containerLanguages";
    let listLanguages = [];
    for (let prop in country.languages) {
        listLanguages.push(country.languages[prop]);
    }
    newDiv6.textContent = listLanguages.join(", "); // How separate itens with "," - reference / https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join#:~:text=Description-,Array.prototype.join(),returned%20without%20using%20the%20separator.
    newDivContainer.appendChild(newDiv6);

    let newDiv7 = document.createElement("div");
    let imgBox = document.createElement("img");
    newDiv7.classList = "containerImg";
    imgBox.src = `${country.flags.png}`;
    imgBox.alt = "Image flag";
    newDiv7.appendChild(imgBox);
    newDivContainer.appendChild(newDiv7);
}

function printAllCountries(countryInfAll) {
    let result = document.querySelector(".result");
    result.innerHTML = "";
    
    for (let i = 0; i < countryInfAll.length; i++) {
        printCountry(countryInfAll[i]);
    }
}