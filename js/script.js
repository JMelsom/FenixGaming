// JavaScript Document
$(document).ready(function(e) {
	$('html').addClass('js');
	
	var $slideshow = $('#slideshow'),
		$slides = $slideshow.find('#slides'),
		$slidenav = $slideshow.find('#slideshowdots'),
		slidelength = $slides.find('li').length,
		$leftarrow = $slideshow.find('#leftarrow'),
		$rightarrow = $slideshow.find('#rightarrow'),
		currentslide = 1,
		nextslide = 1;
		
		$slides.find('li').css({'position':'absolute'});
		$slides.find('li h1').css({'top':'-500px','opacity':0});
		$slides.find('li p').css({'bottom':'-100px','opacity':0});
		$slides.find('li figure').css({'right':'500px','opacity':0});
	
		$slides.find('#slide-'+currentslide+' figure').animate({opacity:1, top:0}, 500);
		$slides.find('#slide-'+currentslide+' h1').delay(500).animate({opacity:1, top:0, left:0}, 500);
		$slides.find('#slide-'+currentslide+' p').delay(1000).animate({opacity:1, left:0, bottom:0}, 500);
		
		//On Slide Nav Click
		$slidenav.on('click', 'a', function(e){
			e.preventDefault();
			var slidenum = $(this).attr('href');
			slidenum = slidenum.substring(7, slidenum.length);
			nextslide = Number(slidenum);
			nextSlide(currentslide, nextslide);
			currentslide = nextslide;
			clearInterval(slideinterval);
			slideinterval = setInterval(theinterval, 8000);
		});
		

	//Next & Prev
		$rightarrow.on('click', function(e){
			e.preventDefault();
			if(currentslide == 3) {
				nextslide = 1;
			} else {
				nextslide ++;
			}
			nextSlide(currentslide, nextslide);
			currentslide = nextslide;
			clearInterval(slideinterval);
			slideinterval = setInterval(theinterval, 8000);
		});
		$leftarrow.on('click', function(e){
			e.preventDefault();
			if(currentslide == 1) {
				nextslide = 3;
			} else {
				nextslide --;
			}
			nextSlide(currentslide, nextslide);
			currentslide = nextslide;
			clearInterval(slideinterval);
			slideinterval = setInterval(theinterval, 8000);
		});
	
	
	//Rim Slide show on timer
	slideinterval = setInterval(theinterval, 8000);
	
	function theinterval(){
		if(currentslide < slidelength){
			nextslide++;
		} else {
			nextslide = 1;
		}
		
		nextSlide(currentslide, nextslide);
		
		if(currentslide < slidelength){
			currentslide++;
		} else {
			currentslide = 1;
		}
	}
	
	//Next Slide Function
	function nextSlide(aniout, aniin){
		
		$slides.find('#slide-'+aniout+' figure').animate({opacity:0, right:'-500px'}, 500);
		$slides.find('#slide-'+aniout+' h1').delay(500).animate({opacity:0, bottom:'500px'}, 500);
		$slides.find('#slide-'+aniout+' p').delay(1000).animate({opacity:0, bottom:'-100px'}, 500, function(){

			//Animate Complete, Animate Next Slide
		$slides.find('#slide-'+aniin+' figure').animate({opacity:1, right:0}, 500);
		$slides.find('#slide-'+aniin+' h1').delay(500).animate({opacity:1, top:0, left:0}, 500);
		$slides.find('#slide-'+aniin+' p').delay(1000).animate({opacity:1, left:0, bottom:0}, 500);
		});
	}
	
	///////////////////////////
	///////Gallery Filter//////
	///////////////////////////
	
	//On filter link click
	$('#gallery nav div').on('click', function(e){
		var cat = $(this).data('cat');
		if(cat != 'all'){
		$('.gallerypics[role=list]').find('li:not(.'+cat+')').fadeOut(500, function(){
		$('.gallerypics[role=list]').find('li.'+cat).fadeIn(500)});
		} else {
			$('.gallerypics[role=list] li').fadeIn(500);
		}
	});
	
	///////////////////////////
	////////Shadow Box/////////
	///////////////////////////
	
	if($('#fabbox').length < 1){
		$('body').append('<div id=fabbox style="display:none"><div id=close></div><div id=next></div><div id=prev></div><div id=image></div></div>');
	}
	
	
	$('#gallery').on('click', 'a', function(e){
		e.preventDefault();
		$('body').find('#fabbox').fadeIn(1000);
		
		var bigimg = $(this).attr('href');
		
		$('#gallery a.open').removeClass('open');
		$(this).addClass('open');
		
	
		$('body').find('#fabbox #image').html('<img src="'+bigimg+'">');
	});
	
	$('body').on('click', '#fabbox #close', function(e){
		e.preventDefault();
		$('body').find('#fabbox').fadeOut(1000);
	});
	
	$('body').on('click', '#fabbox #next', function(e){
		var nextel = $('.open').parent().next();
		if(nextel.length > 0){
			var nextimg = nextel.find('a').attr('href');
			nextel.find('a').addClass('next');
		} else {
			var nextimg = $('#gallery [role=list] li:first').find('a').attr('href');
			$('#gallery [role=list] li:first').find('a').addClass('next');
		}
		
		$('.open').removeClass('open');
		
		$('.next').addClass('open').removeClass('next');
		
		$('#fabbox #image img').attr('src', nextimg);
	});
	
	$('body').on('click', '#fabbox #prev', function(e){
		var prevel = $('.open').parent().prev();
		if(prevel.length > 0){
			var previmg = prevel.find('a').attr('href');
			prevel.find('a').addClass('prev');
		} else {
			var previmg = $('#gallery [role=list] li:last').find('a').attr('href');
			$('#gallery [role=list] li:last').find('a').addClass('prev');
		}
		
		$('.open').removeClass('open');
		
		$('.prev').addClass('open').removeClass('prev');
		
		$('#fabbox #image img').attr('src', previmg);
	});
});