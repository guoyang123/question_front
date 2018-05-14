function _create(){
	var name=$("#inputName").val();
	if(name==null||name==""){
		alert("请输入问卷调查名称");
	}
	//将name发送到服务器
		$(function(){
	//加载网络数据
	$.ajax({
		type:"post",
		url:"http://localhost:8080/generateQ",
		data:{"qtitle":name,"userid":1},
		async:true,
		dataType:"jsonp",
		success:function(result){
			
			//获取接口返回值
			if(result.result==1){//创建成功
				var url="designnew.html?qtitle="+result.qtitle+"&qno="+result.qno;
				window.location.href=url;
			}else{
				alert("问卷创建失败");
			};
			
		}
	});
})
	
	
	
}
