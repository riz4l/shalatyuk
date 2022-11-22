var jadwalShalat = {
	  url_kota : 'https://api.banghasan.com/sholat/format/json/kota',

	  init :function() { 
	  	jadwalShalat.display_ct();
	  	jadwalShalat.runPlaceholder();
	  	jadwalShalat.getKota();
	  	jadwalShalat.getShalat(667, this.getToday());
	  	jadwalShalat.onChange();

	  	var date = new Date();
        var fullYear = date.getFullYear();
        document.getElementById('year').innerText = fullYear;
	  },

	  getKota : function() {
	  	var xhr = new XMLHttpRequest;
	  	const selectKota = document.getElementById('kota');

	  	xhr.onreadystatechange = function() {
	  		if(this.readyState == 4 && this.status == 200) {
	  			var data = JSON.parse(this.responseText);
	  			var kota = data.kota;
	  			for(let i = selectKota.length; i < kota.length; i++){
	  				selectKota.innerHTML += '<option value="'+kota[i].id+'" '+jadwalShalat.setSelected(kota[i].id)+' >' + kota[i].nama + '</option>';
	  			}
	  		}
	  	}

	  	xhr.open('GET', this.url_kota, true);
	  	xhr.send();
	  },

	  getShalat : function(k, t)
	  {
	  	var url = `https://api.banghasan.com/sholat/format/json/jadwal/kota/${k}/tanggal/${t}`;
	  	var xhr = new XMLHttpRequest();

	  	xhr.onreadystatechange = function() {
	  		if(this.readyState == 4 && this.status == 200) {
	  			var data = JSON.parse(this.responseText);
	  			var jadwal = data.jadwal.data;
	  			jadwalShalat.blockJadwal(jadwal);
	  		}
	  	}

	  	xhr.open('GET', url, true);
	  	xhr.send();
	  },

	  onChange : function () {
	  	const selectKota = document.getElementById('kota');
	  	selectKota.addEventListener('change', function(e) {
	  		$('#jadwal td').css({'background-color':'#198754', 'color':'white'});
	  		jadwalShalat.getShalat(e.target.value, jadwalShalat.getToday());
	  	});
	  },

	  setSelected : function(v) {
	  	if (v == 667) {
	  		return 'selected';
	  	}
	  	return '';	
	  },

	  getToday : function() {
	  	var dateObj = new Date();
		var month = '' + (dateObj.getMonth() + 1); //months from 1-12
		var day = '' + dateObj.getDate();
		var year = dateObj.getFullYear();

		if (month.length < 2) 
	        month = '0' + month;
	    if (day.length < 2) 
	        day = '0' + day;

		return newdate = [year, month, day].join('-');
	
	  },

	  blockJadwal : function(v) {
  		const tableJadwal = document.getElementById('jadwal');
	  	var html = `
	  			<td>${v.subuh}</td>
	  			<td class="terbit">${v.terbit}</td>
	  			<td>${v.dhuha}</td>
	  			<td>${v.dzuhur}</td>
	  			<td>${v.ashar}</td>
	  			<td>${v.maghrib}</td>
	  			<td>${v.isya}</td>
	  	`;
	  	return tableJadwal.innerHTML = html;
	  },

	  showPlaceholder : function()
	  {
	  	$('.select-kota').hide();
	  	$('.table-shalat').hide();
		$('.sy-placeholder').show();
	  	return new Promise((resolve, reject) => {
	  		setTimeout(() => {
				resolve($('.sy-placeholder').remove());
			}, 3000)
	  	})
	  },

	  runPlaceholder : async function(){
	  	await jadwalShalat.showPlaceholder();
	  	$('.select-kota').show();
	  	$('.table-shalat').show();
	  },

	  display_c : function() {
		var refresh=1000; // Refresh rate in milli seconds
		mytime=setTimeout('jadwalShalat.display_ct()',refresh)
	  },

	  display_ct: function()
	  {
		var x = new Date()
		var x1=x.getMonth() + 1+ "/" + x.getDate() + "/" + x.getFullYear(); 
		x1 = x1 + " - " +  x.getHours( )+ ":" +  (x.getMinutes()<10?'0':'') + x.getMinutes()  + ":" +  x.getSeconds();
		document.getElementById('ct').innerHTML = x1;
		jadwalShalat.display_c();
	}
}
$(function(){
	jadwalShalat.init();
})
