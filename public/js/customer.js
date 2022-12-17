var API_BASE = 'http://localhost:8080/api/';
$( document ).ready(function() {
   getAll();
});

function getAll() {
    $.get(API_BASE+"customer/all", function(data, status){
        var employee_data='';
        $.each(data,function(key,value){
            employee_data +='<tr>';
            employee_data +='<td>'+value.firstName+'</td>';
            employee_data +='<td>'+value.contactNo+'</td>';
            employee_data +='<td>'+value.email+'</td>';
            employee_data +='<td> <button class="btn btn-danger btn-sm" onclick="removeItem('+ value.id +')" > Remove </button> </td>';
            employee_data +='<tr>';
          });

          $('#data-table').append(employee_data);

      });

}

function removeItem(value) {
 
    if (confirm("Do you want to delete this reocord ?")) {
        $.ajax({
            url:API_BASE + '/customer/delete/'+value,
            type:"POST",
            contentType:"application/json; charset=utf-8",
    
            success: function(msg){
             
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