/* 控制导航按钮动作 */
function nav_click(is_show) {
  if (is_show) {
    /* 显示左侧aside */
    $('.aside')
      .addClass('visible-md visible-lg')
      .removeClass('hidden-md hidden-lg')
    /* 调整右侧内容 */
    $('.aside3')
      .removeClass('col-md-13 col-lg-13')
      .addClass('col-md-13 col-lg-13');
    /* 调整文字内容格式 */
    $('.aside3-content')
      .removeClass('col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2')
      .addClass('col-md-13');
  } else {
    /* 隐藏左侧aside */
    $('.aside')
      .removeClass('visible-md visible-lg')
      .addClass('hidden-md hidden-lg');
    /* 右侧内容最大化 */
    $('.aside3')
      .removeClass('col-md-13 col-lg-13')
      .addClass('col-md-13 col-lg-13');
    /* 修改文字排版 */
    $('.aside3-content')
      .removeClass('col-md-13')
      .addClass('col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2'); 
  }  /*col-md-offset-1 col-lg-offset-2*/
}
/* 控制文章章节列表按钮 */
function content_click(is_show){
  if (is_show) {
    $('#content_table').show();
    $('#content_btn i').removeClass('fa-plus').addClass('fa-minus');
  } else {
    $('#content_table').hide();
    $('#content_btn i').removeClass('fa-minus').addClass('fa-plus');
  }
}

$(document).ready(function() {
  /* 控制左侧 aside 的动作 */
  $("#nav_btn").on('click', function() {
    isClicked = $(this).data('clicked');

    nav_click(isClicked);

    $(this).data('clicked', !isClicked);
  });

  $("#content_btn").on('click', function(){
    isClicked = $(this).data('clicked');

    content_click(!isClicked);

    $(this).data('clicked',!isClicked);

  });

  var collapse_count=0;
  $("div.highlight").each(function(){
    $(this).attr("id","collapse"+collapse_count.toString());
    collapse_count+=1;
  });

  $("a").each(function(){
    if($(this).hasClass("collapsecode"))
    {
      $("div"+$(this).attr("href")).addClass("collapse");
    }
  });
  /*去掉了Pjax，否则加载Busuanzi， Mathjax会有问题*/
  //$(document).pjax('.pjaxlink', '#pjax', { fragment: "#pjax", timeout: 10000 });

  $(document).on("pjax:end", function() {
    if($("body").find('.container').width() < 992)
      $('#nav_btn').click();
    $('.aside3').scrollTop(0);
    contentEffects();
  });
  $('body').on('click', '.show-commend', function(){
    var ds_loaded = false;
    window.disqus_shortname = $('.show-commend').attr('name');
    $.ajax({
      type: "GET",
      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
  });
  contentEffects();

  var system = {
        win: false,
        mac: false,
        xll: false,
        ipad: false
    };
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;

    if (system.win || system.mac || system.xll || system.ipad) {
        $('#vdian').css('display','block');
        //$('#hb').css('display','block');
    } 
    else {
        $('#vdian').css('display','block');
    }


});
function contentEffects(){
  //remove the asidebar
  $('.row-offcanvas').removeClass('active');
  if($("#nav").length > 0){
    $("#content > h2,#content > h3,#content > h4,#content > h5,#content > h6").each(function(i) {
        var current = $(this);
        current.attr("id", "title" + i);
        tag = current.prop('tagName').substr(-1);
        $("#nav").append("<div style='margin-left:"+15*(tag-1)+"px'><a id='link" + i + "' href='#title" +i + "'>" + current.html() + "</a></div>");
    }); 
    $("pre").addClass("prettyprint");
    prettyPrint(); 
    $('#content img').addClass('img-thumbnail').parent('p').addClass('center');
    $('#content_btn').show();
  }else{
    $('#content_btn').hide();
  }
}


$(function() {
      //alert($(window).height());
      $('#hbclick').click(function() {
          $('#code2').center();
          $('#goodcover').show();
          $('#code2').fadeIn();
      });

      $('#closebt2').click(function() {
          $('#code2').hide();
          $('#goodcover').hide();
      });

      $('#goodcover').click(function() {
          $('#code1').hide();
          $('#code2').hide();
          $('#goodcover').hide();
      });

      jQuery.fn.center = function(loaded) {
          var obj = this;
          body_width = parseInt($(window).width());
          body_height = parseInt($(window).height());
          block_width = parseInt(obj.width());
          block_height = parseInt(obj.height());

          left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
          if (body_width < block_width) {
              left_position = 0 + $(window).scrollLeft();
          };

          top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
          if (body_height < block_height) {
              top_position = 0 + $(window).scrollTop();
          };

          if (!loaded) {

              obj.css({
                  'position': 'absolute'
              });
              obj.css({
                  'top': ($(window).height() - obj.height()) * 0.5,
                  'left': left_position
              });
              $(window).bind('resize', function() {
                  obj.center(!loaded);
              });
              $(window).bind('scroll', function() {
                  obj.center(!loaded);
              });

          } else {
              obj.stop();
              obj.css({
                  'position': 'absolute'
              });
              obj.animate({
                  'top': top_position
              }, 200, 'linear');
          }
      }

  })