// Laiyong Mu
// stagged transition implemented

//plot square wave gratings


var bspeed = 5;

var radius = 10;
var oriPx = 800 - radius;          // original origin
var oriPy = 225;
var dirPx = 400;             // the first destination
var dirPy = 0 + radius;



var tempDirec = "left";     //moving direction of th circle
var stopSign = 0;           //whether keep moving

var bouncingBall = function () 
{
      
    if (oriPx >= radius && oriPx <= (800-radius) && tempDirec == "right")
        oriPx = oriPx + bspeed;
    if (oriPx >= radius && oriPx <= (800-radius) && tempDirec == "left")
        oriPx = oriPx - bspeed;
    if (oriPx < radius)
    {
        oriPx = oriPx + bspeed;
        tempDirec = "right";
    }
    if (oriPx > 800-radius)
    {
        oriPx = oriPx - bspeed;
        tempDirec = "left";
    }
     

    d3.select("#svg1").selectAll("circle")
    .remove()

    d3.select("#svg1").append("circle")
    .attr("cx", oriPx)
    .attr("cy", oriPy)
    .attr("r", radius)
    .attr("fill", "black");

}

function bounceForever(){

    if (stopSign == 0)
    {
        bouncingBall();
        window.requestAnimationFrame(bounceForever);
    }
    else
        return;
 }

d3.select("#speedI")
    .on("click", function() 
    {
        d3.select("#svg1").selectAll("circle").remove();
        
            if (bspeed < 20)
                bspeed = bspeed + 2;
           
        
        
    });

d3.select("#speedD")
    .on("click", function() 
    {
        d3.select("#svg1").selectAll("circle").remove();
        
            if (bspeed > 1)
                bspeed = bspeed - 1;
           
        
        
    });

bounceForever();

