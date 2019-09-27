/*
const noticeTemplate = ( id, text, start, end) => {
    const noticeContainer = $('<div>').attr({
        class: 'content-notice__list',
        id: id
    });
    
    const name = $('<p>');
    const button = $('<button>').attr({
        'data-id': id,
        class: 'btn btn-default favorites',
        'data-state': is_favorite
    });

    name.html(burgerName);
    button.html('add to favorite');

    noticeContainer.append(img, name, button);
    return noticeContainer;
};


const displayNewNotice = (notice) => {
    const name = notice.condoName;
    const id = notice.id;
    const text = notice.text;
    const start = notice.start;
    const end = notice.end;

    const newNotice = noticeTemplate(name, id, text, start, end);

    $('.content-notice').prepend(newNotice);
    $('input').val('');
};

const addCondoFail = (response) => {
    alert('Failed to Add Notice');
};
*/

$('button[type= submit]').on('click', function(event){
    event.preventDefault();// prevent the Browser from refreshing
    
    const condoName = $('input[name ="condoName"]').val();
    const noticeText = $('input[name="text"]').val();
    const noticeStart = $('input[name="start"]').val();
    const noticeEnd = $('input[name="end"]').val();

    alert('Submit! ' + noticeText);

    $.ajax({
        url: 'http://localhost:3000/dashboard/add',
        method: 'POST',
        data: {
            condoName: condoName,
            text: noticeText,
            start: noticeStart,
            end: noticeEnd,
            id: 0
        }
    })
    .then(function(){
        alert('Notice added');
    })
    .catch(function(){
        alert('Notice was not able to add');
    });
    
});;