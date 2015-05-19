// Laiyong Mu
// stagged transition implemented



//plot square wave gratings

// the number of cycles (black and white bars)
var Hbars = 4             //horizontal bar
var Vbars = 15              //horizontal bar
var Hheight = 450/Hbars      //heights of each bar (horizontal rectangle)
var Vwidth = 800/Vbars     // width of each bar (vertical rectangle)
var orientation = "up"
var speed = 200             // 1 = 1 pixel per 1 s
var dur = 2                 // 1 = 1 s
var steps = speed * dur     //how many pixele moved during

var gHbars = 5            //horizontal gradient bar
var gVbars = 5            //horizontal gradient bar

//function to dicide the color, 
//position determine how much movement from the beginning

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
var currP = "hGradient";
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

hGradientGratings(gHbars, direc3);
hBarMove(direc3);
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
                d3.select("#currentDirection").text("Up");            
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







   