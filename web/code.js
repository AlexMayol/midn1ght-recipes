const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
Vue.component('mr-footer', {
    template: `<div>
                <p>This product is meant for educational purposes only. Any resemblance to real persons, living or dead is purely coincidental. Void where prohibited. Some assembly required. List each check separately by bank number. Batteries not included.
                Contents may settle during shipment. Use only as directed. No other warranty expressed or implied. Do not use while operating a motor vehicle or heavy equipment. Postage will be paid by addressee. Subject to CARB approval.
                This is not an offer to sell securities. Apply only to affected area. May be too intense for some viewers.</p>
            </div>`
})
Vue.component('mr-header', {
    template: ` `
})
Vue.component('mr-menu', {
    template: `<ul>
                <li><a href="index.html" target="_blank" rel="noopener">Inicio</a></li>
                <li><a href="comidas.html" target="_blank" rel="noopener">Comidas</a></li>
                <li><a href="bebidas.html" target="_blank" rel="noopener">Bebidas</a></li>
                <li><a href="postres.html" target="_blank" rel="noopener">Postres</a></li>
                <li><a href="about.html" target="_blank" rel="noopener">Contacto</a></li>
                </ul>`
})
if(document.getElementById('footer')){new Vue({ el: '#footer' })}
if(document.getElementById('header')){new Vue({ el: '#header' })}
if(document.getElementById('menu')){new Vue({ el: '#menu' })}
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
                self.getCategories();
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
            },
            getCategories(){                         
                let html = '';
                for (let i = 0; i < this.blogData.length; i++) {   
                    let post = this.blogData[i];
                    post.categories = null;
                    if(post.labels != null){
                        for(let j = 0; j < post.labels.length;j++){                                                     
                            html += '<a href="'+post.labels[j].toLowerCase()+'.html" target="_blank" rel="noopener">'+post.labels[j]+'</a>'                          
                        }
                        post.categories = html;
                    }
                    html = '';
                }     
            },
            parseDate(date){                
                let fecha = new Date(date).toLocaleDateString('es-ES', options);                
                return fecha;
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
if(document.getElementById('comidas')){
    new Vue({
        el:'#comidas',
        data:{   
            blogData:null,
            comidas:[],
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
            checkLabel(label){
                return 
            },
            getPosts(){
                let self = this;
                axios.get('https://www.googleapis.com/blogger/v3/blogs/4068847985698899770/posts?key=AIzaSyCXEfThpBpeJtVSW208CvRmGBwAyuutbHM')
                .then(function (response) {
                self.blogData = response.data.items;
                for(let x = 0; x < self.blogData.length;x++){                
                    if(self.blogData[x].labels != null && self.blogData[x].labels.includes("Comidas")){
                     self.comidas.push(self.blogData[x]);                    
                    }                    
                }
                self.getPreview();
                self.getCategories();
                })
                .catch(function (error) {
                console.log(error);
                });
            },
            getCategories(){                         
                let html = '';
                for (let i = 0; i < this.blogData.length; i++) {   
                    let post = this.blogData[i];
                    post.categories = null;
                    if(post.labels != null){
                        for(let j = 0; j < post.labels.length;j++){                                                     
                            html += '<a href="'+post.labels[j].toLowerCase()+'.html" target="_blank" rel="noopener">'+post.labels[j]+'</a>'                          
                        }
                        post.categories = html;
                    }
                    html = '';
                }     
            },
            getPreview(){
                let el = document.createElement( 'html' );
                for (let i = 0; i < this.comidas.length; i++) { 
                   
                    el.innerHTML = this.comidas[i].content;
                    let img = el.getElementsByClassName('preview')[0];
                    if(img != null){
                        this.postres[i].imgPreview = img.getAttribute('src');
                    }                      
                }
            },
            parseDate(date){                
                let fecha = new Date(date).toLocaleDateString('es-ES', options);                
                return fecha;
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
if(document.getElementById('bebidas')){
    new Vue({
        el:'#bebidas',
        data:{   
            blogData:null,
            bebidas:[],
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
                for(let x = 0; x < self.blogData.length;x++){
                    if(self.blogData[x].labels != null && self.blogData[x].labels.includes("Bebidas")){
                     self.bebidas.push(self.blogData[x]);                    
                    }                    
                }
                self.getPreview();
                self.getCategories();
                })
                .catch(function (error) {
                console.log(error);
                });
            },
            getPreview(){
                let el = document.createElement( 'html' );
                for (let i = 0; i < this.bebidas.length; i++) { 
                   
                    el.innerHTML = this.bebidas[i].content;
                    let img = el.getElementsByClassName('preview')[0];
                    if(img != null){
                        this.postres[i].imgPreview = img.getAttribute('src');
                    }                      
                }
            },
            getCategories(){                         
                let html = '';
                for (let i = 0; i < this.blogData.length; i++) {   
                    let post = this.blogData[i];
                    post.categories = null;
                    if(post.labels != null){
                        for(let j = 0; j < post.labels.length;j++){                                                     
                            html += '<a href="'+post.labels[j].toLowerCase()+'.html" target="_blank" rel="noopener">'+post.labels[j]+'</a>'                          
                        }
                        post.categories = html;
                    }
                    html = '';
                }     
            },
            parseDate(date){                
                let fecha = new Date(date).toLocaleDateString('es-ES', options);                
                return fecha;
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
if(document.getElementById('postres')){
    new Vue({
        el:'#postres',
        data:{   
            blogData:null,
            postres:[],
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
                for(let x = 0; x < self.blogData.length;x++){
                    if(self.blogData[x].labels != null && self.blogData[x].labels.includes("Postres")){
                     self.postres.push(self.blogData[x]);                    
                    }                    
                }
                self.getPreview();
                self.getCategories();
                })
                .catch(function (error) {
                console.log(error);
                });
            },
            getPreview(){
                let el = document.createElement( 'html' );
                for (let i = 0; i < this.postres.length; i++) { 
                   
                    el.innerHTML = this.postres[i].content;
                    let img = el.getElementsByClassName('preview')[0];
                    if(img != null){
                        this.postres[i].imgPreview = img.getAttribute('src');
                    }                      
                }
            },
            getCategories(){                         
                let html = '';
                for (let i = 0; i < this.blogData.length; i++) {   
                    let post = this.blogData[i];
                    post.categories = null;
                    if(post.labels != null){
                        for(let j = 0; j < post.labels.length;j++){                                                     
                            html += '<a href="'+post.labels[j].toLowerCase()+'.html" target="_blank" rel="noopener">'+post.labels[j]+'</a>'                          
                        }
                        post.categories = html;
                    }
                    html = '';
                }     
            },
            parseDate(date){                
                let fecha = new Date(date).toLocaleDateString('es-ES', options);                
                return fecha;
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