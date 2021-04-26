Vue.filter('name123', function(value){
    return value.toUpperCase();
});

Vue.component('vue-app-component', {
    //has same fields as vue instance but data is now a function
    data: function(){
        return {
            users: [
                {username: 'asdasd'},
                {username: 'qeqwe'},
                {username: 'y<ycy'}
            ]
        };
    },
    template: '<div><div class="user" v-for="user in users"><p> Username: {{ user.username }}</p></div></div>'
});

new Vue({
    name: "vueApp",
    el: '#vueApp',
    mounted(){
        console.log("mounted");
    },
    data: {
        title: 'Hello World',
        cssClass: '',
        clicks: 0,
        show: true
    },
    methods: {
        changeTitle () {
            //inside of the vue instance "this" referes to the whole instance
            this.title = 'Changed';
            this.clicks++;
            this.show = !this.show;
        }
    },
    computed: {
        //written as methods called like a property with {{ }}
        counter(){
            return this.clicks * 2;
        }
    },
    filters: {
        lowercase: function(value) {
            return value.toLowerCase();
        }
    },
});