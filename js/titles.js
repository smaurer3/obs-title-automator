var current_id = 0;

$(document).ready(function(){
	$("textarea").on('keypress keyup blur change', function (e) {
		_get(this);	
	});
		
});

document.onkeydown = function(e) {
    switch(e.which) {

        case 38: // up
		if (current_id == 0) {break;}
		current_id--
		data = $("#"+ current_id).html();
		to_vmix(data, $("#"+ current_id))
		window.scrollBy(0, -1* $("#"+ current_id).height())
        break;

        case 40: // down
		current_id++
		data = $("#"+ current_id).html();
		to_vmix(data, $("#"+ current_id))
		window.scrollBy(0, $("#"+ current_id).height())	
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

function _get(el) {

	data = el.value;
	str = data.split(/(?:\r\n|\r|\n)/g);
	var main_heading = true;
	var first = true;
	var title_id = 0;
	var html = ""
	str.forEach(function (item,index) {
		if (item =="" && main_heading) {return}
		if (main_heading){
			title_id += 1;
			html += '<div class="border"><a id="' + title_id +'" class="title"><div class="edit main_heading p-2" contenteditable>' + item + '</div>';
			main_heading = false
		} else {
			html += '<div class="edit sub_heading p-2" contenteditable>' + item + '</div></a></div>';
			main_heading = true;
		}
	});

	$( "#result_area" ).html(html);
	
	$( ".title" ).on('click',function() {
		data = $(this).html();
		current_id = this.id;
		to_vmix(data, this)				
	});	

	$(".edit").on('keypress keyup blur change', function (e) {
		if (e.which == 38 || e.which == 40){
			return;
		} else {
			update($(this).parent().html());
		}	
	});
}


function to_vmix(data,el=null){

	var port = $("#vmix").val();
	var message = $("#message").val();
	var title = $("#title").val();

	update(data);
	
	if (el !== null ){
				$(".title").children('div').removeClass("bg-primary text-white");
				$(el).children('div').addClass("bg-primary text-white");
			}
}

function nthIndex(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}