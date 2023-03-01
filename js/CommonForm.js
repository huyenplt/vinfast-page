const bookingModal = document.getElementById('bookingModal');
bookingModal.addEventListener('show.bs.modal', event => {
    $('#bookingModal p.noti.success')[0].innerHTML = '';
    $('#bookingForm #time')[0].value = '';
    $('#bookingForm #bookingName')[0].value = '';
    $('#bookingForm #bookingPhone')[0].value = '';
    $('#bookingForm #bookingEmail')[0].value = '';
    $('#bookingForm #bookingNote')[0].value = '';
  })

  const registerModal = document.getElementById('registerModal')
  registerModal.addEventListener('show.bs.modal', event => {
    $('#registerModal p.noti.success')[0].innerHTML = '';
    $('#registerForm #registerNname')[0].value = '';
    $('#registerForm #registerPhone')[0].value = '';
    $('#registerForm #registerEmail')[0].value = '';
    $('#registerForm #license')[0].value = '';
    $('#registerForm #registerNote')[0].value = '';
  })

  const buyModal = document.getElementById('buyModal')
  buyModal.addEventListener('show.bs.modal', event => {
     $('#buyForm #buyName')[0].value = ''
      $('#buyForm #buyPhone')[0].value = ''
      $('#buyForm #buyEmail')[0].value = ''
      $('#buyForm #buyNote')[0].value = ''
        $('#buyModal p.noti.success')[0].innerHTML = '';
  })

const formUrl = 'https://script.google.com/macros/s/AKfycbwTRT8nxJQl21jdpVappqizpGKoiApwV43l4Xsa8PDJRAyubDhjsxXBjp64tVuvqMJW7A/exec';

function submitBookingForm(event) {
  event.preventDefault();

  var place = $('#bookingForm #place')[0].value;
  var contentSelected = $('#bookingForm .form-check-input:checked');
  var content = '';
  if (contentSelected.length != 0) var content = contentSelected[0].value;
  if (contentSelected.length > 1) {
    for (var i = 1; i < contentSelected.length; i++) {
      content += ', ' + contentSelected[i].value;
    }
  }
  var time = $('#bookingForm #time')[0].value;
  var name = $('#bookingForm #bookingName')[0].value;
  var phone = $('#bookingForm #bookingPhone')[0].value;
  var email = $('#bookingForm #bookingEmail')[0].value;
  var note = $('#bookingForm #bookingNote')[0].value;
  var inputTime = new Date(Date.now());

  var data = {
    "Form Type": "Đặt lịch hẹn",
    "Customer Name": name,
    "Customer Phone": phone,
    "Customer Email": email, 
    "Consult Content": content,
    "Consult Place": place,
    "Booking Time": time,
    "Customer Note": note,
    "Register Time": inputTime
  };

  $.ajax({
    url: formUrl,
    method: "GET",
    dataType: "json",
    data: data,
    success: function (response, request) {
      $('#bookingForm p.noti.success')[0].innerHTML = 'Bạn đã đăng ký thành công! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất';
    }
  });
}

function submitBuyForm(event) {
  event.preventDefault();

  var name = $('#buyForm #buyName')[0].value;
  var phone = $('#buyForm #buyPhone')[0].value;
  var email = $('#buyForm #buyEmail')[0].value;
  var note = $('#buyForm #buyNote')[0].value;
  var inputTime = new Date(Date.now());

  var data = {
    "Form Type": "Đăng ký mua xe",
    "Customer Name": name,
    "Customer Phone": phone,
    "Customer Email": email, 
    "Customer Note": note,
    "Register Time": inputTime
  };

  $.ajax({
    url: formUrl,
    method: "GET",
    dataType: "json",
    data: data,
    success: function (response, request) {
      $('#buyForm p.noti.success')[0].innerHTML = 'Bạn đã đăng ký thành công! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất';
    }
  });

}

function submitRegisterForm(event) {
    event.preventDefault();
    console.log('sddd');
  
    var name = $('#registerForm #registerNname')[0].value;
    var phone = $('#registerForm #registerPhone')[0].value;
    var email = $('#registerForm #registerEmail')[0].value;
    var note = $('#registerForm #registerNote')[0].value;
    var license = $('#registerForm #license')[0].value;
    var inputTime = new Date(Date.now());
  
    var data = {
      "Form Type": "Đăng ký lái thử",
      "Customer Name": name,
      "Customer Phone": phone,
      "Customer Email": email,
      "Customer's License Status": license,
      "Customer Note": note,
      "Register Time": inputTime
    };
  
    $.ajax({
      url: formUrl,
      method: "GET",
      dataType: "json",
      data: data,
      success: function (response, request) {
        console.log('dsdsd');
        $('#registerForm p.noti.success')[0].innerHTML = 'Bạn đã đăng ký thành công! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất';
      }
    });
  
  }
