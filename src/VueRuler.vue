<style>
    .vue-ruler-wrapper{height: 150px;background: #eee;position: relative;}
    .vue-ruler-wrapper:before {content:'';position:absolute;top:0;left:50%;height: 100%;border-left:1px solid #f00;z-index: 10;}
    .vue-iscroll-wrapper{height: 150px;background: #eee;transform:translateX(50%);}
    .vue-iscroll-inner{height: 100%;padding: 0;padding-right: 100%;}
    .vue-iscroll-inner ul { height: 100%; }
    .vue-iscroll-inner ul li {display: block;float: left;height: 100%;position:relative;}
    .vue-iscroll-inner ul li span{font-size: .4rem;position:absolute;bottom:20%;left:0;transform:translateX(-50%);}
    .vue-iscroll-inner ul li:before {content:'';position:absolute;bottom:0;left:0;height: 10%;border-left:1px solid #333;}
    .vue-iscroll-inner ul li.high:before {height:20%;}
</style>

<template>
    <div class="vue-ruler-wrapper">
        <div class="vue-iscroll-wrapper">
            <div class="vue-iscroll-inner">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li class="high"><span>5</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:{
            max:{
                type:Number,
                default:1000
            },
            step:{
                type:Number,
                default:10
            },
            unit:{
                type:Number,
                default:10
            }
        },
        data: function(){
            return {
                num:0
            }
        },
        mounted(){
            var iscroll;
            var vm = this;
            var iscrollInner = $('.vue-iscroll-inner'),
                list = iscrollInner.find('ul');

            list.empty();
            iscrollInner.width((this.max+1) * this.unit);
            for(var i = 0; i <= this.max; i++){
                if(i % this.step == 0){
                    list.append($('<li class="high" style="width:'+this.unit+'px"><span>'+i+'</span></li>'));
                }else{
                    list.append($('<li style="width:'+this.unit+'px"></li>'));
                }
            }

            iscroll = new IScroll('.vue-iscroll-wrapper',{
                probeType: 3,
                click: true,
                scrollX:true,
                scrollY:false
            });

            iscroll.on('scroll', function(){
                vm.$data.num = Math.abs(Math.floor(this.x.toFixed(0)/vm.unit));
                vm.$emit('vue-ruler-changed', {num: vm.$data.num});

            });

            iscroll.on('scrollEnd', function(){
                var _value = Math.floor(this.x.toFixed(0)/vm.unit) * vm.unit;

                if(Math.abs(_value) > vm.max * vm.unit){
                    iscroll.scrollTo(-vm.max * vm.unit, 0, 0);
                    vm.$data.num = vm.max
                    vm.$emit('vue-ruler-changed', {num: vm.$data.num});
                }else{
                    iscroll.scrollTo(Math.floor(this.x.toFixed(0)/vm.unit) * vm.unit, 0, 0);
                }
            });
        }
    };
</script>