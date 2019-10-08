/**/
const noticeTemplate = (id, text, start, end) => {

    const noticeContainer = $('<div>').attr({
        class: 'content-notice__list',
        id: id
    });

    const noticeTextContainer = $('<div>').attr({
        class: 'noticetext',
    });
   const notice = $('<p>');
   notice.html(text);

   const noticeStart = $('<div>').attr({
        class: 'noticestart',
   });
   const startN  = $('<p>');
   startN.html('Start: ' + start);

   const noticeEnd = $('<div>').attr({
        class: 'noticeend',
   });
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

   noticeContainer.append( noticeTextContainer);
   noticeContainer.append( notice);
   noticeContainer.append( noticeStart);
   noticeContainer.append( startN);
   noticeContainer.append( noticeEnd);
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
    const name = $(this).attr('name');
    //alert('button: ' + name) ;
    if(name == "addNotice"){
        event.preventDefault();// prevent the Browser from refreshing
    
        const condoName = $('input[name ="condoName"]').val().trim();
        const noticeText = $('input[name="text"]').val().trim();
        const noticeStart = $('input[name="start"]').val().trim();
        const noticeEnd = $('input[name="end"]').val().trim();

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
    }
});

//edit notice
$('button[type= button]').on('click', function(event){
    const name = $(this).attr('name');

    $('.content-notice button').prop('disabled', false);

    if(name == "cancelEdit"){   //if Cancel -> hide Edit frame and show Adding frame
        $('.addform-group').css('display','inline');
        $('.editform-group').css('display','none');
    }
    else{ //name == "editNotice ", read values from notice, start and end inputs 
        const noticeID = $('input[name ="noticeID"]').val().trim();
        const noticeText = $('.editform-group input[name="text"]').val().trim();
        
        var noticeStart = $('.editform-group input[name="start"]').val().trim();
        var noticeEnd = $('.editform-group input[name="end"]').val().trim();
        //alert('Before: ' + noticeStart + '|' + noticeEnd + '|' + noticeID);

        noticeStart = checkMinFormat(noticeStart); //formate time: minutes may be not in mm format
        noticeEnd = checkMinFormat(noticeEnd);
     
        //Post data to midleware, key value is id
       //alert('After: ' + noticeStart + '|' + noticeEnd + '|' + noticeID);

        $.ajax({
            url: 'http://localhost:3000/dashboard/edit',
            method: 'POST',
            data: {
                text: noticeText,
                start: noticeStart,
                end: noticeEnd,
                id: noticeID
            }
        })
        .then(displayEditNotice)
        .catch(editNoticeFailed);
        
    }
        //done or fail hide edit and show add frame
        $('.addform-group').css('display','inline');
        $('.editform-group').css('display','none');

        markActive();
});

const checkMinFormat = (noticeMin) => {
    //alert(noticeMin);
    var res = noticeMin.split(":");
    const n = res[1].length;
    if(n == 0){ return (noticeMin + ":00"); }
    else if(n == 1){ return (res[0] + ":" + res[1] + "0"); } 
    else if(n > 2){ return (res[0] + ":" + res[1].substr(0, 2)); }  
    
    return noticeMin;
}

const editNoticeFailed = () => {
    alert('Fail editing notice');
};
const displayEditNotice = (notice) => { 
    //alert('Success editing!');
      
    const id = notice.id;
    const text = notice.text;
    var start = notice.start; //time from db in format YYYY-MM-DD hh:mm:ss, we need hh:mm only
    var arr = start.split(":");
    start = arr[0] + ":" + arr[1]; //just hh:mm
    var end = notice.end;
    arr = end.split(":");
    end = arr[0] + ":" + arr[1]; //just hh:mm

    //put data into proper place by id
    $(`.content-notice__list[id=${id}] .noticetext p`).text(text);
    $(`.content-notice__list[id=${id}] .noticestart p`).text("Start: " + start);
    $(`.content-notice__list[id=${id}] .noticeend p`).text("End: " + end);
};

// edit/delete notice
$('.content .content-notice__list button').on('click', function() {
    const id = $(this).attr('data-id');
    const name = $(this).attr('name');
    //in every notice record there are two buttons 
    if(name == "Edit"){// edit button pressed
       //hide add form and show edit, save id value
        $('.addform-group').css('display','none');
        $('.editform-group').css('display','inline');
        $('.editform-group input[name ="noticeID"]').val(id);
       
        $('.content-notice button').prop('disabled', true); //disable all Delete/Edit buttons until Save/Cancel pressed

       //read values from editing notice
        var textcontent =$(this).closest('.content .content-notice__list').find('.noticetext').text().trim();
        var start =$(this).closest('.content .content-notice__list').find('.noticestart').text().replace("Start:", "").trim();
        var end =$(this).closest('.content .content-notice__list').find('.noticeend').text().replace("End:", "").trim();
        //put editing data into editing frame
        $('.editform-group .form-group input[name="text"]').val(textcontent);
        $('.editform-group .form-group input[name="start"]').val(start);
        $('.editform-group .form-group input[name="end"]').val(end);
    }
    else if(name == "Delete"){// Delete button pressed, send delete to midleware by id of record

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
    $(`.content-notice__list[id=${id}]`).remove();
};

const removeNoticeFailed = () => {
    alert('Fail deleting notice');
};

const markActive = () => {
    $('.content-notice__list .noticestart p').each((index, value) => {
        //alert( $(this).closest('.content .content-notice__list').find('.noticestart').text().replace("Start:", "").trim());
        alert( $(value).text().replace("Start:", "").trim() );
    });
        
};



