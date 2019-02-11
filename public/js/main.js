// 02efdd64bdc14b279bc91d9247db4722
// https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=02efdd64bdc14b279bc91d9247db4722&units=metric
// https://api.openweathermap.org/data/2.5/forecast?id=1835848&appid=02efdd64bdc14b279bc91d9247db4722&units=metric

var apiURL = "https://api.openweathermap.org/data/2.5/";
var appid = "02efdd64bdc14b279bc91d9247db4722";
var units = "metric";
var files = ["weather", "forecast"];

// modal init
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

