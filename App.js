const button = document.getElementById("mainBtn");
const inputMain = document.getElementById("inputMain");

const IntraDayBtn = document.getElementById("intraday");
const dailyBtn = document.getElementById("daily")
const weeklyBtn = document.getElementById("weekly")
const monthlyBtn = document.getElementById("monthly")



let mainBtnClicked = false;
let intradayBtnClicked = false;
let dailyBtnClicked = false;
let weeklyBtnClicked = false;
let monthlyBtnClicked = false;



button.addEventListener("click", (event) => {
    event.preventDefault();
    const test = inputMain.value.toUpperCase();
    console.log(test)
    mainBtnClicked = true;
    if (intradayBtnClicked) {
        showDetails(test, "INTRADAY");
        mainBtnClicked = false;
        intradayBtnClicked = false;
    }
    else if (dailyBtnClicked) {
        showDetails(test, "DAILY")
        mainBtnClicked = false;
        dailyBtnClicked = false;
    }
    else if (weeklyBtnClicked) {
        showDetails(test, "WEEKLY")
        mainBtnClicked = false;
        weeklyBtnClicked = false;
    }
    else if (monthlyBtnClicked) {
        showDetails(test, "MONTHLY")
        mainBtnClicked = false;
        monthlyBtn = false;
    }
});

//Sabke button
IntraDayBtn.addEventListener("click", (event2) => {
    event2.preventDefault();
    intradayBtnClicked = true;
    if (mainBtnClicked) {
        showDetails("YOUR_DEFAULT_SYMBOL", "INTRADAY"); // Replace "YOUR_DEFAULT_SYMBOL" with the appropriate default symbol
        mainBtnClicked = false;
        intradayBtnClicked = false;
    }
});

dailyBtn.addEventListener("click", (event3) => {
    event3.preventDefault();
    dailyBtnClicked = true;
    if (mainBtnClicked) {
        showDetails("Daily-Button")
        mainBtnClicked = false;
        dailyBtnClicked = false;
    }
})

weeklyBtn.addEventListener("click", (event4) => {
    event4.preventDefault();
    weeklyBtnClicked = true;
    if (mainBtnClicked) {
        showDetails("Weekly-Butttons")
        mainBtnClicked = false;
        weeklyBtnClicked = false;
    }
})

monthlyBtn.addEventListener("click", (event5) => {
    event5.preventDefault();
    monthlyBtnClicked = true;
    if (mainBtnClicked) {
        showDetails("Monthly Buttons")
        mainBtnClicked = false;
        monthlyBtnClicked = false;
    }
})


async function showDetails(test, listener) {
    console.log(test)
    console.log(listener)
    let response;

    let sometime = `TIME_SERIES_${listener}`
    response = await fetch(`https://www.alphavantage.co/query?function=${sometime}&symbol=${test}&interval=5min&apikey="XI0W15B1EW5UK7RH"`)
    // response = await fetch(`https://www.alphavantage.co/query?function=${sometime}&symbol=${test}&apikey="1R0VK7FIB2TZ2YSS"`);
    const data = await response.json();

    console.log(sometime)

    // const currentDate = new Date();
    // const day = String(currentDate.getDate()-1).padStart(2, '0'); 
    // const key = `2023-08-${day}`;

    // let timeSeries;

    // = data["Time Series (Daily)"][key]["1. open"];

    // if (sometime === "TIME_SERIES_INTRADAY") {
        // timeSeries = data["Time Series (5min)"]["2023-08-18 19:55:00"]["1. open"]
    // } else if (sometime === "TIME_SERIES_WEEKLY") {
    //     timeSeries = data["Weekly Time Series"]["2023-08-18"]["1. open"]
    // } else if (sometime === "TIME_SERIES_MONTHLY") {
    //     timeSeries = data["Monthly Time Series"]["2023-06-30"]["1. open"]
    // } else if (sometime === "TIME_SERIES_DAILY") {
    //     timeSeries = data["Time Series (Daily)"]["2023-08-16"]["1. open"]
    // }



    // let valueOfTimeSeries;

    // const OnlyIntraDay = data["Time Series (5min)"]
    // const IntradayDates = Object.keys(OnlyIntraDay);
    // const Dated = IntradayDates[0];
    // const vallllues = OnlyIntraDay[Dated]
    // const openIntradayValue = vallllues["1. open"]



           if(listener === "DAILY"){
                valueOfTimeSeries = data["Time Series (Daily)"]
            }else if(listener === "MONTHLY"){
                valueOfTimeSeries = data["Monthly Time Series"]
            }else if(listener === "WEEKLY"){
                valueOfTimeSeries = data["Weekly Time Series"]
            }else{
               let valueOfTimeSeries = data["Time Series (5min)"]
            }

            const dates = Object.keys(valueOfTimeSeries);
            const date = dates[0];
            const values = valueOfTimeSeries[date]
            const openValue = values["1. open"];
            console.log(openValue)




    // console.log(timeSeries)


    const MetaData = data["Meta Data"]["2. Symbol"];

    const main = document.getElementById("main-sec");


    const article = document.createElement("article");
    article.classList.add("dynamic");


    const p = document.createElement("p");
    p.innerText = `${MetaData}`;
    article.append(p);

    const p2 = document.createElement("p");
    p2.innerText = `${openValue}`;
    p2.classList.add("innerContent");
    const div = document.createElement("div");
    div.classList.add("timeDiv")

    // Color according to the bar everytime refresh

    function getRandomColor(openValue) {
        if (openValue >= 100) {
            return 'green'
        } else if (openValue > 60 && openValue <= 100) {
            return 'white'
        } else if (openValue <= 60) {
            return 'red'
        }
    }

    div.style.backgroundColor = getRandomColor(openValue);


    div.append(p2);
    article.append(div);

    const p3 = document.createElement("p");
    p3.innerText = `${listener}`;
    const div2 = document.createElement("div");
    div2.classList.add("tradeWay")
    div2.append(p3);
    article.append(div2);

    const buttoncross = document.createElement("button");
    buttoncross.classList.add("btnnn")
    buttoncross.innerHTML = `<i class="fa-solid fa-xmark fa-2xl" style="color: #ffffff;"></i>`;

    // button.addEventListener("click", ()=>{
    //     main.removeChild(article);
    // })




    article.append(buttoncross);

    main.append(article);








    let click = 0;
    // let flag = false;
    // article.classList.add("game")

    article.addEventListener("click", (event) => {
        // flag = true;
        // event.stopImmediatePropagation()

        let detailedModal = document.createElement("div");
        // const sectio = document.getElementById("seme")
        let rowDetail = document.createElement("ul");



        if (click % 2 === 0) {
            click++;

            detailedModal.className = `name-detail detailed-model`;
            detailedModal.innerHTML = `<ul class="detail-list">
                    <li class="date">Date</li>
                    <li class="open">OPEN</li>
                    <li class="high">HIGH</li>
                    <li class="low">LOW</li>
                    <li class="close">CLOSE</li>
                    <li class="volume">VOLUME</li>
                  </ul>`;

            // sectio.append(detailedModal)


            rowDetail.className = `detailed-row`;
            rowDetail.className = "detail-list";

            
            for (let i = 0; i < 4; i++) {            
                
                const date = dates[i];
                const values = valueOfTimeSeries[date];
                const openValue = values["1. open"];
                const highValue = values["2. high"];
                const lowValue = values["3. low"];
                const closeValue = values["4. close"];
                const volumeValue = values["5. volume"];


                  rowDetail.innerHTML += `<li class="date">${date}</li>
                  <li class="open">${openValue}</li>
                  <li class="high">${highValue}</li>
                  <li class="low">${lowValue}</li>
                  <li class="close">${closeValue}</li>
                  <li class="volume">${volumeValue}</li>`;
            }


            // rowDetail.innerHTML = `<li class="date">Sasta</li>
            //       <li class="open">MastRam</li>
            //       <li class="high">SantRam</li>
            //       <li class="low">KantaRam</li>
            //       <li class="close">MajataRam</li>
            //       <li class="volume">ties</li>`;



            detailedModal.appendChild(rowDetail);




            main.append(detailedModal)
            buttoncross.addEventListener("click", () => {
                main.removeChild(detailedModal)

            })


        }
        if (click % 2 != 0) {
            article.addEventListener("click", () => {
                click++
                // detailedModal.removeChild(rowDetail)
                main.removeChild(detailedModal)
            })
        }
    })


    if (click % 2 != 0) {
        buttoncross.addEventListener("click", (event) => {
            // event.stopPropagation()
            // main.removeChild(article)


        })
    } else {
        buttoncross.addEventListener("click", (event) => {
            event.stopPropagation()
            main.removeChild(article)

        })
    }

    // main.append(article)

    // main.append(sectio)

    // article.addEventListener("click", (e)=>{
    //     e.preventDefault();
    //     console.log("hi");
    //     const li =  document.createElement('li');
    //     li.innerText="Reward";
    //     const buttondrop = document.createElement('button');
    //     const div3 = document.createElement("div");
    //     div3.classList.add("dropDown");
    //     div3.append(li);
    //     div3.append(buttondrop)
    //     main.append(div3)
    //     buttondrop.addEventListener("click", (e)=>{
    //         main.removeChild(div3);
    //     })
    // })


}