var buttonsList = [];
var allButtonElements = document.getElementsByClassName("drag_btn");
for(var i=0; i < allButtonElements.length; i++) {
	buttonsList.push(JSON.parse('{"keycode":"' + allButtonElements[i].id + '"}'));
}
//console.dir(buttonsList);


//Load saved custom layout configuration.
if(localStorage.getItem("button_layout")){
    buttonLayoutJson = JSON.parse( localStorage.getItem("button_layout") );
    for(var i=0; i < document.getElementsByClassName("drag_btn").length; i++) {
    	if(document.getElementsByClassName("drag_btn")[i] && buttonLayoutJson[i]) {
			document.getElementsByClassName("drag_btn")[i].setAttribute("data-row", buttonLayoutJson[i].row);
			document.getElementsByClassName("drag_btn")[i].setAttribute("data-col", buttonLayoutJson[i].col);  
			document.getElementsByClassName("drag_btn")[i].setAttribute("swap", buttonLayoutJson[i].swap); 
		}
	}

	//Backup everything at/after length-7; create JSON string to be stored when saving in full mode.
	for(var i=buttonLayoutJson.length-7; i < buttonLayoutJson.length; i++) {
    	touchButtonLayoutJson.push(buttonLayoutJson[i]);
	}
	//console.dir(touchButtonLayoutJson);

	//console.dir(buttonLayoutJson);

	if(!isInFullTabMode) swapButtons();

} else buttonLayoutJson = JSON.parse( defaultButtonLayoutStr );

function swapButtons(){

	var mainBtnElementsToSwapHTML = "";
	var mainBtnElements = document.getElementById("main_button_list").getElementsByClassName("drag_btn");
	console.dir(mainBtnElements);
	for(var i=0 ; i < mainBtnElements.length ; i++) {

		//console.log(mainBtnElements[i].getAttribute("swap"));
		if(mainBtnElements[i].getAttribute("swap") == "true"){
			console.log(mainBtnElements[i].id);
			mainBtnElementsToSwapHTML = mainBtnElementsToSwapHTML + mainBtnElements[i].outerHTML;
			mainBtnElements[i].parentNode.removeChild(mainBtnElements[i]); i--;
		}
		
	}
	//console.log(mainBtnElementsToSwapHTML);
	

	var altBtnElementsToSwapHTML = "";
	var altButtonElements = document.getElementById("alt_button_list").getElementsByClassName("drag_btn");
	for(var i=0 ; i < altButtonElements.length ; i++) {

		if(altButtonElements[i].getAttribute("swap") == "true"){
			console.log(altButtonElements[i]);
			altBtnElementsToSwapHTML = altBtnElementsToSwapHTML + altButtonElements[i].outerHTML;
			altButtonElements[i].parentNode.removeChild(altButtonElements[i]); i--;
		}
		
	}
	//console.log(mainBtnElementsToSwapHTML);



	
	$("#main_button_list").append( altBtnElementsToSwapHTML );
	$("#alt_button_list").append( mainBtnElementsToSwapHTML );

}


function initFullTabMode(){

	//Shift positions to fit on fulltab mode.
	var mainButtonElements = document.getElementById("main_button_list").getElementsByClassName("drag_btn");
	for(var i=0 ; i < mainButtonElements.length ; i++) {
		var thisRow = parseInt(mainButtonElements[i].getAttribute("data-row")), thisCol = parseInt(mainButtonElements[i].getAttribute("data-col"));
		if(mainButtonElements[i].getAttribute("swap") == "true"){
			//console.log("!!");
			if(thisRow >= 1 && thisRow <= 2) {
	            mainButtonElements[i].setAttribute( "data-row", thisRow + 7  );
	        } else if(thisRow >= 3  && thisRow <= 5) {
	            mainButtonElements[i].setAttribute( "data-row", thisRow + 5  );
	            mainButtonElements[i].setAttribute( "data-col", thisCol + 5  );
	        } else if(thisRow >= 6 && thisRow <= 7) {
	            mainButtonElements[i].setAttribute( "data-row", thisRow + 2  );
	            mainButtonElements[i].setAttribute( "data-col", thisCol + 10 );
	        }
		}
		
	}

	var altButtonElements = document.getElementById("alt_button_list").getElementsByClassName("drag_btn");
	for(var i=0 ; i < altButtonElements.length ; i++) {
		var thisRow = parseInt(altButtonElements[i].getAttribute("data-row")), thisCol = parseInt(altButtonElements[i].getAttribute("data-col"));
		if(altButtonElements[i].getAttribute("swap") == "false"){
			if(thisRow >= 1 && thisRow <= 2) {
	            altButtonElements[i].setAttribute( "data-row", thisRow + 7  );
	        } else if(thisRow >= 3  && thisRow <= 5) {
	            altButtonElements[i].setAttribute( "data-row", thisRow + 5  );
	            altButtonElements[i].setAttribute( "data-col", thisCol + 5  );
	        } else if(thisRow >= 6 && thisRow <= 7) {
	            altButtonElements[i].setAttribute( "data-row", thisRow + 2  );
	            altButtonElements[i].setAttribute( "data-col", thisCol + 10 );
	        }
		}
		
	}
	
	$("#main_button_list").append( $("#alt_button_list").html() );
	$("#alt_button_list").html("");
	$('.touch_pad_filler').remove();
	$("#main_button_list").append( '<li data-row="1" data-col="6" data-sizex="10" data-sizey="7" class=" touch_pad_filler"><div id="keyboard_activity_indicator"></div></li>' );
	$("#main_button_list").append( '<li data-row="10" data-col="1"  data-sizex="5" data-sizey="1" class=" fiveByOneFiller"></li>' );
	$("#main_button_list").append( '<li data-row="10" data-col="11" data-sizex="5" data-sizey="1" class=" fiveByOneFiller"></li>' );
	
	var adBlockElementHtml = document.getElementById("ad_block_holder").outerHTML + "";
	$('#ad_block_holder').remove();
	$("#remote_button_panel_main").append(adBlockElementHtml);

	var optionsElementHtml = document.getElementById("options_panel_container").outerHTML + "";
	$('#options_panel_container').remove();
	$("#remote_button_panel_main").append(optionsElementHtml);
	
    $("#main_container").css("width","960px");
    $("#main_container").css("height","530px");

    $("#remote_button_panels").css("width","960px");
    $("#remote_button_panels").css("height","530px");

    $("#remote_button_panels").css("background-image",'url("images/bg_full_remote.png")');
    $("#remote_button_panels").css("background-size",'960px 530px');

    $("#settings_menu_panel").css("background-image",'none');
    $("#remote_button_panel_main").css("background-image",'none');
    $("#remote_button_panel_alt").css("background-image",'none');
    $("#remote_button_panel_touch").css("background-image",'none');

    $("#title_bar_container").css("width","960px");

    $("#title_bar_title").css("width","832px");
    $("#title_bar_title").text("full remote");

    $("#touch_pad_open_button").css("display","none");
    $("#alt_panel_button").css("display","none");

    $("#lock_mouse_button").css("display","block");

    $("#options_panel_container").css("left","640px");
    $("#options_panel_container").css("bottom","-432px");
    $("#options_panel_container").css("height","481px");

    $("#remote_button_panel_alt").css("display","none");

    $("#touch_button_list .remote_button").css("display","none");
    $("#touch_button_list .remote_button_rocker").css("display","none");

    $("#touch_button_list").css("width","640px");
    $("#touch_button_list").css("padding-top","49px");
    $("#touch_button_list .touch_pad_filler").css("width","639px");
    $("#touch_button_list .touch_pad_filler").css("height","335px");

    $('#touch_button_list').css("display","none");

    $("#remote_touch_pad").css("width","640px");
    $("#remote_touch_pad").css("height","336px");

    $("#remote_button_panel_main").css("width","960px");
    $("#remote_button_panel_main").css("height","482px");

    $("#main_button_list").css("border-right-width","1px");
    $("#main_button_list").css("width","959px");
    $("#main_button_list").css("height","480px");

    $(".touch_pad_filler ").css("background-position","160px 48px");
    $("#remote_button_panel_touch").css("width","640px");

    $("#full_mode_button").css("display","none");

    $(".options_tabs_bottom_filler").css("display","block");

    $("#mouse_lock_cover").css("width","960px");
    $("#mouse_lock_cover").css("height","530px");

    $("#mouse_lock_cover_label1").css("width","640px");
    $("#mouse_lock_cover_label1").css("top","105px");
    $("#mouse_lock_cover_label1").css("padding-left","320px");
    $("#mouse_lock_cover_label2").css("width","640px");
    $("#mouse_lock_cover_label2").css("top","320px");
    $("#mouse_lock_cover_label2").css("padding-left","320px");

    $("#lock_mouse_button").css("display","block");
} 

if(isInFullTabMode) { //IS FULL TAB MODE

	initFullTabMode();

	initGridster();

} else if(isInPopUpMode) { //IS POPUP MODE
	
} else { //IS MISC MODE
	
}

initDarkBackSetting();

