// Laiyong Mu
// stagged transition implemented



//plot square wave gratings

// the number of cycles (black and white bars)
var Hbars = 10              //horizontal bar
var Vbars = 15              //horizontal bar
var Hheight = 450/Hbars      //heights of each bar (horizontal rectangle)
var Vwidth = 800/Vbars     // width of each bar (vertical rectangle)
var orientation = "up"
var speed = 100;      // 1 = 1 pixel per 1 s
var dur = 2                 // 1 = 1 s
var steps = speed * dur     //how many pixele moved during

var gHbars = 5            //horizontal gradient bar
var gVbars = 5            //horizontal gradient bar

//function to dicide the color, 
//position determine how much movement from the beginning
var hBarcolor = function (dd)
{
    
    if (Math.floor(dd/Hheight)%2 == 0)
        return "black";
    else
        //{console.log(Math.floor(dd/(450/bars)), "white");
        return "white";
} 

var vBarcolor = function (dd)
{
    
    if (Math.floor(dd/Vwidth)%2 == 0){
        //console.log(Math.floor(dd/(800/Vbars)), "black");
        return "black";}
    else
        {//console.log(Math.floor(dd/(800/Vbars)), "white");
        return "white";}
}

function setVariable(){
    speed = 50;
    steps = speed * dur;
}

//Cynthia Brewer’s RdYlBu scale
var color1 = "#91bfdb";     //blue
var color2 = "#fc8d59";     //red
var color3 = "#91bfdb";     //blue
// color scale for H gradient bars
// var colorScaleH = d3.scale.linear()
//         .domain([0, 450/gHbars/2, 450/gHbars])
//         .range([color1, color2, color3]);

var colorScaleH = d3.scale.linear()
        .domain([0, 450/gHbars/2, 450/gHbars])
        .range(["white", "green", "white"]);

var gHbarColor = function (dd)
{
    return colorScaleH(dd%(450/gHbars));

}

var gVbarColor = function (dd)
{
    return colorScaleH(dd%(450/gVbars));

}


// function to draw bars
var currP = "hBar";
d3.select("#currentPattern").text("Horizontal Bar");
var direc1 = "down";
d3.select("#currentDirection").text("Down");

var direc2 = "left";
var direc3 = "down"
var direc4

// Generating Horizontal Gradient gratings
hGradientGratings = function (bar, orien)
{
    if (orien == "down")
    {
        for (k=0; k<450+steps; k++)
        {
            d3.select("#svg1")
            .append("rect") 
            .attr("width", 800)
            .attr("height", 1)
            .attr("x", 0)
            .attr("y", 450 - k)
            .attr("fill", gHbarColor(k))
        }

    }
    else
    {
        for (k=0; k<450+steps; k++)
        {
        
            d3.select("#svg1")
            .append("rect") 
            .attr("width", 800)
            .attr("height", 1)
            .attr("x", 0)
            .attr("y", 450 + steps - k)
            .attr("fill", gHbarColor(k))
         }
    }
}

// Generating Horizontal square gratings
hSquareGratings = function (bar, orien) 
{ 
    if (orien == "down")
    {
        for (k=0; k<450+steps; k++)
        {
        
            d3.select("#svg1")
            .append("rect") 
            .attr("width", 800)
            .attr("height", 1)
            .attr("x", 0)
            .attr("y", 450 - k)
            .attr("fill", hBarcolor(k))
        }
    }
    else
    {
        for (k=0; k<450+steps; k++)
        {
        
            d3.select("#svg1")
            .append("rect") 
            .attr("width", 800)
            .attr("height", 1)
            .attr("x", 0)
            .attr("y", 450 + steps - k)
            .attr("fill", hBarcolor(k))
         }
    }
}

// Generateing vertical
vSquareGratings = function (bar, orien) 
{ 
    if (orien == "left")
    {
        for (k=0; k<800+steps; k++)
        {
        
            d3.select("#svg1")
            .append("rect") 
            .attr("width", 1)
            .attr("height", 450)
            .attr("x", 800 + steps - k)
            .attr("y", 0)
            .attr("fill", vBarcolor(k));
        }
    }
    else
    {
        for (k=0; k<800+steps; k++)
        {
        
            d3.select("#svg1")
            .append("rect") 
            .attr("width", 1)
            .attr("height", 450)
            .attr("x", 800-k)
            .attr("y", 0)
            .attr("fill", vBarcolor(k))
        }
    }
    
}

// the staic pattern
hSquareGratings(Hbars, direc1);
//vSquareGratings(Vbars, direc2);
//hGradientGratings(gHbars, direc3);

var square = new Array(800+steps);     //there are 450 rectangles in square grating 

function hBarMove(orien)
{
    if (orien == "down")
    {
        d3.select("#svg1").selectAll("rect")
        .data(square).transition().duration(dur*1000).ease("linear")
        .attr("y", function (d,i) {return 450-i+steps;})
    }
    else
    {
        d3.select("#svg1").selectAll("rect")
        .data(square).transition().duration(dur*1000).ease("linear")
        .attr("y", function (d,i) {return 450-i;})
    }
}

function vBarMove(orien)
{
    
    if (orien == "left")
    {
        d3.select("#svg1").selectAll("rect")
        .data(square).transition().duration(dur*1000).ease("linear")
        .attr("x", function (d,i) {return 800-i;})
    }
    else
    {
        d3.select("#svg1").selectAll("rect")
        .data(square).transition().duration(dur*1000).ease("linear")
        .attr("x", function (d,i) {return 800-i+steps;})
    }
}

//hBarMove(direc2);
d3.select("#switch")
    .on("click", function() 
    {
        //console.log(currP);
        if (currP == "hBar" || currP == "hGradient")
        {
            if (direc1 == "down")
            {
                direc1 = "up";
                direc3 = "up";
                d3.select("#currentDirection").text(steps);
            }
            else
            {
                direc1 = "down";
                direc3 = "down";
                d3.select("#currentDirection").text("Down");                
            }

            d3.select("#svg1").selectAll("rect")
            .data(square).remove();

            if (currP == "hBar")
            {
                hSquareGratings(Hbars, direc1);
                hBarMove(direc1);
            }
            else 
            {
                hGradientGratings(gHbars, direc3);
                hBarMove(direc3);
            }
        }
        
        if (currP == "vBar" || currP == "vGradient")
        {
            if (direc2 == "left")
            {
                direc2 = "right";
                d3.select("#currentDirection").text("Right");            
            }
            else
            {
                direc2 = "left";
                d3.select("#currentDirection").text("Left");                
            }
            d3.select("#svg1").selectAll("rect")
            .data(square).remove()
            vSquareGratings(Vbars, direc2);
            vBarMove(direc2);
        }
        
        if (currP == "Looming")
            looming(loomDur);


    });

// change from bar movement to looming
var loomDur = 10;   // 1 means looming duration 100ms
var looming = function (Ldur)
{
    
    d3.select("#svg1").selectAll("circle")
    .transition().duration(Ldur*100).ease("linear")
    .attr("r", 225);

    
    setTimeout(function () {d3.select("#svg1").selectAll("circle")
        .transition().duration(Ldur*100).ease("linear")
        .attr("r", 4);}, 1000)

}

// random bouncing ball
var bouncingDur = 5      // bounce how many times
var radius = 10;
var oriPx = 800 - radius;          // original origin
var oriPy = 225;
var dirPx = 400;             // the first destination
var dirPy = 0 + radius;

var disR = function(oriPx, oriPy, dirPx, dirPy) 
{
    return Math.floor(Math.sqrt(Math.pow((dirPy - oriPy), 2) + Math.pow((dirPx - oriPx), 2)));               // the distance between two ends
}

var durScale = d3.scale.linear()
        .domain([0, 917])
        .range([0, Math.floor(917/speed*1000)]);

var positionXY = new Array(2);

var tempDirec = "left";     //moving direction of th circle
var stopSign = 0;           //whether keep moving

var bouncingBall = function () 
{
      
    if (oriPx >= radius && oriPx <= (800-radius) && tempDirec == "right")
        oriPx = oriPx + 5;
    if (oriPx >= radius && oriPx <= (800-radius) && tempDirec == "left")
        oriPx = oriPx - 5;
    if (oriPx < radius)
    {
        oriPx = oriPx + 5;
        tempDirec = "right";
    }
    if (oriPx > 800-radius)
    {
        oriPx = oriPx - 5;
        tempDirec = "left";
    }
     

    d3.select("#svg1").selectAll("circle")
    .data(square).remove()

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
 }
//bounceForever();


d3.select("#switch2")
    .on("click", function() 
    {
        if (currP == "hBar")
        {
            currP = "vBar";
            d3.select("#currentPattern").text("Vertical Bar");
            if (direc2 == "left")
                d3.select("#currentDirection").text("Left");  
            else
                d3.select("#currentDirection").text("Right");
            d3.select("#svg1").selectAll("rect")
            .data(square).remove()
            vSquareGratings(Vbars, direc2);
            vBarMove(direc2);
        }

        else if (currP == "vBar")
        {
            currP = "hGradient"
            d3.select("#currentPattern").text("Horizontal Gradient");
            if (direc3 == "left")
                d3.select("#currentDirection").text("Left");  
            else
                d3.select("#currentDirection").text("Right");
            d3.select("#svg1").selectAll("rect")
            .data(square).remove()

            hGradientGratings(gHbars, direc3);
            hBarMove(direc3);


        }

        else if (currP == "hGradient")
        {
            currP = "Looming"
            d3.select("#currentPattern").text("Looming");
            d3.select("#svg1").selectAll("rect")
            .data(square).remove()

            d3.select("#svg1")
            .append("circle")
            .attr("cx", 400)
            .attr("cy", 225)
            .attr("r", 4)
            .attr("fill", "black");   

            looming(loomDur);


        }

        else if (currP == "Looming")
        {
            currP = "Ball";
            d3.select("#currentPattern").text("Bouncing Ball");
            d3.select("#currentDirection").text("Random bouncing");
            d3.select("#svg1").selectAll("circle")
            .data(square).remove()

            d3.select("#svg1")
            .append("circle")
            .attr("cx", oriPx)
            .attr("cy", oriPy)
            .attr("r", radius)
            .attr("fill", "black");  

            bounceForever();

        }

        else if (currP == "Ball")
        {
            currP = "hBar";
            d3.select("#currentPattern").text("Horizontal Bar");
            if (direc1 == "down")
                d3.select("#currentDirection").text("Down");  
            else
                d3.select("#currentDirection").text("Up");

            stopSign = 1;
            d3.select("#svg1").selectAll("circle")
            .data(square).remove()
            hSquareGratings(Hbars, direc1);
            hBarMove(direc1);
        }


 
    });




   