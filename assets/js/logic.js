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
   timeblockContainer.append(`
   <div class="row time-block" id="${item[1]}">
   <div class="col-md-2 col-sm-3 col-12 hour">
     <h3>${item[0]}</h3>
   </div>
   <div class="col-md-9 col-sm-7 col-10 row-content flex-center">
     <ul></ul>
     <textarea></textarea>
   </div>
   <div class="col-md-1 col-sm-2 col-2 save-btn flex-center">
     <i class="fa fa-solid fa-check"></i>
   </div>
 </div>`)
}
timesArray.forEach(timeBlockSetup)

  // set background color
const timeBlock = $('.time-block')

timeBlock.each(((i, item) => {
    const thisTime = $(item).find('h3').text();
    const currentHour = moment().format('hA'); 
    if (currentHour === thisTime) {
       $(item).find('.row-content').addClass('present')
    } else if (moment(thisTime, 'hA').isBefore(moment())) {
        $(item).find('.row-content').addClass('past')
    } else {
        $(item).find('.row-content').addClass('future')
    }
}))

// display stored tasks
displayStoredEvents = () => {
    timeBlock.each((i, item) => {
        let id = $(item).attr('id')
        let newContent = localStorage.getItem(`${id}task`);
        if (!newContent) {
            return;
        } else {
           $(item).find('ul').html('<li>' + localStorage.getItem(`${id}task`) + '</li>')
        }
    })
}
displayStoredEvents(); 

// store each event
const saveBtn = $('.save-btn'); 

saveBtn.on('click', event => {
    let textArea = $(event.target).parent().find('textarea')
    let textBoxContent = $(textArea).val()
    console.log(textBoxContent); 

    let id = $(event.target).parent().attr('id'); 
    localStorage.setItem(`${id}task`, textBoxContent); 
    displayStoredEvents(); 
    $(textArea).val(''); 
})