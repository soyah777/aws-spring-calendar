
document.addEventListener("DOMContentLoaded", function(){
    let baseUrl = window.location.origin+"/calendar";

    // ページ読み込み後にスタイルシートを切り替える処理
    // let screenWidth = window.innerWidth;
    // let stylesheet = document.getElementById('style-sheet');
    //
    // if(screenWidth <= 414){
    //     stylesheet.setAttribute('href','/css/mobile-style.css');
    // }else{
    //     stylesheet.setAttribute('href','/css/style.css');
    // }

    let calendar = document.querySelector(".calendar");
    let rowCount = calendar.getAttribute("data-row-count");


    if(rowCount){
        let stylesheet = document.getElementById("style-sheet").getAttribute("href");
        
        if(stylesheet.includes("mobile-style.css")){
            calendar.style.gridTemplateRows = `repeat(${rowCount}, 102px)`
        }else {
            calendar.style.gridTemplateRows = `repeat(${rowCount}, 200px)`
        }
    }



    document.addEventListener("keydown" , function(event){

        let currentYear = parseInt(document.getElementById("yearSelect").value);
        let currentMonth = parseInt(document.getElementById("monthSelect").value);


        if(event.key === "ArrowLeft"){
            let newYear = (currentMonth === 1)?currentYear-1:currentYear;
            let newMonth = (currentMonth === 1)?12:currentMonth-1;
            window.location.href = `${baseUrl}?year=${newYear}&month=${newMonth}`;

        }else if(event.key === "ArrowRight"){
            let newYear = (currentMonth === 12)?currentYear+1:currentYear;
            let newMonth = (currentMonth === 12)?1:currentMonth+1;
            window.location.href = `${baseUrl}?year=${newYear}&month=${newMonth}`;
        }
    });


    document.getElementById("yearSelect").addEventListener("change",updateCalendar);
    document.getElementById("monthSelect").addEventListener("change" ,updateCalendar);

    function updateCalendar(){
        let selectedYear = document.getElementById("yearSelect").value;
        let selectedMonth = document.getElementById("monthSelect").value;
        window.location.href = `${baseUrl}?year=${selectedYear}&month=${selectedMonth}`;
    }

    document.querySelectorAll('.day').forEach(dayElement =>
        dayElement.addEventListener('click',function(){
            const year = dayElement.getAttribute('data-year');
            const month = dayElement.getAttribute('data-month');
            const date = dayElement.getAttribute('data-date');

            const url = '/todo-details?year=' + year + '&month=' + month + '&date=' + date;

            window.location.href = url;
        })
    )

    // 「←」で前月へ移動
    function changeMonthToPrev(){
        let currentYear = parseInt(document.getElementById("yearSelect").value);
        let currentMonth = parseInt(document.getElementById("monthSelect").value);

        let newYear = (currentMonth === 1)? currentYear-1 : currentYear;
        let newMonth = (currentMonth === 1)? 12 : currentMonth-1;
        window.location.href = `${baseUrl}?year=${newYear}&month=${newMonth}`;
    }

    const prevMonthButton = document.querySelector(".prev");

    prevMonthButton.addEventListener("click",changeMonthToPrev);
    prevMonthButton.addEventListener("touchstart",changeMonthToPrev,{passive:true});



    // 「→」で翌月へ移動
    function changeMonthToNext(){
        let currentYear = parseInt(document.getElementById("yearSelect").value);
        let currentMonth = parseInt(document.getElementById("monthSelect").value);

        let newYear = (currentMonth === 12) ? currentYear+1 : currentYear;
        let newMonth = (currentMonth === 12) ? 1 : currentMonth+1;

        window.location.href = `${baseUrl}?year=${newYear}&month=${newMonth}`;
    }

    const nextMonthButton = document.querySelector(".next");

    nextMonthButton.addEventListener("click",changeMonthToNext);
    nextMonthButton.addEventListener("touchstart",changeMonthToNext,{passive:true});

});