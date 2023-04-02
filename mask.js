$(function() {
	function runOperation() {
		$(".byte1 .circle").each(function(){
			// Get bit for current circle
			var bitIndex = $(this).attr("bit");
			// Get bit value for current circle - boolean
			var bitValue1 = $(this).attr("bit-value");
			// For each circle in input 2, remove inactive class
			// Get bit value for same child in input 2 - boolean
			var bitValue2 = $(".byte2 .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").removeClass("inactive").attr("bit-value");
		//AND Operator
			if($(".operations .operation.and").hasClass("selected")){
				if(bitValue1 == "true" && bitValue2 == "true" ){
					$(".result .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").css({"background-color":"white"});
				} else{
					$(".result .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").css({"background-color":"transparent"});
				}
			} else if($(".operations .operation.or").hasClass("selected")){
				//OR
				if(bitValue1 == "true" || bitValue2 == "true" ){
					$(".result .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").css({"background-color":"white"});
			} else{
				$(".result .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").css({"background-color":"transparent"});
			}
			} else if($(".operations .operation.xor").hasClass("selected")){
				// XOR
				if(bitValue1 != bitValue2 ){
					$(".result .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").css({"background-color":"white"});
				} else{
					$(".result .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").css({"background-color":"transparent"});
				}
			} else if($(".operations .operation.not").hasClass("selected")){
				// NOT
				// Make all input 2 circles inactive and set bit-value to false
				$(".byte2 .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").removeClass("active-circle").attr("bit-value", "false").addClass("inactive");
				if(bitValue1 != "true"){
					$(".result .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").css({"background-color":"white"});
				}else{
					$(".result .circle:nth-child(" + (Number(bitIndex)+1).toString() + ")").css({"background-color":"transparent"});
				}
			}
			//Update explaination
			$(".explanation").html($(".operations .operation.selected").attr("explain-text"));
	});
	}

	$(".circle").on("click",function(){
		if($(this).hasClass("active-circle")){
			$(this).removeClass("active-circle");
			$(this).attr({"bit-value":"false"});
		} else{
			$(this).addClass("active-circle");
			$(this).attr({"bit-value":"true"})
		}
		runOperation();
	});

	$(".operation").on("click",function(){
			$(".operation").each(function(){
				$(this).removeClass("selected");
			});
			$(this).addClass("selected");
			runOperation();
	});
	// Dark mode and light mode
	var icon = document.getElementById("icon");
	$(icon).on("click", function() {
		document.body.classList.toggle("dark-theme");
		if(document.body.classList.contains("dark-theme")) {
			$(icon).attr("src", "images/light-mode.png");
		} else {
			$(icon).attr("src", "images/dark-mode.png");
		}
		//document.body.classList.toggle(".dark-theme");
		runOperation();
	});
	runOperation();
});
