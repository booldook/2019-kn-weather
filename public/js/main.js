// 02efdd64bdc14b279bc91d9247db4722
// https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=02efdd64bdc14b279bc91d9247db4722&units=metric
// https://api.openweathermap.org/data/2.5/forecast?id=1835848&appid=02efdd64bdc14b279bc91d9247db4722&units=metric

var apiURL = "https://api.openweathermap.org/data/2.5/";
var appid = "02efdd64bdc14b279bc91d9247db4722";
var units = "metric";
var files = ["weather", "forecast"];
var option = {
  appid: appid,
  units: units
};

// modal init
cityInit();
function cityInit() {
  $("#modal").show();
  $.ajax({
    type: "get",
    url: "../json/city.json",
    dataType: "json",
    success: function (data) {
      var html = '<option value="">도시를 선택하세요.</option>';
      for(var i in data.cities) {
        html += '<option value="'+data.cities[i].id+'">';
        html += data.cities[i].name+' ['+data.cities[i].id+']</option>';
      }
      $("#city").html(html);
    }
  });
}


$(".nav").click(function(){
  var n = $(this).index();
  $(".nav").css({
    "color":"#222", 
    "border-top":"5px solid #fff",
    "border-right":"5px solid #fff",
    "border-left":"5px solid #fff",
    "z-index":10
  });
  $(this).css({
    "color":"#03f", 
    "border-top":"5px solid #666",
    "border-right":"5px solid #666",
    "border-left":"5px solid #666",
    "z-index":100
  });
  $(".cont").hide();
  $(".cont").eq(n).show();
});
$(".nav").eq(0).trigger("click");

$("#city").change(function(){
  option.id = $(this).val();
  var sendData = {
    type: "get",
    dataType: "json",
    data: option,
  }
  sendData.url = apiURL + files[0];
  sendData.success = dailyInit;
  $.ajax(sendData);
  sendData.url = apiURL + files[1];
  sendData.success = weeklyInit;
  $.ajax(sendData);
});
function dailyInit(data) {
  console.log(data);
  $("#modal").hide();
  var $daily = $("#daily");
  var src = "../img/icon/"+data.weather[0].icon+".png";
  var temp = data.main.temp+" ℃";
  var temp2 = data.main.temp_max+" ℃ / "+data.main.temp_min+" ℃ / "
  var html = '';
  html += '<ul>';
  html += '<li class="icon"><img src="'+src+'" class="img"></li>';
  html += '<li class="city_name">'+$("#city > option:selected").text()+'</li>';
  html += '<li class="w3-center"><button class="w3-button w3-indigo" onclick="cityInit();">도시선택</button></li>';
  html += '<li class="temp">현재평균온도: <b class="w3-text-indigo">'+temp+'</b></li>';
  html += '<li class="temp2">최고/최저온도: <b class="w3-text-indigo">'+temp2+'</b></li>';
  html += '</ul>';
  $daily.html(html);
}

function weeklyInit(data) {
  console.log(data);
  $("#modal").hide();
  var src, temp, temp2, date;
  var $weekly = $("#weekly");
  var html = '<div>';
  for(var i in data.list) {
    src = "../img/icon/"+data.list[i].weather[0].icon+".png";
    date = data.list[i].dt_txt;
    temp = data.list[i].main.temp+" ℃";
    temp2 = data.list[i].main.temp_max+" ℃ / "+data.list[i].main.temp_min+" ℃"
    html += '<ul class="clear">';
    html += ' <li class="icon"><img src="'+src+'" class="img"></li>';
    html += ' <li class="content">';
    html += '   <div>예보날짜: '+date+'</div>';
    html += '   <div>현재온도: '+temp+'</div>';
    html += '   <div>최고/최저온도: '+temp2+'</div>';
    html += ' </li>';
    html += '</ul>';
  }
  html += '</div>';
  $weekly.html(html);
}

