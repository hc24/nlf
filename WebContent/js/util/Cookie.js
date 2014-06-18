/**
 * I.util.Cookie
 * <i>Cookie������</i>
 */
I.regist('util.Cookie',function(W,D){
  var _set = function(key,value,day){
    var exp = -1;
    if(day) exp = day;
    if(exp>-1){
      var d = new Date();
      d.setTime(d.getTime()+exp*24*60*60*1000);
      D.cookie = key+'='+escape(value)+"; expires="+d.toGMTString();
    }else{
      D.cookie = key+'='+escape(value);
    }
  };
  var _get = function(key){
    try{
      var s = D.cookie.split('; ');
      for(var i=0;i<s.length;i++){
        var n = s[i].split('=');
        if(n[0] == key) return unescape(n[1]);
      }
    }catch(e){}
    return null;
  };
  var _remove = function(key){
    _set(key,'',-1);
  };
  
  return {
    /**
     * ����Cookie
     * @param key ��
     * @param value ֵ
     * @param day ��Ч����
     */
    set:function(key,value,day){_set(key,vlaue,day);},
    /**
     * ��ȡCookie����������ڼ�������null
     * @param key ��
     */
    get:function(key){return _get(key);},
    /**
     * �Ƴ�Cookie
     * @param key ��
     */
    remove:function(key){_remove(key);}
  };
}+'');