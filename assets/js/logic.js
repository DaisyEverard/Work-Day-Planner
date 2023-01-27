const currentDay = $('#current-day')
const timeblockContainer = $('#timeblock-container')

// show date and time
const displayTime = () => {
    currentDay.text(moment().format('dddd Do MMMM    HH:mm:ss')); 
}
const updateTime = setInterval(displayTime, 1000); 

// set up timeblocks
timesArray = [['9AM', 'am9'], ['10AM', 'am10'], ['11AM', 'am11'], ['12PM', 'pm12'],
['1PM', 'pm1'], ['2PM', 'pm2'], ['3PM', 'pm3'], ['4PM', 'pm4'], ['5PM', 'pm5']]

const timeBlockSetup = (item) => {
    // set up html for blocks with changing id and time
   timeblockContainer.append(`<div class="row time-block" id="${item[1]}">
   <div class="col-md-2 hour">
     <h3>${item[0]}</h3>
   </div>
   <div class="col-md-9 row-content">
     <textarea></textarea>
   </div>
   <div class="col-md-1 save-btn">
     <i class="fa fa-solid fa-check"></i>
   </div>
 </div>`)
}
timesArray.forEach(timeBlockSetup)

  // set background color
const timeBlockArray = $('.time-block').toArray()

timeBlockArray.forEach((item) => {
    const thisTime = $(item).find('h3').text();
    const currentHour = moment().format('hA'); 
    if (currentHour === thisTime) {
       $(item).find('.row-content').addClass('present')
    } else if (moment(thisTime, 'hA').isBefore(moment())) {
        $(item).find('.row-content').addClass('past')
    } else {
        $(item).find('.row-content').addClass('future')
    }
}); 

