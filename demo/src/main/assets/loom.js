// Laiyong Mu
// stagged transition implemented

var loomDur = 50;   // 1 means looming duration 100ms
var loomDirec = 1;  // 1 looming, 0 retracting

d3.select("#switch")
    .on("click", function() 
    {
        if (currP == "Looming")
            looming(loomDur, loomDirec);

    });


var looming = function (Ldur, Ldirec)
{
    // looming, get bigger
    if (Ldirec == 1)
        d3.select("#svg1").selectAll("circle")
            .transition().duration(Ldur*100).ease("linear")
            .attr("r", 225);
    else
        d3.select("#svg1").selectAll("circle")
            .transition().duration(Ldur*100).ease("linear")
            .attr("r", 4);
}

d3.select("#svg1")
    .append("circle")
    .attr("cx", 400)
    .attr("cy", 225)
    .attr("r", 4)
    .attr("fill", "black");   

looming(loomDur, loomDirec);

d3.select("#switch")
    .on("click", function() 
    {
        if (loomDirec == 1)
        {
            loomDirec = 0;
            looming(loomDur, loomDirec);
        }
        else
        {
            loomDirec = 1;
            looming(loomDur, loomDirec);   
        }
    });


   