var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var express = require('express');



//url 模块在标准库之中
var url = require('url');

var app = new express();

var cnodeUrl = 'https://cnodejs.org/';

app.get ('/',function(req,res,next){
	superagent.get(cnodeUrl)
	.end(function (err,resp) {
		if (err) {
			return console.error(err);
		}
		var topicUrls = [];
		var resdata = [];
		var $ = cheerio.load(resp.text);
		//获取首页所有文章链接
		$('#topic_list .topic_title').each(function(idx,element){
			var $element = $(element);
			 // 我们用 url.resolve 来自动推断出完整 url
			var href = url.resolve(cnodeUrl,$element.attr('href'));
			topicUrls.push(href);
		})

		var concurrencyCount =0;
		var fetchUrl = function (url,callback){
			superagent.get(url)
		    .end(function (err, resp) {
		       var page = resp.text;
		       var getData = analyze(url,page);
		       callback(null,getData);
				    });
		};
		
		var analyze = function(url,data){
			 var $ = cheerio.load(data);
			 return {
		      title: $('.topic_full_title').text().trim(),
		      href: url,
		      comment1: $('.reply_content').eq(0).text().trim(),
		    };
		}

		async.mapLimit(topicUrls,5,function(url,callback){
			fetchUrl(url,callback);
		},function (err,result){
			console.log('final:');
			//得到数据集合
			console.log('打印result即是结果');
			res.send(result);
			//如何通过res.send返回值到页面   待解决  我去  直接res.send就ok了  mdzz
		});
		//用计数器来判断同时获取多个源的数据  通过计数器判断等于数据总数即执行相应函数
		// (function(){
		// 	var count = 0;
		// 	var result = {};

		// 	  $.get('http://data1_source', function (data) {
  //   				result.data1 = data;
  //   				count++;
  //   				handle();
  //   				});
		// 	  $.get('http://data2_source', function (data) {
		// 	    result.data2 = data;
		// 	    count++;
		// 	    handle();
		// 	    });
		// 	  $.get('http://data3_source', function (data) {
		// 	    result.data3 = data;
		// 	    count++;
		// 	    handle();
		// 	    });

		// 	  function handle() {
		// 	    if (count === 3) {
		// 	      var html = fuck(result.data1, result.data2, result.data3);
		// 	      render(html);
		// 	    }
		// 	  }
		// })()

		// var ep = new eventproxy();

		// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
		// ep.after('topic_html', topicUrls.length, function (topics) {
		//   // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

		//   // 开始行动
		//   topics = topics.map(function (topicPair) {
		//     // 接下来都是 jquery 的用法了
		//     var topicUrl = topicPair[0];
		//     var topicHtml = topicPair[1];
		//     var $ = cheerio.load(topicHtml);
		//     return ({
		//       title: $('.topic_full_title').text().trim(),
		//       href: topicUrl,
		//       comment1: $('.reply_content').eq(0).text().trim(),
		//     });
		//   });

		//   console.log('final:');
		//   console.log(topics);
		// });

		// topicUrls.forEach(function (topicUrl) {
		//   superagent.get(topicUrl)
		//     .end(function (err, res) {
		//       console.log('fetch ' + topicUrl + ' successful');
		//       ep.emit('topic_html', [topicUrl, res.text]);
		//     });
		// });
	})
})


app.listen(3000,function(req,res){
	console.log('runnig');
})
