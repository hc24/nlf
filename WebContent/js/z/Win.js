I.regist('z.Win',function(W,D){
var CFG={
 skin:'Default',
 mask:true,
 mask_opacity:10,
 mask_color:'#FFF',
 mask_close:false,
 width:400,
 height:250,
 shadow:'#333 0px 0px 8px',
 round:6,
 title:'窗口',
 title_height:30,
 title_background:'#EFEFF0',
 title_color:'#000',
 title_border_color:'#BBB',
 title_border_height:1,
 close_icon:'fa fa-times',
 close_background:'#EFEFF0',
 close_color:'#000',
 close_hover_background:'#EFEFF0',
 close_hover_color:'#000',
 content:'',
 content_background:'#FFF',
 footer_height:0,
 footer_background:'#FFF',
 footer_border_color:'#EEE',
 footer_border_height:0,
 callback:function(){}
};
var _create=function(obj){
 var cfg=obj.config;
 if(cfg.mask){
  obj.mask=I.ui.Mask.create({skin:cfg.skin,opacity:cfg.mask_opacity,color:cfg.mask_color});
 }
 var o=I.insert('div');
 I.cls(o,obj.className);
 o.innerHTML='<i class="i-header"></i><a href="javascript:void(0);" class="i-close"></a><i class="i-body"></i><i class="i-footer"></i>';
 obj.layer=o;
 I.util.Boost.round(o,cfg.round);
 I.util.Boost.addStyle(o,'-webkit-box-shadow:'+cfg.shadow+';-moz-box-shadow:'+cfg.shadow+';-ms-box-shadow:'+cfg.shadow+';-o-box-shadow:'+cfg.shadow+';box-shadow:'+cfg.shadow+';');
 obj.titleBar=I.$(o,'class','i-header')[0];
 obj.titleBar.innerHTML=cfg.title;
 I.util.Boost.addStyle(obj.titleBar,'background:'+cfg.title_background+';color:'+cfg.title_color+';border-bottom:'+cfg.title_border_height+'px inset '+cfg.title_border_color+';');
 obj.closeButton=I.$(o,'class','i-close')[0];
 if(cfg.close_icon){
  I.cls(obj.closeButton,'i-close '+cfg.close_icon);
 }
 I.util.Boost.addStyle(obj.closeButton,'background:'+cfg.close_background+';color:'+cfg.close_color);
 I.listen(obj.closeButton,'click',function(){
  obj.close();
 });
 obj.contentPanel=I.$(o,'class','i-body')[0];
 obj.contentPanel.innerHTML=cfg.content;
 obj.contentPanel.style.background=cfg.content_background;
 obj.footerBar=I.$(o,'class','i-footer')[0];
 I.util.Boost.addStyle(obj.footerBar,'background:'+cfg.footer_background+';border-top:'+cfg.footer_border_height+'px solid '+cfg.footer_border_color+';');
 if(cfg.mask){
  if(cfg.mask_close){
   I.listen(obj.mask.layer,'click',function(m,e){
    obj.close();
    return true;
   });
  }
 }
 obj.suit=function(){
  var that=this;
  var c=that.config;
  var r=I.region();
  var wd=c.width;
  var ht=c.height+c.title_height+c.footer_height;
  I.util.Boost.addStyle(that.layer,'width:'+wd+'px;height:'+ht+'px;');
  I.util.Boost.addStyle(that.titleBar,'width:'+wd+'px;height:'+c.title_height+'px;line-height:'+c.title_height+'px;');
  I.util.Boost.addStyle(that.closeButton,'width:'+(c.title_height-c.title_border_height)+'px;height:'+(c.title_height-c.title_border_height)+'px;line-height:'+c.title_height+'px;');
  I.util.Boost.addStyle(that.contentPanel,'top:'+c.title_height+'px;width:'+wd+'px;height:'+c.height+'px;');
  I.util.Boost.addStyle(that.footerBar,'width:'+wd+'px;height:'+c.footer_height+'px;');
 };
 obj.resizeTo=function(w,h){
  var that=this;
  var c=that.config;
  c.width=w;
  c.height=h;
  that.suit();
 };
 obj.goCenter=function(){
  var that=this;
  var c=that.config;
  var r=I.region();
  var wd=c.width;
  var ht=c.height+c.title_height+c.footer_height;
  I.util.Boost.addStyle(that.layer,'left:'+(r.x+Math.floor((r.width-wd)/2))+'px;top:'+(r.y+Math.floor((r.height-ht)/2))+'px;');
 };
 obj.moveTo=function(x,y){
  I.util.Boost.addStyle(this.layer,'left:'+x+'px;top:'+y+'px;');
 };
 obj.goCenter();
 obj.suit();
 I.util.Drager.drag(obj.titleBar,obj.layer);
};
var _prepare=function(config){
 var obj={layer:null,mask:null,titleBar:null,closeButton:null,contentPanel:null,footerBar:null,className:null,config:cfg};
 var cfg=I.ui.Component.initConfig(config,CFG);
 obj.config=cfg;
 obj.className='i-z-Win-'+cfg.skin;
 I.util.Skin.init(cfg.skin);
 _create(obj);
 obj.close=function(){
  this.config.callback.call(this);
  try{this.mask.close();}catch(e){}
  this.layer.parentNode.removeChild(this.layer);
 };
 return obj;
};
return{
 create:function(cfg){return _prepare(cfg);}
};
}+'');