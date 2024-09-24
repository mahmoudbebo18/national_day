
$(document).ready(function () {
    const form = $("#message_form");
    form.submit(function (e) {
        e.preventDefault();
        const message = form.find('[name="message"]').val();
        const name = form.find('[name="name"]').val();
        const messageData = {
            message: message,
            name: name,
        };
        let messageDataArray = JSON.parse(localStorage.getItem("messageDataArray")) || [];
        messageDataArray.push(messageData);
        localStorage.setItem("messageDataArray", JSON.stringify(messageDataArray));
        window.location.href = "display_wall.html";
    });

    // display the stored data 
    const messageDataArray = JSON.parse(localStorage.getItem("messageDataArray"));
    if(messageDataArray &&  messageDataArray.length > 6){
        $('.wall_wrapper').addClass('wrapper_height')
    }
    while (messageDataArray.length > 6 && messageDataArray.length % 3 !== 0) {
        const lastElement = messageDataArray[messageDataArray.length - 1];
        messageDataArray.push(lastElement);
    }
    if (messageDataArray && messageDataArray.length >= 0 && messageDataArray.length < 6) {
        $('.duplicate').hide();
    }
    else {
        $('.duplicate').show();
    }

    if (messageDataArray && messageDataArray.length > 0) {
        $.each(messageDataArray, function (index, messageData) {
            $('.wall_container').append(
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
        $('.wall_wrapper').append(
            `
                <strong> There is no messages to show here ..  </strong>
            `
        )
    }





});

