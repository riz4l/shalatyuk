var jadwalShalat = {
	  url_kota : 'https://api.banghasan.com/sholat/format/json/kota',

	  init :function() { 
	  	jadwalShalat.getKota();
	  	jadwalShalat.getShalat(this.getToday());
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

	  getShalat : function(v)
	  {
	  	var url = `https://api.banghasan.com/sholat/format/json/jadwal/kota/667/tanggal/${v}`;
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
	  			<td>${v.tanggal}</td>
	  			<td>${v.subuh}</td>
	  			<td>${v.terbit}</td>
	  			<td>${v.dhuha}</td>
	  			<td>${v.dzuhur}</td>
	  			<td>${v.ashar}</td>
	  			<td>${v.maghrib}</td>
	  			<td>${v.isya}</td>
	  	`;
	  	return tableJadwal.innerHTML = html;
	  }
}

jadwalShalat.init();