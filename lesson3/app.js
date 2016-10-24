var superagent = require('superagent');//网页抓取利器
var express = require('express');//路由之内的模块
var cheerio = require('cheerio');//node版jq

var app = express();//建立express实例

app.get ('/',function(req,res,next){
	superagent.get('https://cnodejs.org/')
	.end(function(err,sres){
		if(err){
			return next(err);
		}

		var $ = cheerio.load(sres.text);
		var items= [];
		 $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: 'https://cnodejs.org'+$element.attr('href')
        });
       }) 
		
		//添加作者的爬取
		$("#topic_list .user_avatar").each(function(idx,ele) {
			var $ele = $(ele);
			items[idx].author=$ele.attr('href').split('/')[2];
				
		}) 
		 res.send(items);
	})
})

app.listen(3000,function(req,res){
	console.log('3000 port is running!')
})

//扩展学习  superagent API  链式调用极致