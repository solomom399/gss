$(document).ready(function () {

	var GSS = function () {
		
		this.displayStudentDetails = function () {
			var student_details_object = JSON.parse(localStorage.getItem('student_details'))
			$('.name').html('<i class="ti-user"></i> '+student_details_object.surname+" "+student_details_object.firstname)
			
			if (student_details_object.gender == 'm') {
				$(".profile_image").attr('src', '../img/profile_male.png')
			} else if (student_details_object.gender == 'f') {
				$(".profile_image").attr('src', '../img/profile_female.png')
			}
		}

		this.load = function (text) {
			swal({
				title: '<div class="preloader-wrapper small active">'+
					    '<div class="spinner-layer spinner-red-only">'+
					      '<div class="circle-clipper left">'+
					        '<div class="circle"></div>'+
					      '</div><div class="gap-patch">'+
					        '<div class="circle"></div>'+
					      '</div><div class="circle-clipper right">'+
					        '<div class="circle"></div>'+
					      '</div>'+
					    '</div>'+
					  '</div>',
				text: text,
				html: true,
				showConfirmButton : false
			})
		}


		this.onBackKeyDown = function (e) {
			e.preventDefault();
		    var conf = confirm("Are you sure you want to exit this app")
		    if(conf){
		        navigator.app.exitApp();
		    } else {
		        alert('Enjoy yourself!');
		    }
		}


		this.success = function (text, callback) {
			swal({
				title: '',
				text: '<p>'+text+'</p>',
				html: true,
				type: 'success',
				confirmButtonClass : 'btn red darken-4'
			},
			function () {
		        callback()
		    })
		}


		this.warn = function (text, callback) {
			swal({
				title: '',
				text: '<p>'+text+'</p>',
				html: true,
				type: 'warning',
				confirmButtonClass : 'btn red darken-4'
			},
			function () {
		        callback()
		    })
		}
	}
	


	var gss = new GSS()

	

	$(".hundred").css({
		'min-height': $(window).height()
	})

	document.addEventListener("backbutton", gss.onBackKeyDown, false);

	$(".show-load").on('click', function () {
		gss.load('Please wait...')
		$(".show-load").on('shown.bs.tab', function(event){
			swal.close()
		})
	})


	$("#register_form").on('submit', function () {
		gss.load('Please wait...')
		var surname = $('input[name=surname]').val()
		var firstname = $('input[name=firstname]').val()
		var s_class = $('input[name=s_class]').val()
		var username = $('input[name=r_username]').val()
		var password = $('input[name=r_password]').val()
		var gender = $('select[name=gender]').val()


		var student_details = {
			'surname': surname,
			'firstname': firstname,
			's_class': s_class,
			'username': username,
			'password': password,
			'gender': gender
		}

		localStorage.setItem("student_details", JSON.stringify(student_details))
		
		gss.success('You have successfully registered...click ok to login', function () {
			$(".point-to-login").trigger('click')
		})

		return false
	})


	$("#login_form").on('submit', function () {
		var username = $("input[name=username]").val()
		var password = $("input[name=password]").val()
		gss.load('Please wait...')
		if (localStorage.getItem('student_details') != null) {
			var student_details_object = JSON.parse(localStorage.getItem('student_details'))
			if (username == student_details_object.username && password == student_details_object.password) {
				localStorage.setItem("user_status", 'logged_in')
				window.location = 'data/index.html'
			} else {
				gss.warn('Invalid login details', function () {
					swal.close()
				})
			}
			
		}
		return false
	})


	$('.button-collapse').sideNav({
	      	menuWidth: 300, // Default is 300
	      	edge: 'left', // Choose the horizontal origin
	      	closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
	      	draggable: true
	    }
	);

	$('#tabs-swipe-demo').tabs({ 'swipeable': true });


	$(function () {
		setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
	});


	$(".logout").on('click', function () {
		gss.load('Logging out...')
		localStorage.removeItem('user_status')
		location.reload(true)
		return false
	})

	if (localStorage.getItem('user_status') != null) {
		gss.displayStudentDetails()
	}
})