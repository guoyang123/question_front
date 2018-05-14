

/**当页面加载完成*/
$(function(){
	
	//获取当前页面的url
	var _url=window.location.href;
	var _qno=GetQueryString("qno");
	var _title=GetQueryString("qtitle");
	if(_title!=null){
		$("#qtitle").text(_title);
	}
	if(_qno!=null){
		$("<input hidden='hidden' id='_qno' value='"+_qno+"'>").appendTo($("body"));
	}
	
});


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//点击完成编辑按钮
function _finish(){
	
	
	//收集题目
	var len= $(".question").children().length;
	var ques=new Array(len);
	for(var i=1;i<=len;i++){
		var que=new Object();
		//标题的Id
		var _title_id="title"+i;
		//获取标题span
		var _classname=$("#"+_title_id).attr("class");
		//获取题目类型  title_class_gapfill为填空题 title_class_xxx为其他类型题目
		var _type=_classname.substring(12,_classname.length);
		if(_type=="gapfill"){
			console.log("==gapfill");
			//填空题
			que.qtype="gapfill";
			que.title=$("#"+_title_id).text();
		     que.qno=$("#_qno").val();//问卷编号
			ques[i-1]=que;
			
			
		}
	}
	
	
			
	
	//将js数组转成字符串
	var str=JSON.stringify(ques);
	console.log(str);
	
	sendData(str);
}

/**
 * jquery发送请求
 * */
function sendData(datas){
	$(function(){
	//加载网络数据
	$.ajax({
		type:"post",
		url:"http://localhost:8080/questions",
		data:{"ques":datas},
		async:true,
		dataType:"jsonp",
		success:function(data){
			console.log(data);
			
		}
	});
})
}

/**
 * 
 * type gapfill--->填空题
 * 
 * */
function createFreq(type){
	
	//填空题
	if(type=='gapfill'){
		var len= $(".question").children().length;
		 //最外层div
		 var _div_id="div_question"+(len+1);
		 var $div=$("<div class='div_question div_question_onclick' id='"+_div_id+"'></div>");
		
		 $div.appendTo("div.question");
		 //预览div,包含标题和输入框
		 var $preview_div=$("<div></div>");
		  //绘制题号
		  var $no=$("<span>"+(len+1)+". </span>");
		    //绘制标题
		    var _title_id="title"+(len+1);
		    var _title_class="title_class_gapfill";
		  var $title=$("<span id='"+_title_id+"' class='"+_title_class+"' >标题</span>");
		  //绘制textarea
		  var $textarea=$("<textarea  disabled='disabled'  wrap='soft' rows='2' class='inputtext' style='background:white;width:90%;height:35px;overflow: auto;'></textarea>");
		 
		  $no.appendTo($preview_div);
		   $title.appendTo($preview_div);
		   $textarea.appendTo($preview_div);
		 
		   
		   
		$preview_div.appendTo($div);
		 //水平分割线
		  var $div_ins=$("<div class='div_ins_question'></div>");
		  $div_ins.appendTo($div);
		  
		  //编辑组件div
		  var spanRight_div_id="spanRight"+(len+1);
		  var $spanRight_div=$("<div class='spanRight' id='"+spanRight_div_id+"' style='clear: none; visibility: visible;'>");
		  var $spanRight_div_ul=$("<ul class='stuff'> <li style='border: 1px solid #ff9900;display:inline-block'><a href='javascript:void(0)' ;return false;'><span class='design-icon design-finish'></span><span>完成</span></a></li><div style='clear:both'></div></ul>");
		  //点击第一个li元素也就是'完成'按钮
		 
		  $spanRight_div_ul.appendTo($spanRight_div);
		  $spanRight_div.appendTo($div);
		  
		
		  
		  //第三个div,编辑
		  var $edit_div=$("<div></div>");
		   var $div_title_attr_question=$("<div class='div_title_attr_question'></div>");
		   //编辑标题大div
		    var $edit_content_div=$("<div style='margin-left:8px'></div>");
		    var $spanleft_div=$("<div class='spanLeft'></div>");
		   //标题描述
		   var $spanleft_div_title=$("<div style='background: rgb(226, 224, 225); height: 27px; line-height: 27px; width: 395px;'></div>");
		   $spanleft_div_title.appendTo($spanleft_div);
		   var $title_span=$("<span style='float:left'>&nbsp;<b style='font-size:14px'>标题</b></span>");
		  $title_span.appendTo($spanleft_div_title);
		//输入标题的textarea所对应的div
		
		   var $spanleft_div_textarea=$("<div style='height: 77px;  width: 395px;'></div>");
		   $spanleft_div_textarea.appendTo($spanleft_div);
		   
		   var $spanleft_div_textarea_child=$("<div></div>");
		   $spanleft_div_textarea_child.appendTo($spanleft_div_textarea);
		
		   //textarea
		   var $spanleft_textarea=$("<textarea wrap='soft' autofocus='autofocus' rows='4' class='inputtext' tabindex='1' id='tcquestion5'  style='width: 388px; height: 70px; overflow: auto; padding: 5px 0px 0px 5px; border: 1px solid rgb(221, 221, 221);'></textarea>");
	    $spanleft_textarea.keyup(function (){
	    	//console.log($spanleft_textarea.val());
	    	$title.text($spanleft_textarea.val());
	    });
	$spanleft_textarea.appendTo($spanleft_div_textarea_child);
		$spanleft_div.appendTo($edit_content_div);
		     $edit_content_div.appendTo($div_title_attr_question);
		  $div_title_attr_question.appendTo($edit_div);
		  
		  
		   var _spanRight_div_id_selector="#"+spanRight_div_id;
		    var _a_selector="#"+spanRight_div_id+" .stuff li:first a";
		  //完成编辑div
		  var $finish_edit_div_parent=$("<div style='margin: 15px 10px;'><input type='button' value='完成编辑' class='submitbutton' style='width:100%;'></input></div>");
		    $finish_edit_div_parent.appendTo($div_title_attr_question);
		  
		    $finish_edit_div_parent[0].onclick=function($edit_div,_a_selector){
		    	
		    	return function(){
		    		$edit_div.hide();
		    		$(_a_selector).hide();
		    	}
		    }($edit_div,_a_selector);
		  
		     
		    //spanRight_div_id
		   
		    /*console.log(_a);*/
		   $(_a_selector)[0].onclick=function(parent,_a_selector,_spanRight_div_id_selector){
		    	  
		    	 return function(){
		    	 	 if(parent.is(":hidden")){//edit_div隐藏状态
		    		 $(_a_selector+" span:last").text("完成");
		    		 parent.show();
		    		// $(_spanRight_div_id_selector).show();
		    		 $(_a_selector).show();
		    	}else{
		    		 $(_a_selector+" span:last").text("编辑");
		    		 parent.hide();
		    		 // $(_spanRight_div_id_selector).hide();
		    		 $(_a_selector).hide();
		    	}
		    	 }
		    }($edit_div,_a_selector,_spanRight_div_id_selector);
		    
		    
		   $edit_div.appendTo($div);
		   
		    //鼠标移入该试题div
		 $div[0].onmouseenter=function(_spanRight_div_id_selector,_div_id,_a_selector){
		 	
		 	return function(){
		 		$(_spanRight_div_id_selector).show();
		 		//移除所有边框
		 		$(".div_question").css("border","0px");
		 		//为当前div添加边框
		 		var _div_id_selector="#"+_div_id;
		 		
		 		$(_div_id_selector).css("border","1px solid #fdb553");
		 		
		 		 $(_a_selector).show();
		 	}
		 }(_spanRight_div_id_selector,_div_id,_a_selector);
		 $div[0].onmouseleave=function(_spanRight_div_id_selector,_a_selector){
		 	
		 	return function(){
		 	//	$(_spanRight_div_id_selector).hide();
		 	 $(_a_selector).hide();
		 	}
		 }(_spanRight_div_id_selector,_a_selector);
	}
}







