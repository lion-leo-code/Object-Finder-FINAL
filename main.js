objects = [];
video = "";
status = "";
item = "";
items = "";

function setup(){
    canvas = createCanvas(450, 350);
    canvas.position(550, 230);
}

function preload(){
    video = createCapture(VIDEO);
    video.hide();
    }


    
function draw(){
        image(video, 0, 0, 500, 400);
        if (status != ""){
            objectDetector.detect(video, gotResult)
            for(i = 0; i < objects.length; i++){
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                document.getElementById("number_of_objects").innerHTML = "Number of Detected Objects are: " + objects.length;
    
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                items = document.getElementById("object_name").value;
                item = items.toLowerCase();
                if(objects[i].label == item){
                    document.getElementById("YesORNo").innerHTML = "OBJECT FOUND!!";
                }
                else{
                    document.getElementById("YesORNo").innerHTML = "OBJECT NOT FOUND!!"
                }
            }
        }
    }

    
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
    
}

    
    function start(){
        objectDetector = ml5.objectDetector('cocossd', modelLoaded);
        document.getElementById("status").innerHTML = "Status: Detecting Objects..."
    }
    
    function modelLoaded(){
        console.log("MODEL LOADED!!");
        status = true;
    }