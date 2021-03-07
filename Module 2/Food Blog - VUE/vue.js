Vue.component('mycomponent1',{
    template: '<header><span>Food Blog</span></header>'
});

Vue.component('mycomponent2',{
    template: '<h2>Comments</h2>'
});

var vm1 = new Vue({
    el: '#component1'
});
var vm2 = new Vue({
    el: '#component2'
});
var vm3 = new Vue({
    el: '#photos',
    data:{
        image: "images/chili.jpg",
        alt: "White Chicken Chili"
    }
});

var nav = new Vue({
    el: '#navbar',
    data: {
        active: 'home'
    },
    methods: {
        makeActive: function(item){
        this.active = item;
        }
    },
});

var post = new Vue({
    el: '#blogposts',
    data: {
        styleobj : {
            width:"10%",
            height:"10%",
            cursor: "pointer"
        },
        displayStyle : {
            visibility: "hidden",
            position: "absolute",
            top: "25%",
            left: "25%",
            width: "200px",
            background: "black",
            opacity: "0.9",
            color: "white",
            padding: "20px",
            "border-radius": "25px",
            border: "2px solid"
        },
        obj1:{
            imgsource : "images/profile.png",
            author: "Brianna",
            date: "February 18, 2021 @ 3:30 pm",
            reply: "REPLY",
            htmlcontent: "Was amazing! My Walmart didn’t have coriander in stock and didn’t have ground cumin. I used serrano instead of jalapeño. It was just like my favorite tortilla soup from BJs. I am sending this recipe to my family. I want everyone to try it!",
            level: "Foodie Level: Novice",
            bio: "Bio: Food enthusiast. Love to cook and experiment. Into only organic, fat free, sugar free stuffs!"
        },
        obj2:{
            imgsource : "images/profile.png",
            author: "LINH",
            date: "February 15, 2021 @ 9:46 am",
            reply: "REPLY",
            htmlcontent: "I just made this soup today and it’s so tasty! didn’t have corn at home but still turned out very good.  It’s a winner!  I made beef chili for my parents; but since my dad has gout he can’t eat beef; this white chicken chili is perfect for him.  Thank you Lisa!",
            level: "Foodie Level: Newcomer",
            bio: "Bio: Love food! Grew up with meat and potatoes. Recently venture outside my comfort zone. Loving everything I have been eating so far. Thai is my favorite at this time."
        },
        obj3:{
            imgsource : "images/profile.png",
            author: "CATHERINE LEONARDO",
            date: "February 13, 2021 @ 12:58 pm",
            reply: "REPLY",
            htmlcontent: "I LOVE this White Chicken Chili! You are right, it is satiating meal—delicious with toasted bread. Refreshingly different taste than any chicken chili I’ve made in the past. I made it exactly as written and added some chopped zucchini, carrots, and celery. Instead of shredding the chicken, I chopped it into small pieces. It freezes very well. Will be an all-time favorite, for sure.",
            level: "Foodie Level: Mentor",
            bio: "Bio: I have to say I never was the adventurous type until 2 years ago. My boyfriend, who is of Japanese background, exposed me to other cultural food and I have never look back since!"                    
        },
        obj4:{
            imgsource : "images/profile.png",
            author: "KALI",
            date: "February 13, 2021 @ 11:31 am",
            reply: "REPLY",
            htmlcontent: "This recipe is dynamite! My partner usually won’t eat beans but he finished the whole pot (darn was hoping to have some for leftovers haha). This is crowd-pleaser that I am going to add to my regular recipe rotation. Thanks so much, Lisa!",
            level: "Foodie Level: Novice",
            bio: "Bio: Food is my passion. So is cooking. I love to experiment and try new things. I have to admit I'm a food whore! Invite me over for dinner and I'll be there!"    
        },
    },
    methods : {
        showDescription : function() {
            var temp = event.currentTarget.getAttribute('id');
            document.getElementById("displayDescription").style.visibility = 'visible'; 

            if(temp == "img1")
            {
                document.getElementById("title").innerText = this.obj1.author;
                document.getElementById("foodieLevel").innerText = this.obj1.level;
                document.getElementById("biography").innerText = this.obj1.bio;
            }
            else if(temp == "img2")
            {
                document.getElementById("title").innerText = this.obj2.author;
                document.getElementById("foodieLevel").innerText = this.obj2.level;
                document.getElementById("biography").innerText = this.obj2.bio;
            }
            else if(temp == "img3")
            {
                document.getElementById("title").innerText = this.obj3.author;
                document.getElementById("foodieLevel").innerText = this.obj3.level;
                document.getElementById("biography").innerText = this.obj3.bio;
            }
            else
            {
                document.getElementById("title").innerText = this.obj4.author;
                document.getElementById("foodieLevel").innerText = this.obj4.level;
                document.getElementById("biography").innerText = this.obj4.bio;
            }
        },
        closeModal : function(){
            document.getElementById("displayDescription").style.visibility = 'hidden'; 
        }
    }
});