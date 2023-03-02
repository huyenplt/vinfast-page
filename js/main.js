$(document).ready(function () {
  $(".owl-carousel-home").owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    dots: true,
    margin: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
      '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    ],
    responsiveClass: false,
  });

  $(".owl-carousel-vfe34").owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    dots: true,
    margin: 1,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
      '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    ],
    dotsContainer: "#carousel-custom-dots",
    responsiveClass: false,
  });

  $(".owl-dot").click(function () {
    $(".owl-carousel-vfe34").trigger("to.owl.carousel", [$(this).index(), 300]);
  });

  $(".owl-carousel-vfe34-slider").owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    dots: true,
    margin: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
      '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    ],
    responsiveClass: false,
  });
});

const formUrl = 'https://script.google.com/macros/s/AKfycbwTRT8nxJQl21jdpVappqizpGKoiApwV43l4Xsa8PDJRAyubDhjsxXBjp64tVuvqMJW7A/exec';

function submitContactForm(event) {
  event.preventDefault();

  var name = $('#contactForm #name')[0].value;
  var phone = $('#contactForm #phone')[0].value;
  var address = $('#contactForm #address')[0].value;
  var car = $('#contactForm #car-type')[0].value;
  var payment = $('#contactForm #check-payment input:checked').value;
  var inputTime = new Date(Date.now());

  var data = {
    "Form Type": "Liên hệ",
    "Customer Name": name,
    "Customer Phone": phone,
    "Customer Address": address,
    "Interested Car": car,
    "Payment Type": payment,
    "Register Time": inputTime
  };

  $.ajax({
    url: formUrl,
    method: "GET",
    dataType: "json",
    data: data,
    success: function (response, request) {
      $('#contactForm p.noti.success')[0].innerHTML = 'Bạn đã đăng ký thành công! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất';
    }
  });

}

function toggleSubmenu(e) {
  if (e.classList.contains("open")) {
    e.classList.remove("open");
  } else e.classList.add("open");
}

function toggleMiniMenu() {
  const navMini = $(".navbar-mini-block")[0];
  if (navMini.classList.contains("expand")) {
    navMini.classList.remove("expand");
  } else navMini.classList.add("expand");
}

document.addEventListener("DOMContentLoaded", function () {
  const elmnt = document.getElementById("vfe34-banner");
  if (elmnt !== null) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > elmnt.offsetHeight) {
        document.getElementById("navigation").classList.add("fixed-top");
      } else {
        document.getElementById("navigation").classList.remove("fixed-top");
      }
    });
  }
});

const carList = [
  {
    name: "vfe34",
    version: [
      {
        text: "Default",
        value: "default",
        prices: [510000000, 700000000],
      },
    ],
  },
  {
    name: "vf5",
    version: [
      {
        text: "Plus",
        value: "plus",
        prices: [438000000, 518000000],
      },
    ],
  },
  {
    name: "vf8",
    version: [
      {
        text: "Eco",
        value: "eco",
        prices: [907100000, 1309000000],
      },
      {
        text: "Plus",
        value: "plus",
        prices: [1087500000, 1489000000],
      },
    ],
  },
  {
    name: "vf9",
    version: [
      {
        text: "Eco",
        value: "eco",
        prices: [1139200000, 1720000000],
      },
      {
        text: "Plus",
        value: "plus",
        prices: [1321900000, 1928000000],
      },
    ],
  },
];

var carSelected = $("#productList")[0].value;
var verSelected = $("#editionList")[0].value;
var pinSelected = $("#includeBattery")[0].value;
var paymentSelected = $("#paymentAmount li.active").attr("data-amount");
var termSelected = $("#term li.active").attr("data-amount");
var iRateSelected = $("#bankList")[0].value;

// insert text
var paymentAmountEl = $("b[data-field='paymentAmount']")[0];
var loanAmountEl = $("b[data-field='loanAmount']")[0];
var interestAmountEl = $("b[data-field='interestPaymentByCustomer']")[0];
var totalEl = $("h4[data-field='total']")[0];


function handleChooseCar(carOption) {
  const car = carList.find((car) => car.name == carOption.value);

  var verCarEl = $("#editionList")[0];

  // clear old ver of car opts
  verCarEl.selectedIndex = 0;
  paymentAmountEl.innerHTML = "";

  loanAmountEl.innerHTML = "";
  interestAmountEl.innerHTML = "";
  totalEl.innerHTML = "";

  if (verCarEl.length != 1) {
    for (var i = verCarEl.length - 1; i > 0; i--) {
      verCarEl.remove(i);
    }
  }

  // add version car option
  car.version.forEach((version) => {
    var option = document.createElement("option");
    option.text = version.text;
    option.value = version.value;
    verCarEl.add(option);
  });

  // display left part and car image
  carImg = "./images/cost-" + car.name + ".png";

  const summary = $("#summary")[0];
  if (!summary.classList.contains("dataLoaded")) {
    summary.classList.add("dataLoaded");
  }
  $("#summary .product-img")[0].src = carImg;

  displayData();
}

function handleChooseVersion(e) {
  displayData();
}

function handleChoosePin(e) {
  displayData();
}

$("#term li").on("click", function (e) {
  const arr = $("#term li");
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains("active")) {
      arr[i].classList.remove("active");
    }
  }
  $(this)[0].classList.add("active");
  displayData();
});

$("#paymentAmount li").on("click", function (e) {
  const arr = $("#paymentAmount li");
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains("active")) {
      arr[i].classList.remove("active");
    }
  }
  $(this)[0].classList.add("active");

  paymentSelected = $(this).attr("data-amount");

    displayData();
});

function handleChooseBank(bankSelected) {
  const rate = formatRateString(bankSelected.value);


  $("#interestRate").attr("placeholder", rate);

  rateDisplayEl = $("b[data-field='interestRate']")[0];

  rateDisplayEl.innerHTML = rate;

  iRateSelected = $("#bankList")[0].value;
  displayData();
}

function displayPaymentnLoan() {
    const price = calPrice();

    const paymentAmount = price * paymentSelected;
    const loanAmount = price - paymentAmount;

    paymentAmountEl.innerHTML = formatMoneyString(paymentAmount);
    loanAmountEl.innerHTML = formatMoneyString(loanAmount);
}

function displayTotal() {
  var interestAmount = calculateCost();
    var total = interestAmount + calLoanAmount();
    interestAmountEl.innerHTML = formatMoneyString(interestAmount);
    totalEl.innerHTML = formatMoneyString(total);
}

function calPrice() {
  var price = 0;

  var car = carList.find((car) => car.name == carSelected);
  var type = car.version.find((ver) => ver.value == verSelected);

  if (pinSelected == 0) price = type.prices[0];
  else price = type.prices[1];

  return price;
}

function formatMoneyString(x) {
    x = Number(x).toFixed();
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
}

function formatMoneyStringNotVND(x) {
  x = Number(x).toFixed();
  x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  x = x.replace('-', '');
  return x;
}

function formatRateString(x) {
  x = x * 100;
  x = Number(x).toFixed(2);
  return x.toString(Number(x).toFixed(2)) + " %";
}

function calPaid() {
    const price = calPrice();
    const paymentAmount = price * paymentSelected;

    return paymentAmount;
}

function calLoanAmount () {
    const price = calPrice();
    const paymentAmount = price * paymentSelected;
    const loanAmount = price - paymentAmount;

    return loanAmount;
} 

function calculateCost() {
  let tienvay = calLoanAmount();
  let iRate = iRateSelected;
  let time = termSelected;

  let tongtienlai = 0;

  const traHangThang = tienvay / (time * 12);

  var table = document.getElementById("installmentTable");
  console.log(table.rows.length)
  if(table.rows.length > 1) {
    for (let i = table.rows.length-1 ; i > 0; i-- ) {
      table.deleteRow(i);
    }
  }

  for (let i = 1; i <= time * 12; i++) {
    const dunodauky = tienvay;
    const laithang = (tienvay * iRate) / 12;
    tongtienlai += laithang;

    const tongPhaiTra = laithang + traHangThang;
    tienvay = tienvay - traHangThang;

    displayTable(i, dunodauky, traHangThang, laithang, tongPhaiTra, tienvay);
  }
  return tongtienlai;
}

function displayData() {
  updateData();
  const priceEl = $("b[data-field='price']")[0];
  if (carSelected && verSelected && pinSelected) {
    const price = calPrice();
    priceEl.innerHTML = formatMoneyString(price);

    if (paymentSelected) {
        displayPaymentnLoan(paymentSelected);
    }

    if (iRateSelected && termSelected) {
        displayTotal();
    }
  } else priceEl.innerHTML = "";
}

function updateData() {
  carSelected = $("#productList")[0].value;
  verSelected = $("#editionList")[0].value;
  pinSelected = $("#includeBattery")[0].value;
  paymentSelected = $("#paymentAmount li.active").attr("data-amount");
  termSelected = $("#term li.active").attr("data-amount");
  iRateSelected = $("#bankList")[0].value;
}

function displayTable(paymentPeriod, openingBalance, principalPayment, interestPaymentByCustomer, totalAmount, closingBalance) {
  var table = document.getElementById("installmentTable");

  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  cell1.innerHTML = 'Tháng ' + paymentPeriod;
  cell2.innerHTML = formatMoneyStringNotVND(openingBalance);
  cell3.innerHTML = formatMoneyStringNotVND(principalPayment);
  cell4.innerHTML = formatMoneyStringNotVND(interestPaymentByCustomer);
  cell5.innerHTML = formatMoneyStringNotVND(totalAmount);
  cell6.innerHTML = formatMoneyStringNotVND(closingBalance);
}
