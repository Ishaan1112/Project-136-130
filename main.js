song = "";
leftWristX = 0;
leftWristY = 0;
righttWristX = 0;
rightWristY = 0;

function setup() {
    canvas =  createCanvas(600, 500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet,on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#ff0303");
    stroke("#ff0303")
    if( scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftwristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftwristY);
    valume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(valume);
    }
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('poseNet is Initialized');
}

function gotPoses(results) 
{
    if(results.length > 0)
    {
    
    
    console.log(results);
    
    
    scoreLeftWrist = results[0].pose.keypoints[9].score;

    console.log("scoreLeftWrist = " + scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY );

    rightWristX  = results[0].pose.rightWrist.x;
    rightWristY  = results[0].pose.rightWrist.y;
    console.log("righttWristX = " + leftWristX +"rightWristY = " + rightWristY );
}
}