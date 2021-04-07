//-----------------------------------------------------------------;
// REQUIRES;
//-----------------------------------------------------------------;
var fs = require('fs');
var execSync = require('child_process').execSync;
var iconv = require( "iconv-lite" );
var spawn = require('child_process').spawn;
//-----------------------------------------------------------------;
// CONST;
//-----------------------------------------------------------------;

global.CONST = {};
global.CONST.config = {};

global.CONST.config.brandNm = "varihope";
//global.CONST.config.brandNm = "wellderma";
//global.CONST.config.brandNm = "aheads";
//global.CONST.config.brandNm = "ashseven";
//global.CONST.config.brandNm = "bxxxy";
global.CONST.config.targetYear = "2021";
global.CONST.config.targetMonth = "03";
global.CONST.config.curPath = process.cwd().replace(/\\/gi,"/") + "/";
//-----------------------------------------------------------------;
// VARIABLE;
//-----------------------------------------------------------------;
//var a = execSync( 'start test.bat' );
//console.log( iconv.decode( a, 'EUC-KR').toString() )

//var exec = require('child_process').exec;
// 
//exec(  'start test.bat', function( err,stdout, stderr ){
//	if( err ) 
//	{
//		console.log('')
//		process.exit()
//	}
//	console.log( stdout )
//	process.exit();
//})

/*
 *
 */
var pad = function(n, width){
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};


var reportSourcePath = "D:/workspace_piel/marketing_report/brand/" + global.CONST.config.brandNm + "/"
var reportSourcefileNm = global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "_data.json"
var reportSourceThtmlFileNm = "./report.thtml";
var reportSource = fs.readFileSync( reportSourceThtmlFileNm ).toString();
var _data = fs.readFileSync( reportSourcePath + reportSourcefileNm ).toString();
var _o_data = JSON.parse( _data );

var bramdNms = {
	varihope : { 
		text : "VARI:HOPE"
		, imgPath : "https://cdn.imweb.me/thumbnail/20200626/dcfd77a936797.png" 
		, contract_range : [ 6,7,8,9,10,11,12,1,2,3 ]
	}
	, wellderma : { 
		text : "WELLDERMA"
		, imgPath : "https://cdn.imweb.me/thumbnail/20200824/0cab2a2be8769.png"
		, contract_range : [ 9,10,11,12,1,2 ]
	}
	, aheads : { 
		text : "AHEADS"
		, imgPath : "https://cdn.imweb.me/thumbnail/20201012/6c72b00ac8ea4.png"
		, contract_range : [ 10,11,12,1,2,3 ]
	}
	, ashseven : {
		text : "ashseven"
		, imgPath : "https://cdn.imweb.me/thumbnail/20201103/a39576bf72e6c.jpg"
		, contract_range : [ 11,12,1,2,3,4 ]
	}
	, bxxxy : {
		text : "bxxxy"
		, imgPath : "https://cdn.imweb.me/thumbnail/20201103/28686b8c52c16.jpg" 
		, contract_range : [ 11,12,1,2,3,4 ]
	}
};

var fileNms_A = [
	"chartdiv00"
	, "chartdiv01"
	, "chartdiv02"
	, "chartdiv03"
	, "chartdiv04"
	, "chartdiv07"
	, "chartdiv08"
	, "chartdiv09"
	, "chartdiv10"
	, "chartdiv11"
	, "chartdiv12"
	, "chartdiv13"
	, "chartdiv14"
	, "facebook_location"
];

var fileNms_O = {
      facebook_age_pie : { isExist : false, data : []	}
	, facebook_time_bar : { isExist : false, data : [] }
	, facebook_location_map : { isExist : false, data : [] }
	, google_time_bar : { isExist : false, data : [] }
	, google_age_pie : { isExist : false, data : [] }
};

var oldPath = "C:/Users/Administrator/Downloads/";
var savePath = global.CONST.config.curPath + "report/" + global.CONST.config.brandNm + "/" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "/";
var saveFileNm = "report_" + global.CONST.config.brandNm + "_" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 );
var desktopPath = "C:\\Users\\Administrator\\Desktop\\";

//-----------------------------------------------------------------;
// FUNCTIONS;
//-----------------------------------------------------------------;
/*
 *월간마케팅 현황
 */
var FN00 = function( d ){
	console.log( d )
	var title = "월간마케팅 현황"
	console.log( '[S] - FN00 - ' + title );
	var i = 0,iLen = d.length,io;

	var titleHtml = `
		<div class="align_center pad_20"><h2>${title}</h2></div>
	`
	var r = "";
		r += titleHtml;
		r += "<table id='monthly_stastic'>\n";
	for(;i<iLen;++i){
		io = d[ i ];
		var _html = "";
		if( i == 0 )
		{
			_html += "<thead>\n<tr>\n"
			io.forEach(function(d){ _html += "<th>" + d + "</th>\n"; });
			_html += "</tr>\n</thead>\n<tbody>\n"
		}
		else
		{
			_html += "<tr>\n";
			var chk_curMonth = bramdNms[ global.CONST.config.brandNm ].contract_range.indexOf( Number( global.CONST.config.targetMonth ) );
			var cnt = 0
			io.forEach(function(d){ 
				

				if( ( cnt - 2 ) <= chk_curMonth )
				{
					_html += "<td>" + d + "</td>\n";
				}
				else
				{
					_html += "<td></td>\n";
				}
				
				++cnt;

			});
			_html += "</tr>\n"
			
		}
		r += _html
	}
	r += "</tbody>\n</table>";

	console.log( '[E] - FN00 - ' + title );
	return r;
}

/*
      "리뷰":[
         {
            "월":"10",
            "구분":"페이스북그룹",
            "타입":"리뷰",
            "업데이트날짜":"2020-10-20",
            "제목":"Chả là cách đây khá lâu khoảng tầm 1 tháng thì phải mình thấy có 1 bạn review về cách skincare buổi trưa có sử dụng miếng tẩy trang con vịt màu vàng vàng. Lần đó là mình cũng mua dùng thử xem thì thấy rất là oke lah~ luôn nên tậu nguyên hộp về dùng. Mình nhớ giá là 400 mấy á.",
            "게시물타입":"Image",
            "이미지":"https://drive.google.com/drive/u/0/folders/1tb8qowLUjxcjJyqyvk8PtrcMw3WOHo_0",
            "해당링크":"https://www.facebook.com/groups/bimatevagr/permalink/3672680389410915/",
            "조회건수":"",
            "클릭률":"",
            "댓글수":"18",
            "좋아요":"24"
         },
*/

/*
 * 마케팅리스트 현황
 */
var FN01 = function( d ){
	var title = "마케팅집행리스트"
	console.log( '[S] - FN01 - ' + title );
	
	var r = "";
	var s,so;
	for( s in d ){
		so = d[ s ]
		var titleHtml = `
			<div class="align_center pad_20"><h2>${s}</h2></div>
		`
		r += titleHtml;
		r += "<table id='marketing_list'>\n";
		r += "<thead>\n<tr>\n"
		
		var headers = [ "구분", "타입", "업데이트날짜", "제목", "조회건수", "클릭률", "댓글수", "좋아요", "공유" ];
			headers.forEach(function(d){ r += "<th>" + d + "</th>\n"; });
		
		r += "</tr>\n</thead>\n<tbody>\n"
		
		var i = 0,iLen = so.length,io;
		for(;i<iLen;++i){
			io = so[ i ];

			r += "<tr>\n"
			headers.forEach(function(d){ 
				if( io[ d ] && io[ d ] != "0"  ) r += "<td>" + io[ d ] + "</td>\n";
				else r += "<td></td>\n";
			});
			r += "</tr>\n"

			r += "<tr style='border-bottom: 2px solid #000;'>\n"
			r += "<td colspan='2'>\n"
			r += "해당링크"
			r += "</td>\n"
			r += "<td colspan='7' style='word-break: break-all;'>\n"
			r += io[ "해당링크" ]
			r += "</td>\n"
			r += "</tr>\n"
				
		}
		r += "</tbody>\n</table>\n";
	}

	console.log( '[E] - FN01 - ' + title );
	return r;
}

/*
 * 광고집행내역통계
 */
var FN02 = function( d ){
	var title = "광고집행내역통계"
	console.log( '[S] - FN02 - ' + title );
	
	var r = "";
	var titleHtml = `
			<div class="align_center pad_20" style='clear:both;'><h2>${title}</h2></div>
		`
	r += titleHtml;
	r += "<table id='marketing_list_total'>\n";
	r += "<thead>\n<tr>\n"	
	
	var s,so,cnt=0;
	for( s in d ){
		++cnt;
	}

	var tdWidth = 100 / cnt;

	var s,so,cnt=0;
	for( s in d ){
		so = d[ s ]	
		r += "<th style='width:" + tdWidth + "%;'>" + s + "</th>\n";
		++cnt;
	}

	r += "</tr>\n</thead>\n<tbody>\n"
	r += "<tr>\n"


	var s,so;
	for( s in d ){
		so = d[ s ];
		r += "<td style='text-align:center;'>" + so.length + " 건</td>\n";
	}
	r += "</tr>\n"
	r += "</tbody>\n</table>\n";

	console.log( '[E] - FN02 - ' + title );
	return r;
}

/*
   "total":[
      {
         "월":"10",
         "도달 (명)":"366021",
         "노출 수 (회)":"504687",
         "회수 (번)":"1.4",
         "지출 금액(동)":"15230463",
         "CPM    (1,000회 노출당 비용)":"30178",
         "CPC(전체)":"1206",
         "CTR(전체)":"2.5",
         "페이지 참여(번)":"244470",
         "페이지 참여당 비용":"62",
         "페이지 좋아요":"2326",
         "게시물 참여(번)":"242144",
         "게시물 댓글 (개)":"28"
      }
   ],
*/

/*
 * 페이스북 광고통계
 */
var FN03 = function( d ){
	var title = "페이스북 광고통계"
	console.log( '[S] - FN03 - ' + title );
	
	var r = "";
	var titleHtml = `
			<div class="align_center pad_20"><h2>${title}</h2></div>
		`
	r += titleHtml;
	r += "<table id='monthly_facebook_stastics'>\n";
	r += "<thead>\n<tr>\n";
	
	var headers = [ "도달 (명)", "노출 수 (회)", "페이지 좋아요", "게시물 참여(번)", "게시물 댓글 (개)" ];

	var tdWidth = 100 / headers.length;

	headers.forEach(function(d){
		r += "<th style='width:" + tdWidth + "%;'>" + d + "</th>\n";	
	});

	r += "</tr>\n</thead>\n<tbody>\n";
	r += "<tr>\n";

	headers.forEach(function(item){
		r += "<td style='text-align:center;'>" + d[ 0 ][ item ] + " 건</td>\n";	
	})
		

	r += "</tr>\n";
	r += "</tbody>\n</table>\n";

	console.log( '[E] - FN03 - ' + title );
	return r;
}

/*
   "location_data":[
      [
         "State",
         "도달",
         "노출수"
      ],
      [
         {
            "f":"Ho Chi Minh City",
            "v":"VN-SG"
         },
         17472,
         26887
      ],
      [
         {
            "f":"Hanoi",
            "v":"VN-HN"
         },
         15488,
         21344
      ],
*/

/*
 * 페이스북 지역별 통계 자료 - 왼쪽
 */
var FN04_01 = function( d ){
	var title = "페이스북 지역별 통계 자료 - 왼쪽";
	console.log( '  [S] - FN04_01 - ' + title );
	
	var r = "";
//	var titleHtml = `
//			<div class="align_center pad_20"><h2>${title}</h2></div>
//		`
//	r += titleHtml;
	r += "<table id='facebook_location'>\n";
	r += "<thead>\n<tr>\n";
	
	var headers = [ "도시", "도달", "노출" ];

	var tdWidth = 100 / headers.length;

	headers.forEach(function(d){
		r += "<th style='width:" + tdWidth + "%;'>" + d + "</th>\n";	
	});
	

	r += "</tr>\n</thead>\n";
	r += "<tbody>\n";

	var i = 1,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ]
		if( i == 0 ||  ( i + 2 ) % 2 == 0 )
		{
			r += "<tr>\n";
			
			r += "<td style='background-color:#fff;color:#000;padding:5px;min-height:40px;'>" + io[ 0 ][ "f" ] + "</td>";
			r += "<td style='background-color:#fff;color:#000;padding:5px;border-top:1px solid #ccc;'>" + io[ 1 ] + "</td>";
			r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + io[ 2 ] + "</td>";

			r += "</tr>\n";
		}
	}
	r += "</tbody>\n</table>\n";

	console.log( '  [E] - FN04_01 - ' + title );
	return r;
}

/*
 * 페이스북 지역별 통계 자료 - 오른쪽
 */
var FN04_02 = function( d ){
	var title = "페이스북 지역별 통계 자료 - 오른쪽";
	console.log( '  [S] - FN04_02 - ' + title );
	
	var r = "";
//	var titleHtml = `
//			<div class="align_center pad_20"><h2>${title}</h2></div>
//		`
//	r += titleHtml;
	r += "<table id='facebook_location'>\n";
	r += "<thead>\n<tr>\n";
	
	var headers = [ "도시", "도달", "노출" ];

	var tdWidth = 100 / headers.length;

	headers.forEach(function(d){
		r += "<th style='width:" + tdWidth + "%;'>" + d + "</th>\n";	
	});
	

	r += "</tr>\n</thead>\n";
	r += "<tbody>\n";

	var i = 1,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ];
		if( i == 1 ||  ( i + 2 ) % 2 != 0 )
		{
			r += "<tr>\n";
			
			r += "<td style='background-color:#fff;color:#000;padding:5px;min-height:40px;'>" + io[ 0 ][ "f" ] + "</td>";
			r += "<td style='background-color:#fff;color:#000;padding:5px;border-top:1px solid #ccc;'>" + io[ 1 ] + "</td>";
			r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + io[ 2 ] + "</td>";

			r += "</tr>\n";
		}
	}
	r += "</tbody>\n</table>\n";

	console.log( '  [E] - FN04_02 - ' + title );
	return r;
}


/*
 * 페이스북 지역별 통계 자료
 */
var FN04 = function( d ){
	var title = "페이스북 지역별 통계 자료";
	console.log( '[S] - FN04 - ' + title );
	
	var r = "";
	var titleHtml = `
			<div class="align_center pad_20"><h2>${title}</h2></div>
		`;
	r += titleHtml;
	r += "<table><tr>";
	r += "<td>" + FN04_01( d ) + "</td>";
	r += "<td>" + FN04_02( d ) + "</td>";
	r += "</tr></table>";
	console.log( '[E] - FN04 - ' + title );
	return r;
};

/*
      "리뷰":[
         {
            "월":"10",
            "구분":"페이스북그룹",
            "타입":"리뷰",
            "업데이트날짜":"2020-10-20",
            "제목":"Chả là cách đây khá lâu khoảng tầm 1 tháng thì phải mình thấy có 1 bạn review về cách skincare buổi trưa có sử dụng miếng tẩy trang con vịt màu vàng vàng. Lần đó là mình cũng mua dùng thử xem thì thấy rất là oke lah~ luôn nên tậu nguyên hộp về dùng. Mình nhớ giá là 400 mấy á.",
            "게시물타입":"Image",
            "이미지":"https://drive.google.com/drive/u/0/folders/1tb8qowLUjxcjJyqyvk8PtrcMw3WOHo_0",
            "해당링크":"https://www.facebook.com/groups/bimatevagr/permalink/3672680389410915/",
            "조회건수":"",
            "클릭률":"",
            "댓글수":"18",
            "좋아요":"24"
         },
*/


/*
 * KOLs.
 */
var FN05 = function( d ){
	var title = "KOLS";
	console.log( '[S] - FN05 - ' + title );
	
	var r = "";
	if( !d ) 
	{
		console.log( '    - FN05 - d 가 없음!' );
		console.log( '[S] - FN05 - ' + title );
		return r;
	}

	var titleHtml = `
		<div class="align_center pad_20"><h2>${title}</h2></div>
	`;
	r += titleHtml;
	r += "<table id='kols'>\n";
	r += "<thead>\n<tr>\n";
	
	var headers = [ "이름", "이미지", "성별", "구분", "팔로워", "비고" ];
		headers.forEach(function(d){ r += "<th>" + d + "</th>\n"; });
	
	r += "</tr>\n</thead>\n<tbody>\n";
	
	var i = 0,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ];

		r += "<tr>\n"

		if( io[ "이름" ] != ""  ) r += "<td>" + io[ "이름" ] + "</td>\n";
		else r += "<td></td>\n";

		if( io[ "이미지" ] != ""  )  r += "<td><img src='" + io[ "이미지" ] + "' width='100'></td>\n";
		else r += "<td></td>\n";

		if( io[ "성별" ] != ""  )  r += "<td>" + io[ "성별" ] + "</td>\n";
		else r += "<td></td>\n";

		if( io[ "구분" ] != ""  )  r += "<td>" + io[ "구분" ] + "</td>\n";
		else r += "<td></td>\n";

		if( io[ "팔로워" ] != ""  )  r += "<td>" + io[ "팔로워" ] + "</td>\n";
		else r += "<td></td>\n";

		if( io[ "비고" ] != ""  )  r += "<td>" + io[ "비고" ] + "</td>\n";
		else r += "<td></td>\n";

		r += "</tr>\n";

		r += "<tr>\n";
		r += "<td>\n";
		r += "유튜브";
		r += "</td>\n";
		r += "<td colspan='8'>\n";
		r += io[ "유튜브" ];
		r += "</td>\n";
		r += "</tr>\n";

		r += "<tr>\n";
		r += "<td>\n";
		r += "페이스북";
		r += "</td>\n";
		r += "<td colspan='8'>\n";
		r += io[ "페이스북" ];
		r += "</td>\n";
		r += "</tr>\n";

		r += "<tr style='border-bottom: 2px solid #000;'>\n";
		r += "<td>\n";
		r += "인스타그램";
		r += "</td>\n";
		r += "<td colspan='8'>\n";
		r += io[ "인스타그램" ];
		r += "</td>\n";
		r += "</tr>\n";
			
	}
	r += "</tbody>\n</table>\n";

	console.log( '[E] - FN05 - ' + title );
	return r;
};


/*
 * insight
 */
var FN06 = function( d ){
	var title = "insight"
	console.log( '[S] - FN06 - ' + title );
	
	var r = "";
	var titleHtml = `
		<div class="align_center pad_20"><h2></h2></div>
	`
	r += titleHtml;
	
	var s,so;
	r += "<table>";

	for( s in d ){
	
		so = d[ s ];
		if( so != "" && s != "월" ){
		
			r += "<tr>";
			r += "<td style='background-color:#000;color:#fff;text-align:center;'>" + s.replace(/\r/gi,"<br>").replace(/\n/gi,"<br>").replace(/\r\n/gi,"<br>") + "</td>"
			r += "<td>" + so.replace(/\r/gi,"<br>").replace(/\n/gi,"<br>").replace(/\r\n/gi,"<br>") + "</td>"
			r += "</tr>";

		}
		
	}

	r += "</table>"
	console.log( '[E] - FN06 - ' + title );
	return r;
};

/*
 * imgTag삽입
 */
var FN07_00 = function( d ){
	var title = "imgTag삽입"
	console.log( '[S] - FN07 - ' + title );
	
	var r = "";
	var i = 0,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ];
		var fileNm = global.CONST.config.brandNm + "_" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "_" + io + ".png";
		r += "<div style='padding : 50px;text-align:center;'><img src='" +  global.CONST.config.curPath + "report/"  + global.CONST.config.brandNm + "/" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "/" + fileNm + "'></div>\n"
	}
	
	console.log( '[E] - FN07 - ' + title );
	return r;
};

/*
 * imgTag삽입
 */
var FN07_01 = function( d, subject ){
	var title = "imgTag삽입"
	console.log( '[S] - FN07 - ' + title );
	
	var r = "";
	
	if( subject )
	{
		var titleHtml = `
			<div class="align_center pad_20"><h2>${subject}</h2></div>
		`
		r += titleHtml;
	}
	
	r += "<table id='facebook_age' style='margin-top:50px;border:0px solid #fff!important;'>\n";
	var i = 0,iLen = d.length,io,i0o;
	for(;i<iLen;++i){
		var i0 = i + 1;

		io = d[ i ];
		i0o = d[ i0 ]

		r += "<tr>\n"
		var fileNm00 = global.CONST.config.brandNm + "_" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "_" + io + ".png";
		r += "<td style='padding : 10px;text-align:center;'><img src='" +  global.CONST.config.curPath + "report/" + global.CONST.config.brandNm + "/" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "/" + fileNm00 + "' width='500'></td>\n"
		var fileNm01 = global.CONST.config.brandNm + "_" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "_" + i0o + ".png";
		r += "<td style='padding : 10px;text-align:center;'><img src='" +  global.CONST.config.curPath + "report/"  + global.CONST.config.brandNm + "/" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "/" + fileNm01 + "' width='500'></td>\n"

		r += "</tr>\n"
		++i;
	}
	
	r += "</table>\n"
	
	console.log( '[E] - FN07 - ' + title );
	return r;
};

/*
 * 구글광고 통계
 */
var FN08 = function( d ){
	var title = "구글광고 통계"
	console.log( '[S] - FN08 - ' + title );
	
	var r = "";

	if( !d )
	{
		console.log( '    - FN08 - d 가 없음!');
		console.log( '[E] - FN08 - ' + title );
		return r;
	}

	

	var titleHtml = `
			<div class="align_center pad_20"><h2>${title}</h2></div>
		`
	r += titleHtml;
	r += "<table id='google_total'>\n";
	r += "<thead>\n<tr>\n"	
	
	var headers = [ "켐페인", "노출수", "클릭수" ];

	var tdWidth = 100 / headers.length;

	headers.forEach(function(d){
		r += "<th style='width:" + tdWidth + "%;'>" + d + "</th>\n";	
	})
	

	r += "</tr>\n</thead>\n"
	r += "<tbody>\n"

	var s,so;
	for( s in d ){
		so = d[ s ];
		r += "<tr>\n"
		
		r += "<td style='background-color:#fff;color:#000;padding:5px;min-height:40px;'>" + s + "</td>";
		r += "<td style='background-color:#fff;color:#000;padding:5px;border-top:1px solid #ccc;'>" + so[ "노출수" ] + "</td>";
		r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + so[ "클릭수" ] + "</td>";

		r += "</tr>\n"	
	}
	r += "</tbody>\n</table>\n";

	console.log( '[E] - FN08 - ' + title );
	return r;
};

/*
 * Goolge Top SEO ADS.
 * <!=GOOGLE_TOP_SEO=!>
 */
var FN09 = function( p ){
	var title = "Goolge Top SEO ADS"
	console.log( '[S] - FN09 - ' + title );
	
	var r = "";
	var d = p[ "Google Top SEO" ];
	if( d.length == 0 )
	{
		console.log( '    - FN09 - d 가 없음!');
		console.log( '[E] - FN09 - ' + title );
		return r;
	}
	
	var titleHtml = `
		<div class="align_center pad_20"><h2>${title}</h2></div>
	`
	r += titleHtml;
	r += "<table id='googe_top_seo'>\n";
	r += "<thead>\n<tr>\n";
	
	var headers = [ "구분", "타입", "이미지","업데이트날짜", "제목", "조회건수" ];
		headers.forEach(function( item ){ r += "<th>" + item + "</th>\n"; });
	
	r += "</tr>\n</thead>\n<tbody>\n"
	
	var i = 0,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ];

		r += "<tr>\n"
		headers.forEach(function( item ){
			if( item == "이미지" ) return r += "<td><img src='" + io[ item ] + "' width='200'></td>\n";
			if( io[ item ] && io[ item ] != "0"  ) return r += "<td>" + io[ item ] + "</td>\n";
			return r += "<td></td>\n";
		});
		r += "</tr>\n"

		r += "<tr style='border-bottom: 2px solid #000;'>\n"
		r += "<td colspan='2'>\n"
		r += "해당링크"
		r += "</td>\n"
		r += "<td colspan='7' style='word-break: break-all;'>\n"
		r += io[ "해당링크" ]
		r += "</td>\n"
		r += "</tr>\n"
			
	}
	r += "</tbody>\n</table>\n";


	console.log( '[E] - FN09 - ' + title );
	return r;
};

/*
 * makePdf
 */
var makeHtmlToPdf = function( oldPath, savePath, saveFileNm, cbFunction ){

	var saveFilePathNmHTML = savePath + saveFileNm + ".html"
	var oldFilePathNmPDF = oldPath + saveFileNm + ".html.pdf"
//	var saveFilePathNmPDF = savePath + saveFileNm + ".pdf"

	var bat = spawn('cmd.exe', ['/c', 'savePdf.bat ' + saveFilePathNmHTML.replace(/\//gi,"\\")]);
		bat.stdout.on('data', function(data){ 
			console.log( iconv.decode( data, "euc-kr") ); 
		});
		bat.stderr.on('data', function(data){ 
			console.log( iconv.decode( data, "euc-kr") )
		});
		bat.on('exit', function(code){ 
			console.log(`Child exited with code ${code}`); 
		});

	setTimeout(function(){
		var bat00 = spawn('cmd.exe', ['/c', 'taskkill /F /IM chrome.exe /T']);
		bat00.stdout.on('data', function(data){ 
			console.log( iconv.decode( data, "euc-kr") ); 
		});
		bat00.stderr.on('data', function(data){ 
			console.log( iconv.decode( data, "euc-kr") )
		});
		bat00.on('exit', function(code){ 
			console.log( "파일이동실행" )
			cbFunction( oldFilePathNmPDF, savePath, saveFileNm + ".html.pdf" )
			console.log(`Child exited with code ${code}`); });
	},30000)
};

/*
 * move file dest folder.
 */
var movePdfToFolder = function( oldPath, newPath, oldFilePathNmPDF ){

	//renameAndMove.bat C:\Users\Administrator\Desktop\report_wellderma_202010.html.pdf D:\workspace_piel\reportToHTMLToPDF\report\wellderma\202010 report_wellderma_202010.html.pdf
	var bat = spawn('cmd.exe', ['/c', 'renameAndMove.bat ' + oldPath.replace(/\//gi,"\\") + " " + newPath.replace(/\//gi,"\\") + " " + oldFilePathNmPDF ]);
		bat.stdout.on('data', function(data){ 
			console.log( iconv.decode( data, "euc-kr") ); 
		});
		bat.stderr.on('data', function(data){ 
			console.log( iconv.decode( data, "euc-kr") )
		});
	bat.on('exit', function(code){ console.log(`Child exited with code ${code}`); });
};


//-----------------------------------------------------------------;
// LOGIC;
//-----------------------------------------------------------------;

// 이미지이동
(function(){
	
	fileNms_A.forEach(function(item){
		var fileNm = global.CONST.config.brandNm + "_" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "_" + item + ".png";
		
		var reportFolderPath = global.CONST.config.curPath + "report/";
		var brandFolderPath = reportFolderPath + global.CONST.config.brandNm + "/";
		var targetMonthFolderPath = brandFolderPath + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "/"

		if( !fs.existsSync( reportFolderPath ) )
		{
			fs.mkdirSync( reportFolderPath, { recursive: true });
		}
		if( !fs.existsSync( targetMonthFolderPath ) )
		{
			fs.mkdirSync (targetMonthFolderPath, { recursive: true });
		}
		if( !fs.existsSync( brandFolderPath ) )
		{
			fs.mkdirSync( brandFolderPath, { recursive: true });
		}
		if( !fs.existsSync( targetMonthFolderPath ) )
		{
			fs.mkdirSync (targetMonthFolderPath, { recursive: true });
		}
		var old = oldPath + fileNm;
		
		if( fs.existsSync( old ) )
		{	
			if( item == "chartdiv00" || item == "chartdiv01" || item == "chartdiv02" || item == "chartdiv03")
			{
				fileNms_O.facebook_age_pie.isExist = true;
				fileNms_O.facebook_age_pie.data.push( item )
			}
			else if( item == "chartdiv04" )
			{
				fileNms_O.facebook_time_bar.isExist = true;
				fileNms_O.facebook_time_bar.data.push( item )
			}
			else if( item == "chartdiv13" || item == "chartdiv14" )
			{
				fileNms_O.google_time_bar.isExist = true;
				fileNms_O.google_time_bar.data.push( item )
			}
			else if( item == "facebook_location" )
			{
				fileNms_O.facebook_location_map.isExist = true;
				fileNms_O.facebook_location_map.data.push( item )
			}
			else if( item == "chartdiv07" || item == "chartdiv08" || item == "chartdiv09" || item == "chartdiv10" || item == "chartdiv11" || item == "chartdiv12" )
			{
				fileNms_O.google_age_pie.isExist = true;
				fileNms_O.google_age_pie.data.push( item )
			}

			var dest = reportFolderPath + global.CONST.config.brandNm + "/" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "/" + fileNm;
			fs.copyFileSync( old, dest );		
		}	
	})
	
})();


/*
var fileNms_O = {
	facebook_age_pie : {
		isExist : false
		, data : [
			"chartdiv00"
			, "chartdiv01"
			, "chartdiv02"
			, "chartdiv03"
		]
	}
	, facebook_time_bar : {
		isExist : false
		, data : [
			"chartdiv04"
		]	
	}
	, google_time_bar : {
		isExist : false
		, data : [
			"chartdiv13"
			, "chartdiv14"
		]	
	}
	, facebook_location_map : {
		isExist : false
		, data : [
			"facebook_location"
		]	
	}
}

*/

var _strFacebookAgePie = "";
var _strFacebookTimeBar = "";
var _strFacebookLoctionMap = "";
var _strGoogleTimeBar = "";
var _strGoogleAgePie = "";

if( fileNms_O.facebook_age_pie.isExist ) _strFacebookAgePie = FN07_01( fileNms_O.facebook_age_pie.data );
if( fileNms_O.facebook_time_bar.isExist ) _strFacebookTimeBar = FN07_00( fileNms_O.facebook_time_bar.data );
if( fileNms_O.facebook_location_map.isExist ) _strFacebookLoctionMap = FN07_00( fileNms_O.facebook_location_map.data );
if( fileNms_O.google_time_bar.isExist ) _strGoogleTimeBar = FN07_00( fileNms_O.google_time_bar.data );
if( fileNms_O.google_age_pie.isExist ) _strGoogleAgePie = FN07_01( fileNms_O.google_age_pie.data, "구글 광고 연령별 통계" );

/*
global.CONST.config.brandNm = "wellderma";
global.CONST.config.targetYear = "2020";
global.CONST.config.targetMonth = "10";

*/

var _strGoogleTopSeo = "";
if( _o_data.google_seo_list ) _strGoogleTopSeo = FN09( _o_data.google_seo_list ) 

var _tString = reportSource.replace( "<!=MONTHLY_STATSTIC=!>", FN00( _o_data.statistic_monthly ) )
				.replace( "<!=LOGO_URL=!>", bramdNms[ global.CONST.config.brandNm ].imgPath )
				.replace( "<!=TARGET_BRAND=!>", bramdNms[ global.CONST.config.brandNm ].text )
				.replace( "<!=TARGET_YEAR=!>", global.CONST.config.targetYear )
				.replace( "<!=TARGET_MONTH=!>", pad( global.CONST.config.targetMonth, 2 ) )
				.replace( "<!=INSIGHT=!>", FN06( _o_data.insight[0] ) )
				.replace( "<!=MARKETING_LIST=!>", FN01( _o_data.ads_list ) )
				.replace( "<!=MARKETING_LIST_TOTAL=!>", FN02( _o_data.ads_list ) )
				//.replace( "<!=FACEBOOK_LOCATION=!>", FN04( _o_data.location_data ) )
				.replace( "<!=MONTHLY_FACEBOOK_STASTICS=!>", FN03( _o_data.total ) )
				//.replace( "<!=FACEBOOK_PIE_CHART=!>", _strFacebookAgePie )
				//.replace( "<!=FACEBOOK_BAR_CHART=!>", _strFacebookTimeBar )
				//.replace( "<!=FACEBOOK_LOCATION_CHART=!>", _strFacebookLoctionMap )
				.replace( "<!=GOOGLE_BAR_CHART=!>", _strGoogleTimeBar )
				//.replace( "<!=MONTHLY_GOOGLE_STASTICS=!>", FN08( _o_data.google_total ) )
				//.replace( "<!=GOOGLE_AGE_PIE=!>", _strGoogleAgePie )
				.replace( "<!=GOOGLE_TOP_SEO=!>", _strGoogleTopSeo )
				.replace( "<!=KOLS=!>", FN05( _o_data.kols ) );

fs.writeFileSync( savePath + saveFileNm + ".html" , _tString,{ flag : 'w' } )


/*
var oldPath = "C:/Users/Administrator/Downloads/";
var savePath = global.CONST.config.curPath + "report/" + global.CONST.config.brandNm + "/" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 ) + "/";
var saveFileNm = "report_" + global.CONST.config.brandNm + "_" + global.CONST.config.targetYear + pad( global.CONST.config.targetMonth, 2 );

*/
makeHtmlToPdf( desktopPath, savePath, saveFileNm, movePdfToFolder );

