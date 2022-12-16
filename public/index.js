function generateBrandCheckboxList() {
    $.get(API_BASE + '/brand/all', function(res){
        let ht = '';
        $.each(res, function(i,x){
            ht += `<div class="form-check">
            <input class="form-check-input" type="checkbox" value="${x.id}" id="${x.brandName}">
            <label class="form-check-label" for="${x.brandName}">
             ${x.brandName}
            </label>
          </div>`;
        });
        $('#brands-sidebar').html(ht);
    }, 'json');
}

function listFilteredItems() {
    // collect filters

    // get data
    // list items
}

$(function(){
    generateBrandCheckboxList();
});