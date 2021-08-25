img = "";
status = "";
objects = [];
song = "";

function preload() {
    song = loadSound("emergency_alert.mp3");
}

function setup() {
    canvas = createCanvas(380, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 300);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}

function modelLoaded() {
    console.log("MODEL IS LOADED");
    status = true;

}

function draw() {
    image(video, 0, 0, 380, 300);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].lable == "person") {
                document.getElementById("baby_detection").innerHTML = "Baby found";
                song.stop();
                console.log("stop");
            } else {
                document.getElementById("baby_detection").innerHTML = "baby not found";
                song.play();
                console.log("play");

            }
        }
        if (objects.length = 0) {
            document.getElementById("baby_detection").innerHTML = "baby not found";
            song.play();
            console.log("play");

        }

    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;

}