export default {
	     equalDivision:function(array,num){ // 将数组分成若干份数组
			   let result = [];
         for(let i=0;i<array.length;i+=num){
           result.push(array.slice(i,i+num));
         }
         return result
		   },
       intercept(array,starIndex,endIndex){ //数组范围取值，starIndex是数组起始范围索引，endIndex是数组的结束范围索引
         if(endIndex > array.length) endIndex=array.length
         let filterArray=array.filter(function(value,index){
           if(index >= starIndex && index <= endIndex){
             return value
           }
         })
         return filterArray
       },
       removeArray(array,removeIndexArray){  //移除数组指定的索引，removeIndexArray为“array”类型[0,2,4]
         let filterArray=array.filter(function(value,index){
           let isDel=false
           for(let i=0;i<removeIndexArray.length;i++){
             if(index == removeIndexArray[i]) isDel=true
           }
           if(!isDel) return value
         })
         return filterArray
       }
   }