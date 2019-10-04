/**/
const noticeTemplate = (id, text, start, end) => {

    const noticeContainer = $('<div>').attr({
        class: 'content-notice__list',
        id: id
    });

   const notice = $('<p>');
   notice.html(text);

   const startN  = $('<p>');
   startN.html('Start: ' + start);

   const endN 	= $('<p>');
   endN.html('End: ' + end);

   const buttonEdit = $('<button>').attr({
    'data-id': id,
    class: 'btn btn-success',
    name: 'Edit'
    });

    const buttonDelete = $('<button>').attr({
    'data-id': id,
    class: 'btn btn-success',
    name: 'Delete'
    });
   buttonEdit.html('Edit');
   buttonDelete.html('Delete');
   const par = $('<p>');

   noticeContainer.append( notice);
   noticeContainer.append( startN);
   noticeContainer.append( endN);
   noticeContainer.append( buttonEdit);
   noticeContainer.append( buttonDelete);
   noticeContainer.append( par);

    return noticeContainer;
};


const displayNewNotice = (notice) => {
    //const name = notice.condoName;
    const id = notice.id;
    const text = notice.text;
    const start = notice.start;
    const end = notice.end;

    const newNotice = noticeTemplate(id, text, start, end);

    $('.content-notice').prepend(newNotice);
    $('input').val('');
};

const addCondoFail = (response) => {
    alert('Failed to Add Notice');
};
/**/
//add new notice
$('button[type= submit]').on('click', function(event){
    
    event.preventDefault();// prevent the Browser from refreshing
    
    const condoName = $('input[name ="condoName"]').val();
    const noticeText = $('input[name="text"]').val();
    const noticeStart = $('input[name="start"]').val();
    const noticeEnd = $('input[name="end"]').val();

    //alert('Submit! ' + noticeText);

    $.ajax({
        url: 'http://localhost:3000/dashboard/add',
        //url: '/add',
        method: 'POST',
        data: {
            condoName: condoName,
            text: noticeText,
            start: noticeStart,
            end: noticeEnd,
            id: 0
        }
    })
    .then(displayNewNotice)
    .catch(addCondoFail);

});

// edit/delete notice
$('.content .content-notice__list button').on('click', function() {
    const id = $(this).attr('data-id');
    const name = $(this).attr('name');

    if(name == "Edit"){
        alert('Edit button! id = ' + id);
        $.ajax({
            url: 'http://localhost:3000/dashboard/edit',
            method: 'GET',
            data: {
                id: id
              }
        })
       
    }
    else if(name == "Delete"){
        alert('Delete button!! ID = ' + id);
        $.ajax({
            url: 'http://localhost:3000/dashboard/delete',
            method: 'DELETE',
            data: {
                id: id
              }
        })
        .then(removeNoticeOnDelete)
        .catch(removeNoticeFailed);
    }
    else
     alert('Not identified button!');
});

const removeNoticeOnDelete = (notice) => {

    const id = notice.id;
    alert('id = ' + id);

    $(`.content-notice__list[id=${id}]`).remove();
     
};

const removeNoticeFailed = () => {
    alert('Fail deleting notice');
};