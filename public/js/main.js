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
  $.ajax({
    type: "get",
    url: apiURL + files[0],
    data: option,
    dataType: "json",
    success: dailyInit
  });
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
  html += '<li class="temp">현재평균온도: '+temp+'</li>';
  html += '<li class="temp2">최고/최저온도: '+temp2+'</li>';
  html += '</ul>';
  $daily.html(html);
}