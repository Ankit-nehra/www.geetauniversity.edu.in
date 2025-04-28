var htable ;
if($("#hiring_datatable").length > 0) {
    htable = $('#hiring_datatable').DataTable({
        processing: true,
        serverSide: true,
	retrieve: true,
        ajax: {
            url: base_url+"hiring-list-ajax",
            data: function(d) {
                d.myKey = "myValue";
            }
        }
    });
  }

if($("#interviewer_datatable").length > 0) {
    $('#interviewer_datatable').DataTable({
        processing: true,
        serverSide: true,
	retrieve: true,
        ajax: {
            url: base_url+"interviewer-list-ajax",
            data: function(d) {
                d.myKey = "myValue";
            }
        }
    });
}

if($("#placement_datatable").length > 0) {
    $('#placement_datatable').DataTable({
        processing: true,
        serverSide: true,
	retrieve: true,
        ajax: {
            url: base_url+"placements-list-ajax",
            data: function(d) {
                d.myKey = "myValue";
            }
        }
    });
}

$(document).on('click','.get-round-form',function(){
   $.get(base_url+"hiring-round-form/"+$(this).attr('data-id'),{idx:0},function(c){
     if(c){
	$('.round-form').find('.card-body').append(c);
	$('.js-example-basic-multiple').select2(
	{
		dropdownParent: $(".round-form"),
		placeholder: "Select please",
	});
     }
   });
});

$(document).on('click','.remove-round',function(){
  var parent = $(this).parents(".round");
  var hiringid = $('input[name="hiring_id"]').val();
  var round = parent.find('input[name="round_name[]"]').val();
  $.get(base_url+"hiring-remove-round",{'hiringid':hiringid,'round':round},function(c){
     	if(c){
	   parent.remove();
	}
  });
});

$(document).on('input','input[name="round_name[]"]',function(){
  var parent = $(this).parents(".round");
  var fty = $(this).val().trim().split(' ').join('_');
  parent.find('select').attr('name','rounds['+fty+'][]');
});

$(document).on('change','.hr_status_options',function(){
  var parent = $(this).attr("data-row");
   $.get(base_url+'update-hiring-status',{'id':parent,'sid':$(this).val()},function(c){
   	if(c){
	  window.htable.draw();
	}
   });
});