$(document).ready(function(){
	$('#js-select').on('change', function(e){
		e.preventDefault();
		$('.content').show();
		$('#js-tbody').html('');
		$.ajax({
			type: 'GET',
			url: 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json',
			success: function(data){
				thisData = data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
				$.each(thisData, function(i, item){
					result = '<tr><td>' + item.CaseTime + '</td><td><span class="btn btn-xs bg-primary">' + item.CaseLocationDistrict + '</span></td><td><a href="https://www.google.com.tw/maps/place/' + item.CaseLocationDescription + '" target="_blank";><span class="glyphicon glyphicon-map-marker"></span> ' + item.CaseLocationDescription + '</a></td><td>' + item.CaseDescription + '</td></tr>';
					allArea = '全區最新動態';
					if($('#js-select').val() === item.CaseLocationDistrict) {
						$('#js-tbody').append(result);
						$('label').text('');
					}
					else if($('#js-select').val() === '全區') {
						$('#js-tbody').append(result);
						$('label').text(allArea);
					}
				});
			}
		});
		var jsContent = $('#js-content').offset().top;
		$('html, body').animate({
			scrollTop: jsContent - 30
		}, 350);
		$('.gotop').click(function(){
			$('html, body').animate({
				scrollTop: 0
			}, 350);
		});
		$(window).scroll(function(){
			var top = $(window).scrollTop();
			if(top>0){
				$('.gotop').fadeIn(200);
			}
			else {
				$('.gotop').fadeOut(100);
			}
		});
	})
});