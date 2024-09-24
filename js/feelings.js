
$(document).ready(function () {
    const form = $("#feelings_form");
    form.submit(function (e) {
        e.preventDefault();
        const message = form.find('[name="message"]').val();
        const name = form.find('[name="name"]').val();
        const messageData = {
            message: message,
            name: name,
        };
        let feelingsDataArray = JSON.parse(localStorage.getItem("feelingsDataArray")) || [];
        feelingsDataArray.push(messageData);
        localStorage.setItem("feelingsDataArray", JSON.stringify(feelingsDataArray));
        window.location.href = "feelings_wall.html";
    });

    // display the stored data 
    const feelingsDataArray = JSON.parse(localStorage.getItem("feelingsDataArray"));
    if(feelingsDataArray &&  feelingsDataArray.length > 6){
        $('.feelings_wrapper').addClass('wrapper_height')
    }
    while (feelingsDataArray.length > 6 && feelingsDataArray.length % 3 !== 0) {
        const lastElement = feelingsDataArray[feelingsDataArray.length - 1];
        feelingsDataArray.push(lastElement);
    }
    if (feelingsDataArray && feelingsDataArray.length >= 0 && feelingsDataArray.length < 6 ) {
        $('.duplicate').hide();
    }
    else{
        $('.duplicate').show();
    }
    
    if (feelingsDataArray && feelingsDataArray.length > 0) {
        $.each(feelingsDataArray, function (index, messageData) {
            $('.feelings_container').append(
                `
                <div class="item">
                    <p class="msg_content"> ${messageData.message} </p>
                    <h5 class="sender">${messageData.name} </h5>
                </div>
                `
            )
        });
    }
    else {
        $('.feelings_wrapper').append(
            `
                <strong> There is no messages to show here ..  </strong>
            `
        )
    }


});

