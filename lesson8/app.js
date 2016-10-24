var express = require('express');

var fibonacci = function(n){
	//typeof NAN === 'number' 是成立的
	if (typeof n !== 'number' || isNaN(n)){
		throw new Error( 'n should be a Number');
	}

	if(n < 0){
		throw new Error('n should >= 0');
	}

	if(n >  10) {
		throw new Error('n should <= 10');
	}

	if(n ===0){
		return 0 ;
	}

	if(n === 1){
		return 1;
	}

	return fibonacci(n-1) + fibonacci(n-2);
};

var app = express();

app.get('/fib',function(req,res){
	//http传来的东西默认是没有类型的，都是string，所以要转换类型
	var n = Number(req.query.n);
	try{
		//如果直接返回数字给send 会被认为是返回了http状态码
		res.send(String(fibonacci(n)));
	}catch(e){

		res.status(500)
			.send(e.message);
	}
});

module.exports = app;

app.listen(3000,function(){
	console.log('app is listening at port 3000');
});



