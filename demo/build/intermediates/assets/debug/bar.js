// Laiyong Mu
// stagged transition implemented


//plot square wave gratings

// the number of cycles (black and white bars)
var Hbars = 10              //horizontal bar
var Hheight = 450/Hbars      //heights of each bar (horizontal rectangle)

var orientation = "up"
var speed = 200             // 1 = 1 pixel per 1 s
var dur = 5                 // 1 = 1 s
var steps = speed * dur     //how many pixele moved during

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


// function to draw bars
var direc1 = 1;     // 1 means "downward", 0 means "upward"
d3.select("#currentDirection").text("Down");


// Generating Horizontal square gratings
hSquareGratings = function (bar, orien) 
{ 
    if (orien == 1)
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
    d3.select("#svg1")
        .append("circle")
        .attr("cx", 750)
        .attr("cy", 400)
        .attr("r", 50)
        .attr("fill", "black");  
}


// the staic pattern
hSquareGratings(Hbars, direc1);

var square = new Array(800+steps);     //there are 450 rectangles in square grating 

function hBarMove(orien)
{
    if (orien == 1)
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

    d3.select("#svg1")
        .selectAll("circle")
        .attr("fill", function() { if (orien == 1) return "black"; else return "white";});  
}

hBarMove(direc1);

d3.select("#switch")
    .on("click", function() 
    {
        
        
            if (direc1 == 1)
            {
                direc1 = 0;
                
                d3.select("#currentDirection").text("Up");            
            }
            else
            {
                direc1 = 1;
                
                d3.select("#currentDirection").text("Down");                
            }

            d3.select("#svg1").selectAll("rect")
            .data(square).remove();

                      
            hSquareGratings(Hbars, direc1);
            hBarMove(direc1);
 
        
    });





   