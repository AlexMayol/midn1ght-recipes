new Vue({
    el:'#kitchen',
    data:{   
        blogData:null
    },
    mounted(){
        this.getPosts()
    },
    methods:{
        getPosts(){
            var self = this;
            axios.get('https://www.googleapis.com/blogger/v3/blogs/4068847985698899770/posts?key=AIzaSyCXEfThpBpeJtVSW208CvRmGBwAyuutbHM')
            .then(function (response) {
              self.blogData = response.data.items;
              console.log(self.blogData)
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }
})