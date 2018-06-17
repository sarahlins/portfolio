
 $(function() {
                
                /* when page loads animate the about section by default */
                //move($('#about'),2000,2);

                $('#menu > a').mouseover(
                function(){
                    var $this = $(this);
                    move($this,800,1);
                }
            );

                /*
                function to animate / show one circle.
                speed is the time it takes to show the circle
                turns is the turns the circle gives around the big circle
                 */
                function move($elem,speed,turns){
                    var id = $elem.attr('id');
                    var $circle = $('#circle_'+id);

                    /* if hover the same one nothing happens */
                    if($circle.css('opacity')==1)
                        return;

                    /* change 
                    the image */
                    $('#image_'+id).stop(true,true).fadeIn(650).siblings().not(this).fadeOut(650);

                    /*
                    if there's a circle already, then let's remove it:
                    either animate it in a circular movement or just fading out, depending on the current position of it
                     */
                    $('#content .circle').each(function(i){
                        var $theCircle = $(this);
                        if($theCircle.css('opacity')==1)
                            $theCircle.stop()
                        .animate({
                            path : new $.path.arc({
                                center  : [409,359],
                                radius  : 257,
                                start : 65,
                                end     : -110,
                                dir : -1
                            }),
                            opacity: '0'
                        },1500);
                        else
                            $theCircle.stop()
                        .animate({opacity: '0'},200);
                    });

                    /* make the circle appear in a circular movement */
                    var end = 65 - 360 * (turns-1);
                    $circle.stop()
                    .animate({
                        path : new $.path.arc({
                            center  : [409,359],
                            radius  : 257,
                            start : 180,
                            end   : end,
                            dir   : -1
                        }),
                        opacity: '1'
                    },speed);
                }
            });

;(function($){

  $.path = {}


  var V = {
    rotate: function(p, degrees) {
      var radians = degrees * 3.141592654 / 180
      var c = Math.cos(radians), s = Math.sin(radians)
      return [c*p[0] - s*p[1], s*p[0] + c*p[1] ]
    },
    scale: function(p, n) {
      return [n*p[0], n*p[1]]
    },
    add: function(a, b) {
      return [a[0]+b[0], a[1]+b[1]]
    },
    minus: function(a, b) {
      return [a[0]-b[0], a[1]-b[1]]
    }
  }
   
   $.path.bezier = function( params ) { 
     	params.start = $.extend({angle: 0, length: 0.3333}, params.start )
     	params.end   = $.extend({angle: 0, length: 0.3333}, params.end )

     this.p1 = [params.start.x, params.start.y];
     this.p4 = [params.end.x, params.end.y];
     
     var v14 = V.minus(this.p4, this.p1)
     var v12 = V.scale(v14, params.start.length)
     v12 = V.rotate(v12, params.start.angle)
     this.p2 = V.add(this.p1, v12)
      
     var v41 = V.scale(v14, -1)
     var v43 = V.scale(v41, params.end.length)     
     v43 = V.rotate(v43, params.end.angle)
     this.p3 = V.add(this.p4, v43)

     this.f1 = function(t) { return (t*t*t); }
     this.f2 = function(t) { return (3*t*t*(1-t)); } 
     this.f3 = function(t) { return (3*t*(1-t)*(1-t)); }
     this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); }

     /* p from 0 to 1 */
     this.css = function(p) {
       var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p)
       var x = this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4;
       var y = this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4;
       return {top: y + "px", left: x + "px"}
     }
   }

   $.path.arc = function(params) {
     for(var i in params)
       this[i] = params[i]

     this.dir = this.dir || 1

     while(this.start > this.end && this.dir > 0)
       this.start -= 360

     while(this.start < this.end && this.dir < 0)
       this.start += 360


     this.css = function(p) {
       var a = this.start * (p ) + this.end * (1-(p ))  
       a = a * 3.1415927 / 180 // to radians

       var x = Math.sin(a) * this.radius + this.center[0]
       var y = Math.cos(a) * this.radius + this.center[1]
       return {top: y + "px", left: x + "px"}
     } 

   };
   
       
  $.fx.step.path = function(fx){
    var css = fx.end.css(1 - fx.pos)
    for(var i in css) 
      fx.elem.style[i] = css[i];
  }
})(jQuery);



