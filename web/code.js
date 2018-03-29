Vue.component('mr-footer', {
    template: `<div>
                <p>You can find me on <a href="https://twitter.com/alex_midn1ght" target="_blank" rel="noopener">Twitter</a></p>
            </div>`
})
Vue.component('mr-header', {
    template: ` <h1>Midnight <br>recipes</h1>`
})
if(document.getElementById('footer')){new Vue({ el: '#footer' })}
if(document.getElementById('header')){new Vue({ el: '#header' })}
if(document.getElementById('search-bar')){
    new Vue({ 
        el: '#search-bar',
        data:{
            texto:null,
            isFound:true
        },
        methods:{
            searchPost(){                
                if(this.texto !=null){
                    this.isFound = true;
                    var self = this;
                    let query = encodeURIComponent(this.texto.trim());
                    axios.get('https://www.googleapis.com/blogger/v3/blogs/4068847985698899770/posts/search?q='+query+'&key=AIzaSyCXEfThpBpeJtVSW208CvRmGBwAyuutbHM')
                    .then(function (response) {                        
                        if(response.data.items != null){
                            console.log(response.data);
                            window.location.href = "results.html?query="+query;
                        }else{
                            self.isFound = false;
                        }
                    })
                    .catch(function (error) {
                    console.log(error);
                    });
                }
            }
        }
    })
}
if(document.getElementById('results')){
    new Vue({
        el:'#results',
        data:{   
            queryResult:null,
            viewList:{
                isActive:false
            },
            viewGrid:{
                isActive:true
            }
        },
        mounted(){
            this.getPosts()
        },
        methods:{
            getPosts(){
                var self = this;
                let url = location.href.split("query=");
                let res = url[1];                
                axios.get('https://www.googleapis.com/blogger/v3/blogs/4068847985698899770/posts/search?q='+res+'&key=AIzaSyCXEfThpBpeJtVSW208CvRmGBwAyuutbHM')
                .then(function (response) {
                self.queryResult = response.data.items;
                self.getPreview();
                })
                .catch(function (error) {
                console.log(error);
                });
            },
            getPreview(){

                let el = document.createElement( 'html' );
                for (let i = 0; i < this.blogData.length; i++) { 
                   
                    el.innerHTML = this.blogData[i].content;
                    let img = el.getElementsByClassName('preview')[0];
                    if(img != null){
                        this.blogData[i].imgPreview = img.getAttribute('src');
                    }                         
                }
                console.log(this.blogData)  
               
                
            },
            toggleGrid(){
                this.viewGrid.isActive = !this.viewGrid.isActive;
                this.viewList.isActive = !this.viewList.isActive;
            },
            toggleList(){
                this.viewList.isActive = !this.viewList.isActive;
                this.viewGrid.isActive = !this.viewGrid.isActive;
            }
        }
    })
}
if(document.getElementById('kitchen')){
    new Vue({
        el:'#kitchen',
        data:{   
            blogData:null,
            viewList:{
                isActive:false
            },
            viewGrid:{
                isActive:true
            }
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
                self.getPreview();
                })
                .catch(function (error) {
                console.log(error);
                });
            },
            getPreview(){

                let el = document.createElement( 'html' );
                for (let i = 0; i < this.blogData.length; i++) { 
                   
                    el.innerHTML = this.blogData[i].content;
                    let img = el.getElementsByClassName('preview')[0];
                    if(img != null){
                        this.blogData[i].imgPreview = img.getAttribute('src');
                    }                         
                }
                console.log(this.blogData)  
               
                
            },
            toggleGrid(){
                this.viewGrid.isActive = !this.viewGrid.isActive;
                this.viewList.isActive = !this.viewList.isActive;
            },
            toggleList(){
                this.viewList.isActive = !this.viewList.isActive;
                this.viewGrid.isActive = !this.viewGrid.isActive;
            }
        }
    })
}
if(document.getElementById('recipe')){
    new Vue({
        el:'#recipe',
        data:{
            message:'uo',
            recipeData:null
        },
        mounted(){
            this.getRecipe()
        },
        methods:{
            getRecipe(){
                var self = this;
                let url = location.href.split("post=");
                let res = url[1];                
                axios.get('https://www.googleapis.com/blogger/v3/blogs/4068847985698899770/posts/'+res+'?key=AIzaSyCXEfThpBpeJtVSW208CvRmGBwAyuutbHM')
                .then(function (response) {
                self.recipeData = response.data;
                console.log(self.recipeData)
                })
                .catch(function (error) {
                console.log(error);
                });
            }
        }

    })
}