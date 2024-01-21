//**********star rate function para aba Create***********************/
$(function(){
  $("#rate_comp").val($("#rate_edit").val());
  let number=id=null;

  /*----------Edit -------------*/
  $(".edit_content").hide();
  let cont_size=$('.read_content').length;

  for(let i=1;i<=cont_size;i++){
    $('.edit_'+i).on("click",()=>{
      $("#read_"+i).hide();
      $("#edit_"+i).show();
    });
  }

  /*------------------Rate sistem-----------------*/

  /*-------     Create & Edit         ----*/
  $('.classif').on("mouseenter", function(){
    var css_fun='classif_hover';
    id=$(this).attr('id');
    
    number=parseInt(id.charAt(1));
    number_2=parseInt(id.charAt(2));

    if(id.charAt(2)!==""){
      deletClass_edit(css_fun,number_2);
      addRate_edit(number,number_2,css_fun);
    }else{
      deletClass(css_fun);
      addRate(number,css_fun);
    }

    number=null;
  }).on("mouseleave",function(){
    deletClass(css_fun);
  });

  $('.classif').on('click',function(){
    let css_fun='checked';
    let id=$(this).attr('id');
    let number=parseInt(id.charAt(1));
    

    $("#rate").val(number);

    let number_2=parseInt(id.charAt(2));


    if(!isNaN(number_2)){
      if(number!==parseInt($("#rate_edit").val())){
        //alert(number)
        $("#rate_comp").val(number);
      }
      else{        
        $("#rate_comp").val($("#rate_edit").val());
      }
      //alert($("#rate_comp").val());
      deletClass_edit(css_fun,number_2);
      addRate_edit(number,number_2,css_fun);
    }else{
      deletClass(css_fun);
      addRate(number,css_fun);
    }
  });

  $('#isbn').on("keydown",(e)=>{
    if((e.key<"0"||e.key>"9")&&((e.key!=="Delete")&&(e.key!=="Backspace"))&&((e.metaKey || e.ctrlKey)&& e.key === 86)){
      return false;
    }
  });

  $('#sort_items').on('change',()=>{
    let bookNumb=$('.container').length;
    let sort=$("#sort_items option:selected").val();
    let id=$("#Read_1"),nome=$("Read_2"),rate=$("#Read_3"),date=$("#Read_4");
    
    id.toggle();
    nome.toggle();
    rate.toggle();
    date.toggle();
    
    if(sort==="rate"){
      id.hide();
      nome.hide();
      rate.show();
      date.hide();
    }else if(sort==="date"){
      id.hide();
      nome.hide();
      rate.hide();
      date.show();
    }else if(sort==="title"){
      id.hide();
      nome.show();
      rate.hide();
      date.hide();
    }else if(sort==="id"){
      id.toggle();
    }

  });

});

//----------create----------------//
function deletClass(fun){
  for(i=1;i<=5;i++){
    $('#s'+i).removeClass(fun);
  }
}

function addRate(number,fun){
  for(i=1;i<=number;i++){
    $('#s'+i).addClass(fun);
  }
}

//----------Edit----------------//
function deletClass_edit(fun,number_2){
  for(i=1;i<=5;i++){
    $('#s'+i+number_2).removeClass(fun);
  }
}

function addRate_edit(number,number_2,fun){
  for(i=1;i<=number;i++){
    $('#s'+i+number_2).addClass(fun);
  }
}
/*----------------------------------------*/

/*-----------------Sort---------------------*/
function byNome(a,b){
    if(a.nome>b.nome){
      return 1;
    }else if(b.nome>a.nome){
      return -1
    }else{
      return 0;
    }
  }

//console.log(book1.sort(byRate));
function byRate(a,b){
  return parseInt(b.rate)-parseInt(a.rate);
}

//console.log(book1.sort(byDate));
function byDate(a,b){
  return new Date(a.data).valueOf() - new Date(b.data).valueOf()
}