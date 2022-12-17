

var API_BASE = 'http://localhost:8080/api/';
var records = [];
var record = {
    id: 0,
    firstName:'',
    lastname:'',
    contactNo:'',
    email:'',

};
$( document ).ready(function() {

    getAll();
     
});

function getAll() {

    $.get(API_BASE+"adminuser/all", function(data, status){
        $('#data-table tbody').html('');
        records = data;
        console.log(data);
        var employee_data='';
        $.each(data,function(key,value){
            employee_data +='<tr>';
            employee_data +='<td>'+value.firstName  + '</td>';
            employee_data +='<td>'+value.lastname  + '</td>';
            employee_data +='<td>'+value.contactNo+'</td>';
            employee_data +='<td>'+value.email+'</td>';
            employee_data +='<td> <button class="btn btn-danger btn-sm" id="btnselect" onclick="selectItem('+ value.id +')" > Select </button>  <button class="btn btn-danger btn-sm" onclick="removeItem('+ value.id +')"  > Remove </button> </td>';
            employee_data +='<tr>';
          });

          $('#data-table').append(employee_data);

      });
}

function selectItem(value) {
 
     record = records.find(f=> f.id == value);
     setrecodValue();
    console.log(record);
   
}

function removeItem(value) {
 
    if (confirm("Do you want to delete this reocord ?")) {
        $.ajax({
            url:API_BASE + '/adminuser/delete/'+value,
            type:"POST",
            contentType:"application/json; charset=utf-8",
    
            success: function(msg){
              resetData();
              setrecodValue();
              getAll();
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
             alert("some error",);
          }
            
          });
      } else {
        
      }

   
  
}

function setrecodValue() {
    $(firstName).val(record.firstName);
    $(lastName).val(record.lastname);
    $(contactNo).val(record.contactNo);
    $(email).val(record.email);
}

function resetData() {
    record = {
        id: 0,
        firstName:'',
        lastname:'',
        contactNo:'',
        email:'',
    
    };
}

$('#cancelButton').click(function() {
    console.log("Janka");
    resetData();
    setrecodValue();
});


$('#saveButton').click(function() {
    
    record.firstName=$('#firstName').val();
    record.lastname=$('#lastName').val();
    record.contactNo=$('#contactNo').val();
    record.email=$('#email').val();


    var password =$('#password').val();
    var cpassword =$('#confirmPassword').val();

    if(!record.firstName || !record.lastname || !record.contactNo || !record.email) {
        alert("Please specify mandotory fields");
        return;
    } else if(record.id == 0  && (!password)) {
        alert("Please specify password");
        return;
    } else if(password != cpassword) {
        alert("password mismatched");
        return;
    }

    $.ajax({
        url:API_BASE + '/adminuser/save',
        type:"POST",
        data: JSON.stringify(record) ,
        contentType:"application/json; charset=utf-8",

        success: function(msg){
          resetData();
          setrecodValue();
          getAll();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
         alert("some error",);
      }
        
      });

     
    // $.post(API_BASE + '/adminuser/save', record, function (e) {
    //     console.log(e);
    // }, 'json');

});

