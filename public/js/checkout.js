$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var token = '';
    var current_page = 1;
    login();
    var last_page = 0; var action = 'inactive';
    var height = $(document).height();
    
        $(window).scroll(function(){
            if(($(window).scrollTop() + $(window).height()) > height && action == 'inactive' && token != ''){
                if(last_page > current_page){
                    current_page++;
                    load_record(current_page);
                }else{
                    action = "done";
                    $('#load_data_message').html("We don't have more data to display :(");
                }
            }
        });
    
    // Login Function Start
    function login(){
        $.ajax({
            type: "POST",
            url: ENDPOINT + "/api/v1/login",
            headers: {'Accept': 'application/json'},
            data: {
                'email':'Tarun@gmail.com',
                'password':'abc123'
            },
            beforeSend: function () {
                
            },
            success:function (response){
                token = response['success']['token'];
                if(token != ''){
                    load_record(current_page);
                }else{
                    $('#load_data_message').html("Unauthorised Access");
                    return;
                }
            },
            complete: function(xhr) {
                if(xhr.status == 401){
                    $('.auto-load').hide();
                    $('#load_data_message').html("Unauthorised Access");
                }
            } 
            
        }).fail(function (jqXHR, ajaxOptions, thrownError) {
            $('.auto-load').hide();
            console.log('Server error occured');
        });
    }
    // Login Function End


    // Load Record Start
    function load_record(current_page){
        action = "active";
        $.ajax({
            type: "POST",
            url: ENDPOINT + "/api/v1/show-record?page="+current_page,
            headers: {'Authorization': 'Bearer '+token},
            beforeSend: function () {
                $('.auto-load').show();
            },
            success:function (response){
                if (response['result'].length == 0) {
                    action = "done";
                    $('#load_data_message').html("We don't have more data to display :(");
                    return;
                }
                $('.auto-load').hide();
                $('#load_data_body').append(response['result']);
                last_page = response['last_page'];
                action = "inactive";
            },
            complete: function(xhr) {
                if(xhr.status == 401){
                    $('.auto-load').hide();
                    $('#load_data_message').html("Unauthorised Access");
                }
            }
            
        }).fail(function (jqXHR, ajaxOptions, thrownError) {
            $('.auto-load').hide();
            console.log('Server error occured');
        });
    }
    // Load Record end
        
    
});