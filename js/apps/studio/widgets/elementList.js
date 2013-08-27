define(['common/bone', 'text!../templates/widgets/elementList.html'], function (Base, template) {

    var baseUtil = Base.util;

    var ElementItemView = Base.View.extend({
        tagName:'li',
        template:'<button class="btn element">{{name}}</button>',
        events:{
            'mousedown button':'startDrag'
        },
        startDrag:function(e){
            var target = $(e.target);
            var _this = this;

            var isInside = false;

            var timeStamp = new Date().getTime();
            var MOUSE_ENTER = 'mouseenter.'+timeStamp;
            var MOUSE_LEAVE = 'mouseleave.'+timeStamp;
            var MOUSE_UP =  'mouseup.'+timeStamp;
            var MOUSE_MOVE = 'mousemove.'+timeStamp;
            var BODY = $('body');
            var DROPABLE = $('.form-element-list');

            var position = DROPABLE.offset();
            position.bottom = position.top + DROPABLE.height();
            position.right = position.left + DROPABLE.width();

            var toDrag = target;
            toDrag.css({
                opacity:0.5
            })

            BODY.css({
                cursor:'no-drop'
            })



            var proxy = toDrag.clone();


            proxy.css({
                top: e.clientY,
                left: e.clientX,
                position:'absolute',
                'z-index':1001,
                'pointer-events':'none'
            })
            proxy.appendTo(BODY);

            BODY.on(MOUSE_MOVE,function(e){
                var cursor = 'no-drop';
                if((position.left < e.clientX &&  e.clientX < position.right) && (position.top < e.clientY && e.clientY < position.bottom)){
                    cursor = 'copy'
                    isInside = true;
                }
                proxy.css({
                    top: e.clientY,
                    left: e.clientX
                })
                BODY.css({
                    cursor:cursor
                })
            });




            BODY.on(MOUSE_UP, function(e){
                BODY.off(MOUSE_MOVE)
                BODY.off(MOUSE_UP)
                proxy.remove();
                TweenMax.to(toDrag, 1, {opacity:1});
                BODY.css({
                    cursor:'auto'
                })

                if(isInside){
                    _this.model.trigger('elementDropped', _this.model.toJSON());
                }
            })
        }
    })


    var View = Base.View.extend({
        template: template,
        events:{
            'elementDropped':'elementDropHandler'
        },
        postRender:function(){
            var items = this.model.get('items');
            var listView = baseUtil.createView({
                View:Base.CollectionView,
                collection:items,
                parentEl:this.$('.element-list'),
                itemView:ElementItemView
            })

        }
    })





    var Model = Base.Model.extend({

    });

    return {
        View: View,
        Model: Model
    }
})