status1 = "";
objects = [];

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects...";
    object_name =  document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model loaded Successfully!");
    status1 = true;
}

function draw(){
    image(video, 0, 0, 300, 300);
    objectDetector.detect(video, gotResults);
    if(status1 != ""){
        for(i = 0; i < objects.length; i++){
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("objectFinder").innerHTML = object_name + "Found!";
                synth = window.speechSynthesis;
                utterThis = SpeechSynthesisUtterance("Objects mentioned found!");
                synth.speak(utterThis);
            }

            else{
                document.getElementById("objectFinder").innerHTML = object_name +  "not found";
            }
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}