/* This includes 4 files: jquery.colorbox.js, voting.js, jquery.touchswipe.js, colorbox.init.js */

function init_voting_bar(l,s,e,t){function c(){if("cboxVoting"==l.attr("id")){var e=jQuery("#colorbox").width(),t=l.width();e<t&&jQuery("#colorbox").css({left:jQuery("#colorbox").position().left-Math.round(t-e)/2,width:t})}}if(t&&(l.html('<div class="loading">&nbsp;</div>'),jQuery.ajax({type:"POST",url:s+"&vote_ID="+e,success:function(e){l.html(ajax_debug_clear(e)),c(),votingAdjust()}})),void 0===l.is_inited){function n(t,e,n,i){var o=l.find("#voting_action"),r=o.length?o.val():s;0<l.find("#votingID").length&&(r+="&vote_ID="+l.find("#votingID").val()),0<l.find("#widgetID").length&&(r+="&widget_ID="+l.find("#widgetID").val()),0<l.find("#skinID").length&&(r+="&skin_ID="+l.find("#skinID").val());var a=l.css("backgroundColor");jQuery(t).is(":checkbox")?jQuery(t).is(":checked")?(r+="&checked=1",votingFadeIn(l,n)):(r+="&checked=0",votingFadeIn(l,i)):(jQuery(t).removeAttr("id"),votingFadeIn(l,n)),jQuery.ajax({type:"POST",url:r+"&vote_action="+e,success:function(e){jQuery(t).is(":checkbox")||(l.html(ajax_debug_clear(e)),c()),votingFadeIn(l,a),votingAdjust()}})}l.on("click","a.action_icon",function(){return!1}),l.on("click","#votingLike",function(){n(this,"like","#bcffb5")}),l.on("click","#votingNoopinion",function(){n(this,"noopinion","#bbb")}),l.on("click","#votingDontlike",function(){n(this,"dontlike","#ffc9c9")}),l.on("click","#votingInappropriate",function(){n(this,"inappropriate","#dcc","#bbb")}),l.on("click","#votingSpam",function(){n(this,"spam","#dcc","#bbb")}),l.is_inited=!0}}function votingFadeIn(e,t){var n="transparent"==t||"rgba(0, 0, 0, 0)"==t;if(n){for(var i=e.parent(),o=t;i&&("transparent"==o||"rgba(0, 0, 0, 0)"==o);)o=i.css("backgroundColor"),i=i.parent();"HTML"!=i[0].tagName&&(t=o)}e.animate({backgroundColor:t},200,function(){n&&e.css("background-color","transparent")})}function votingAdjust(){$prev=jQuery("#cboxPrevious"),$wrap=jQuery("#cboxWrapper"),$voting=jQuery("#cboxVoting");$prev.width();var e=$("#colorbox .voting_wrapper"),t=($("#colorbox .voting_wrapper > .btn-group"),$("#colorbox .vote_title_panel"),$("#colorbox .vote_others"),$("#colorbox .separator"),$wrap.parent().width());e.removeClass("compact"),t<=700&&e.addClass("compact")}function init_colorbox(e){if("object"==typeof e&&0!=e.length){var t=e.attr("rel").match(/lightbox\[([a-z]+)/i);switch(t=t?t[1]:""){case"p":e.colorbox(b2evo_colorbox_params_post);break;case"c":e.colorbox(b2evo_colorbox_params_cmnt);break;case"user":e.colorbox(b2evo_colorbox_params_user);break;default:e.colorbox(b2evo_colorbox_params)}}}!function(h,s,e){var t,c,u,d,p,f,g,o,w,v,m,b,x,y,n,T,_,k,j,C,S,Q,I,E,r,O,H,D,L,i,a,M,$,l={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,minWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,minHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",openNewWindowText:"open in new window",open:!1,returnFocus:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:!1,displayVoting:!1,votingUrl:""},W="colorbox",P="cbox",z=P+"Element",N=P+"_open",A=P+"_load",R=P+"_complete",F=P+"_cleanup",U=P+"_closed",V=P+"_purge",K=!h.support.opacity;function X(e,t,n){return n=s.createElement("div"),e&&(n.id=P+e),n.style.cssText=t||"",h(n)}function Y(e,t){return Math.round((/%/.test(e)?("x"===t?f.width():f.height())/100:1)*parseInt(e,10))}function B(e){return _.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(e)}function q(e){for(e in _=h.extend({},h.data(r,W)))h.isFunction(_[e])&&"on"!==e.substring(0,2)&&(_[e]=_[e].call(r));_.rel=_.rel||r.rel||"nofollow",_.href=_.href||h(r).attr("href"),_.title=_.title||r.title,"string"==typeof _.href&&(_.href=h.trim(_.href))}function G(e,t){t&&t.call(r),h.event.trigger(e)}function Z(e){if(!i){if(r=e,k={},q(),p=h(r),O=0,"nofollow"!==_.rel&&(p=h("."+z).filter(function(){return(h.data(this,W).rel||this.rel)===_.rel}),-1===(O=p.index(r))&&(p=p.add(r),O=p.length-1)),!D){if(D=L=!0,c.show(),_.returnFocus)try{r.blur(),h(r).one(U,function(){try{this.focus()}catch(e){}})}catch(e){}t.css({cursor:_.overlayClose?"pointer":"auto"}).show(),_.w=Y(_.initialWidth,"x"),_.h=Y(_.initialHeight,"y"),$.position(),G(N,_.onOpen),T.add(v).hide(),n.html(_.close).show(),function(){var e,t,n,i=P+"Slideshow_",o="click."+P;_.slideshow&&p[1]?(t=function(){b.text(_.slideshowStop).one(o,n),c.removeClass(i+"off").addClass(i+"on"),e=setInterval(function(){D&&(_.loop||O!=p.length-1)||n(),$.next()},_.slideshowSpeed)},n=function(){clearInterval(e),b.text(_.slideshowStart).one(o,t),c.removeClass(i+"on").addClass(i+"off")},_.slideshowAuto?t():n()):c.removeClass(i+"off "+i+"on")}()}$.load(!0)}}($=h.fn[W]=h[W]=function(e,t){var n=this;if(e=e||{},!n[0]){if(n.selector)return n;n=h("<a/>"),e.open=!0}return t&&(e.onComplete=t),n.each(function(){h.data(this,W,h.extend({},h.data(this,W)||l,e)),h(this).addClass(z)}),(h.isFunction(e.open)&&e.open.call(n)||e.open)&&Z(n[0]),n}).init=function(){f=h(e),c=X().attr({id:W,class:K?P+"IE":""}),t=X("Overlay").hide(),u=X("Wrapper"),d=X("Content").append(g=X("LoadedContent","width:0; height:0; overflow:hidden"),w=X("LoadingOverlay").add(X("LoadingGraphic")),v=X("Title"),$infoBar=X("InfoBar").append($nav=X("Navigation").append(y=X("Previous"),m=X("Current"),x=X("Next")),$voting=X("Voting"),b=X("Slideshow"),n=X("Close"),$open=X("Open"))),u.append(d),o=X(!1,"position:absolute; width:9999px; visibility:hidden; display:none"),h("body").prepend(t,c.append(u,o)),$voting.data("voting_positions_done",0),previous_title="",d.children().hover(function(){h(this).addClass("hover")},function(){h(this).removeClass("hover")}).addClass("hover"),j=d.outerHeight(!0)-d.height(),C=d.outerWidth(!0)-d.width(),Q=g.outerHeight(!0),I=g.outerWidth(!0),S=Q,E=n.height()+4,c.css({"padding-bottom":j,"padding-right":C}).hide(),x.click(function(){$.next()}),y.click(function(){$.prev()}),n.click(function(){$.close()}),$open.click(function(){$.close()}),T=x.add(y).add(m).add(b),d.children().removeClass("hover"),t.click(function(){_.overlayClose&&$.close()}),h(s).bind("keydown."+P,function(e){var t=e.keyCode;D&&_.escKey&&27===t&&(e.preventDefault(),$.close()),D&&_.arrowKey&&p[1]&&(37===t?(e.preventDefault(),y.click()):39===t&&(e.preventDefault(),x.click()))})},$.remove=function(){c.add(t).remove(),h("."+z).removeData(W).removeClass(z)},$.position=function(e,t){var n=null==k.pw||_.w>k.pw?_.w:k.pw,i=null==k.ph||_.h>k.ph?_.h:k.ph,o=h("#colorbox .voting_wrapper");parseInt(d.css("border-bottom"));$infoBar.css({minHeight:E+"px"}),Q=n<=700&&$voting.is(":visible")?(o.addClass("compact"),2*S-3):(o.removeClass("compact"),S);var r=0,a=0;function l(e){d[0].style.width=e.style.width,w[0].style.height=w[1].style.height=d[0].style.height=e.style.height}f.unbind("resize."+P),c.hide(),_.fixed?c.css({position:"fixed"}):(r=f.scrollTop(),a=f.scrollLeft(),c.css({position:"absolute"})),!1!==_.right?a+=Math.max(f.width()-n-I-C-Y(_.right,"x"),0):!1!==_.left?a+=Y(_.left,"x"):a+=Math.round(Math.max(f.width()-n-I-C,0)/2),!1!==_.bottom?r+=Math.max(s.documentElement.clientHeight-i-Q-j-Y(_.bottom,"y"),0):!1!==_.top?r+=Y(_.top,"y"):r+=Math.round(Math.max(s.documentElement.clientHeight-i-Q-j,0)/2),c.show(),e=c.width()===n+I&&c.height()===i+Q?0:e||0,u[0].style.width=u[0].style.height="9999px",c.dequeue().animate({width:n+I,height:i+Q,top:r,left:a},{duration:e,complete:function(){l(this),L=!1,u[0].style.width=n+I+C+"px",u[0].style.height=i+Q+j+"px",t&&t(),setTimeout(function(){f.bind("resize."+P,$.position)},1),$.resizeVoting(),u.parent().width()<380?b.hide():b.show()},step:function(){l(this)}})},$.resize=function(e){if(D){if((e=e||{}).width&&(_.w=Y(e.width,"x")-I-C),e.innerWidth&&(_.w=Y(e.innerWidth,"x")),g.css({width:_.w}),e.height&&(_.h=Y(e.height,"y")-Q-j),e.innerHeight&&(_.h=Y(e.innerHeight,"y")),!e.innerHeight&&!e.height){var t=g.wrapInner("<div style='overflow:auto'></div>").children();_.h=t.outerHeight(),t.replaceWith(t.children())}g.css({height:_.h}),k.pw=_.w,k.ph=_.h,$.position("none"===_.transition?0:_.speed)}},$.prep=function(e){if(D){var t,s="none"===_.transition?0:_.speed;g.remove(),(g=X("LoadedContent").append(e)).hide().appendTo(o.show()).css({width:(_.w=_.w||g.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w=_.minWidth&&_.minWidth>_.w?_.minWidth:_.w,k.pw=null==k.pw||_.w>k.pw?_.w:k.pw,k.pw),overflow:_.scrolling?"auto":"hidden"}).css({height:(_.h=_.h||g.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h=_.minHeight&&_.minHeight>_.h?_.minHeight:_.h,k.ph=null==k.ph||_.h>k.ph?_.h:k.ph,k.ph)}).prependTo(d),o.hide(),h(H).css({float:"none"}),t=function(){var e,t,n,i,o,r,a=p.length;function l(){K&&c[0].style.removeAttribute("filter")}D&&(r=function(){clearTimeout(M),w.hide(),G(R,_.onComplete)},K&&H&&g.fadeIn(100),v.add(g).show(),1<a?("string"==typeof _.current&&380<g.width()&&m.html(_.current.replace("{current}",O+1).replace("{total}",a)).show(),x[_.loop||O<a-1?"show":"hide"]().html(_.next),y[_.loop||O?"show":"hide"]().html(_.previous),e=O?p[O-1]:p[a-1],n=O<a-1?p[O+1]:p[0],_.slideshow&&380<g.width()&&b.show(),_.preloading&&(i=h.data(n,W).href||n.href,t=h.data(e,W).href||e.href,i=h.isFunction(i)?i.call(n):i,t=h.isFunction(t)?t.call(e):t,B(i)&&(h("<img/>")[0].src=i),B(t)&&(h("<img/>")[0].src=t))):T.hide(),_.iframe?(o=h("<iframe/>").addClass(P+"Iframe")[0],_.fastIframe?r():h(o).one("load",r),o.name=P+ +new Date,o.src=_.href,_.scrolling||(o.scrolling="no"),K&&(o.frameBorder=0,o.allowTransparency="true"),h(o).appendTo(g).one(V,function(){o.src="//about:blank"})):r(),"fade"===_.transition?c.fadeTo(s,1,l):l())},"fade"===_.transition?c.fadeTo(s,0,function(){$.position(0,t)}):$.position(s,t)}},$.load=function(e){var t,n,i=$.prep;H=!(L=!0),r=p[O],e||q(),G(V),G(A,_.onLoad),previous_title=_.title,_.displayVoting&&""!=_.votingUrl&&""!=r.id?(0==$voting.data("voting_positions_done")&&(0==Q&&(Q=g.outerHeight(!0)),$voting.data("voting_positions_done",1)),$voting.show(),init_voting_bar($voting,_.votingUrl,r.id,!0)):""!=$voting.html()&&($voting.html("").hide(),$voting.data("voting_positions_done",0)),_.h=_.height?Y(_.height,"y")-Q-j:_.innerHeight&&Y(_.innerHeight,"y"),_.w=_.width?Y(_.width,"x")-I-C:_.innerWidth&&Y(_.innerWidth,"x"),_.mw=_.w,_.mh=_.h,_.maxWidth&&(_.mw=Y(_.maxWidth,"x")-I-C,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.maxHeight&&(_.mh=Y(_.maxHeight,"y")-Q-j,_.mh=_.h&&_.h<_.mh?_.h:_.mh),t=_.href,M=setTimeout(function(){w.show()},100),_.inline?(X().hide().insertBefore(h(t)[0]).one(V,function(){h(this).replaceWith(g.children())}),i(h(t))):_.iframe?i(" "):_.html?i(_.html):B(t)?(h(H=new Image).addClass(P+"Photo").error(function(){_.title=!1,i(X("Error").text("This image could not be loaded"))}).load(function(){var e;H.onload=null,_.scalePhotos&&(n=function(){H.height-=H.height*e,H.width-=H.width*e},_.mw&&H.width>_.mw&&(e=(H.width-_.mw)/H.width,n()),_.mh&&H.height>_.mh&&(e=(H.height-_.mh)/H.height,n())),_.h&&(H.style.marginTop=Math.max(_.h-H.height,0)/2+"px"),jQuery(H).removeClass("zoomin zoomout"),colorbox_is_zoomed=!1;var s=0,c=0,t=H.naturalWidth>1.1*H.width||H.naturalHeight>1.1*H.height;t&&(H.className=H.className+" zoomin"),!t&&p[1]&&(O<p.length-1||_.loop)&&(H.onclick=function(e){$.next()}),t&&jQuery(H).bind("click dblclick",function(e,t){if(colorbox_is_zoomed)H.className=H.className.replace(/zoomout/,""),H.width=s,H.height=c,jQuery(this).parent().scrollLeft(0).scrollTop(0),jQuery(this).css({position:"relative",top:"0",left:"0"});else{$.resize({width:_.mw,height:_.mh+parseInt(g.css("margin-bottom"))});var n=jQuery(this).offset(),i=void 0!==e.pageX?e.pageX:t.originalEvent.touches[0].pageX,o=void 0!==e.pageY?e.pageY:t.originalEvent.touches[0].pageY,r=(i-n.left)/jQuery(this).width(),a=(o-n.top)/jQuery(this).height();H.className=H.className+" zoomout",h(H).css({position:"static",top:0,left:0,transform:"none"}),s=H.width,c=H.height,H.removeAttribute("width"),H.removeAttribute("height");var l=jQuery(this).parent()[0];jQuery(this).parent().scrollLeft(r*(l.scrollWidth-l.clientWidth)).scrollTop(a*(l.scrollHeight-l.clientHeight))}colorbox_is_zoomed=!colorbox_is_zoomed}),K&&(H.style.msInterpolationMode="bicubic"),setTimeout(function(){i(H)},1)}),setTimeout(function(){H.src=t},1)):t&&o.load(t,_.data,function(e,t,n){i("error"===t?X("Error").text("Request unsuccessful: "+n.statusText):h(this).contents())})},$.next=function(){!L&&p[1]&&(O<p.length-1||_.loop)&&(O=O<p.length-1?O+1:0,$.load())},$.prev=function(){!L&&p[1]&&(O||_.loop)&&(O=O?O-1:p.length-1,$.load())},$.close=function(){D&&!i&&(D=!(i=!0),G(F,_.onCleanup),f.unbind("."+P),t.fadeTo(200,0),c.stop().fadeTo(300,0,function(){c.add(t).css({opacity:1,cursor:"auto"}).hide(),G(V),g.remove(),setTimeout(function(){i=!1,G(U,_.onClosed)},1)}))},$.resizeVoting=function(){var e=h("#colorbox .voting_wrapper"),t=u.parent().width();t<=480?m.hide():m.show(),$infoBar.css({minHeight:E+"px"}),Q=t<=700&&$voting.is(":visible")?(e.addClass("compact"),2*S-3):(e.removeClass("compact"),S)},$.element=function(){return h(r)},$.settings=l,a=function(e){0!==e.button&&void 0!==e.button||e.ctrlKey||e.shiftKey||e.altKey||(e.preventDefault(),Z(this))},h.fn.delegate?h(s).delegate("."+z,"click",a):h(s).on("click","."+z,a),h($.init)}(jQuery,document,this),jQuery.event.special.dblclick={setup:function(e,t){jQuery(this).bind("touchstart.dblclick",jQuery.event.special.dblclick.handler)},teardown:function(e){jQuery(this).unbind("touchstart.dblclick")},handler:function(e){var t=e.target,n=jQuery(t),i=n.data("lastTouch")||0,o=(new Date).getTime(),r=o-i;20<r&&r<500?(n.data("lastTouch",0),n.trigger("dblclick",e)):n.data("lastTouch",o)}},function(e){"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],e):e(jQuery)}(function(oe){"use strict";var re="left",ae="right",le="up",se="down",ce="in",he="out",ue="none",de="auto",pe="swipe",fe="pinch",ge="tap",we="doubletap",ve="longtap",me="horizontal",be="vertical",xe="all",ye=10,Te="start",_e="move",ke="end",je="cancel",Ce="ontouchstart"in window,Se="TouchSwipe";function i(e,a){var t=Ce||!a.fallbackToMouseEvents,n=t?"touchstart":"mousedown",i=t?"touchmove":"mousemove",o=t?"touchend":"mouseup",r=t?null:"mouseleave",l="touchcancel",s=0,c=null,h=0,u=0,d=0,p=1,f=0,g=0,w=null,v=oe(e),m="start",b=0,x=null,y=0,T=0,_=0,k=0,j=0,C=null;try{v.bind(n,S),v.bind(l,E)}catch(e){oe.error("events not supported "+n+","+l+" on jQuery.swipe")}function S(e){if(!0!==v.data(Se+"_intouch")&&!(0<oe(e.target).closest(a.excludedElements,v).length)){var t,n=e.originalEvent?e.originalEvent:e,i=Ce?n.touches[0]:n;return m=Te,Ce?b=n.touches.length:e.preventDefault(),g=c=null,p=1,f=d=u=h=s=0,x=function(){for(var e=[],t=0;t<=5;t++)e.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0});return e}(),w=function(){var e={};return e[re]=ee(re),e[ae]=ee(ae),e[le]=ee(le),e[se]=ee(se),e}(),Y(),!Ce||b===a.fingers||a.fingers===xe||N()?(G(0,i),y=ie(),2==b&&(G(1,n.touches[1]),u=d=ne(x[0].start,x[1].start)),(a.swipeStatus||a.pinchStatus)&&(t=L(n,m))):t=!1,!1===t?(L(n,m=je),t):(q(!0),null)}}function Q(e){var t=e.originalEvent?e.originalEvent:e;if(m!==ke&&m!==je&&!B()){var n,i=Z(Ce?t.touches[0]:t);if(T=ie(),Ce&&(b=t.touches.length),m=_e,2==b&&(0==u?(G(1,t.touches[1]),u=d=ne(x[0].start,x[1].start)):(Z(t.touches[1]),d=ne(x[0].end,x[1].end),x[0].end,x[1].end,g=p<1?he:ce),p=function(e,t){return(t/e*1).toFixed(2)}(u,d),f=Math.abs(u-d)),b===a.fingers||a.fingers===xe||!Ce||N()){if(function(e,t){if(a.allowPageScroll===ue||N())e.preventDefault();else{var n=a.allowPageScroll===de;switch(t){case re:(a.swipeLeft&&n||!n&&a.allowPageScroll!=me)&&e.preventDefault();break;case ae:(a.swipeRight&&n||!n&&a.allowPageScroll!=me)&&e.preventDefault();break;case le:(a.swipeUp&&n||!n&&a.allowPageScroll!=be)&&e.preventDefault();break;case se:(a.swipeDown&&n||!n&&a.allowPageScroll!=be)&&e.preventDefault()}}}(e,c=function(e,t){var n=function(e,t){var n=e.x-t.x,i=t.y-e.y,o=Math.atan2(i,n),r=Math.round(180*o/Math.PI);r<0&&(r=360-Math.abs(r));return r}(e,t);return n<=45&&0<=n?re:n<=360&&315<=n?re:135<=n&&n<=225?ae:45<n&&n<135?se:le}(i.start,i.end)),s=function(e,t){return Math.round(Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)))}(i.start,i.end),h=te(),function(e,t){t=Math.max(t,J(e)),w[e].distance=t}(c,s),(a.swipeStatus||a.pinchStatus)&&(n=L(t,m)),!a.triggerOnTouchEnd||a.triggerOnTouchLeave){var o=!0;if(a.triggerOnTouchLeave){var r=function(e){var t=(e=oe(e)).offset();return{left:t.left,right:t.left+e.outerWidth(),top:t.top,bottom:t.top+e.outerHeight()}}(this);o=function(e,t){return e.x>t.left&&e.x<t.right&&e.y>t.top&&e.y<t.bottom}(i.end,r)}!a.triggerOnTouchEnd&&o?m=D(_e):a.triggerOnTouchLeave&&!o&&(m=D(ke)),m!=je&&m!=ke||L(t,m)}}else L(t,m=je);!1===n&&L(t,m=je)}}function I(e){var t=e.originalEvent;return Ce&&0<t.touches.length?(_=ie(),k=event.touches.length+1,!0):(B()&&(b=k),e.preventDefault(),T=ie(),h=te(),W()?L(t,m=je):a.triggerOnTouchEnd||0==a.triggerOnTouchEnd&&m===_e?L(t,m=ke):!a.triggerOnTouchEnd&&V()?M(t,m=ke,ge):m===_e&&L(t,m=je),q(!1),null)}function E(){d=u=y=T=b=0,p=1,Y(),q(!1)}function O(e){var t=e.originalEvent;a.triggerOnTouchLeave&&L(t,m=D(ke))}function H(){v.unbind(n,S),v.unbind(l,E),v.unbind(i,Q),v.unbind(o,I),r&&v.unbind(r,O),q(!1)}function D(e){var t=e,n=P(),i=$(),o=W();return!n||o?t=je:!i||e!=_e||a.triggerOnTouchEnd&&!a.triggerOnTouchLeave?!i&&e==ke&&a.triggerOnTouchLeave&&(t=je):t=ke,t}function L(e,t){var n=void 0;return A()&&R()||R()?n=M(e,t,pe):(z()&&N()||N())&&!1!==n&&(n=M(e,t,fe)),X()&&K()&&!1!==n?n=M(e,t,we):h>a.longTapThreshold&&s<ye&&a.longTap&&!1!==n?n=M(e,t,ve):1!==b&&Ce||!isNaN(s)&&0!==s||!V()||!1===n||(n=M(e,t,ge)),t===je&&E(),t===ke&&(Ce?0==e.touches.length&&E():E()),n}function M(e,t,n){var i=void 0;if(n==pe){if(v.trigger("swipeStatus",[t,c||null,s||0,h||0,b]),a.swipeStatus&&!1===(i=a.swipeStatus.call(v,e,t,c||null,s||0,h||0,b)))return!1;if(t==ke&&A()){if(v.trigger("swipe",[c,s,h,b]),a.swipe&&!1===(i=a.swipe.call(v,e,c,s,h,b)))return!1;switch(c){case re:v.trigger("swipeLeft",[c,s,h,b]),a.swipeLeft&&(i=a.swipeLeft.call(v,e,c,s,h,b));break;case ae:v.trigger("swipeRight",[c,s,h,b]),a.swipeRight&&(i=a.swipeRight.call(v,e,c,s,h,b));break;case le:v.trigger("swipeUp",[c,s,h,b]),a.swipeUp&&(i=a.swipeUp.call(v,e,c,s,h,b));break;case se:v.trigger("swipeDown",[c,s,h,b]),a.swipeDown&&(i=a.swipeDown.call(v,e,c,s,h,b))}}}if(n==fe){if(v.trigger("pinchStatus",[t,g||null,f||0,h||0,b,p]),a.pinchStatus&&!1===(i=a.pinchStatus.call(v,e,t,g||null,f||0,h||0,b,p)))return!1;if(t==ke&&z())switch(g){case ce:v.trigger("pinchIn",[g||null,f||0,h||0,b,p]),a.pinchIn&&(i=a.pinchIn.call(v,e,g||null,f||0,h||0,b,p));break;case he:v.trigger("pinchOut",[g||null,f||0,h||0,b,p]),a.pinchOut&&(i=a.pinchOut.call(v,e,g||null,f||0,h||0,b,p))}}return n==ge?t!==je&&t!==ke||(clearTimeout(C),K()&&!X()?(j=ie(),C=setTimeout(oe.proxy(function(){j=null,v.trigger("tap",[e.target]),a.tap&&(i=a.tap.call(v,e,e.target))},this),a.doubleTapThreshold)):(j=null,v.trigger("tap",[e.target]),a.tap&&(i=a.tap.call(v,e,e.target)))):n==we?t!==je&&t!==ke||(clearTimeout(C),j=null,v.trigger("doubletap",[e.target]),a.doubleTap&&(i=a.doubleTap.call(v,e,e.target))):n==ve&&(t!==je&&t!==ke||(clearTimeout(C),j=null,v.trigger("longtap",[e.target]),a.longTap&&(i=a.longTap.call(v,e,e.target)))),i}function $(){var e=!0;return null!==a.threshold&&(e=s>=a.threshold),e}function W(){var e=!1;return null!==a.cancelThreshold&&null!==c&&(e=J(c)-s>=a.cancelThreshold),e}function P(){return!a.maxTimeThreshold||!(h>=a.maxTimeThreshold)}function z(){var e=F(),t=U(),n=null===a.pinchThreshold||f>=a.pinchThreshold;return e&&t&&n}function N(){return!!(a.pinchStatus||a.pinchIn||a.pinchOut)}function A(){var e=P(),t=$(),n=F(),i=U();return!W()&&i&&n&&t&&e}function R(){return!!(a.swipe||a.swipeStatus||a.swipeLeft||a.swipeRight||a.swipeUp||a.swipeDown)}function F(){return b===a.fingers||a.fingers===xe||!Ce}function U(){return 0!==x[0].end.x}function V(){return!!a.tap}function K(){return!!a.doubleTap}function X(){if(null==j)return!1;var e=ie();return K()&&e-j<=a.doubleTapThreshold}function Y(){k=_=0}function B(){var e=!1;_&&ie()-_<=a.fingerReleaseThreshold&&(e=!0);return e}function q(e){!0===e?(v.bind(i,Q),v.bind(o,I),r&&v.bind(r,O)):(v.unbind(i,Q,!1),v.unbind(o,I,!1),r&&v.unbind(r,O,!1)),v.data(Se+"_intouch",!0===e)}function G(e,t){var n=void 0!==t.identifier?t.identifier:0;return x[e].identifier=n,x[e].start.x=x[e].end.x=t.pageX||t.clientX,x[e].start.y=x[e].end.y=t.pageY||t.clientY,x[e]}function Z(e){var t=function(e){for(var t=0;t<x.length;t++)if(x[t].identifier==e)return x[t]}(void 0!==e.identifier?e.identifier:0);return t.end.x=e.pageX||e.clientX,t.end.y=e.pageY||e.clientY,t}function J(e){if(w[e])return w[e].distance}function ee(e){return{direction:e,distance:0}}function te(){return T-y}function ne(e,t){var n=Math.abs(e.x-t.x),i=Math.abs(e.y-t.y);return Math.round(Math.sqrt(n*n+i*i))}function ie(){return(new Date).getTime()}this.enable=function(){return v.bind(n,S),v.bind(l,E),v},this.disable=function(){return H(),v},this.destroy=function(){return H(),v.data(Se,null),v},this.option=function(e,t){if(void 0!==a[e]){if(void 0===t)return a[e];a[e]=t}else oe.error("Option "+e+" does not exist on jQuery.swipe.options");return null}}oe.fn.swipe=function(e){var t=oe(this),n=t.data(Se);if(n&&"string"==typeof e){if(n[e])return n[e].apply(this,Array.prototype.slice.call(arguments,1));oe.error("Method "+e+" does not exist on jQuery.swipe")}else if(!(n||"object"!=typeof e&&e))return function(n){!n||void 0!==n.allowPageScroll||void 0===n.swipe&&void 0===n.swipeStatus||(n.allowPageScroll=ue);void 0!==n.click&&void 0===n.tap&&(n.tap=n.click);n=n||{};return n=oe.extend({},oe.fn.swipe.defaults,n),this.each(function(){var e=oe(this),t=e.data(Se);t||(t=new i(this,n),e.data(Se,t))})}.apply(this,arguments);return t},oe.fn.swipe.defaults={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"label, button, input, select, textarea, a, .noSwipe"},oe.fn.swipe.phases={PHASE_START:Te,PHASE_MOVE:_e,PHASE_END:ke,PHASE_CANCEL:je},oe.fn.swipe.directions={LEFT:re,RIGHT:ae,UP:le,DOWN:se,IN:ce,OUT:he},oe.fn.swipe.pageScroll={NONE:ue,HORIZONTAL:me,VERTICAL:be,AUTO:de},oe.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:xe}}),jQuery(document).ready(function(){jQuery('a[rel^="lightbox"]').each(function(){init_colorbox(jQuery(this))}),jQuery("#colorbox").swipe({swipeLeft:function(e,t,n,i,o){"undefined"!=typeof colorbox_is_zoomed&&colorbox_is_zoomed||jQuery.colorbox.next()},swipeRight:function(e,t,n,i,o){"undefined"!=typeof colorbox_is_zoomed&&colorbox_is_zoomed||jQuery.colorbox.prev()}}),jQuery(document).on("click","#colorbox img.cboxPhoto",function(){jQuery(this).hasClass("zoomout")?jQuery("#colorbox").swipe("disable"):jQuery("#colorbox").swipe("enable")})});