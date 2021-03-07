function showDescription(){
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
}

function closeModal(){
    document.getElementById("displayDescription").style.visibility = 'hidden'; 
}