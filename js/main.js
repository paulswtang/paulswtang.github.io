var width = 960,
    height = 500;

var velocity = [.010, .005],
    t0 = Date.now();

var projection = d3.geo.orthographic()
    .scale(height / 2 - 10);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var face = svg.selectAll("path")
    .data(icosahedronFaces)
  .enter().append("path")
    .each(function(d) { d.polygon = d3.geom.polygon(d.map(projection)); });

d3.timer(function() {
  var time = Date.now() - t0;
  projection.rotate([time * velocity[0], time * velocity[1]]);

  face
      .each(function(d) { d.forEach(function(p, i) { d.polygon[i] = projection(p); }); })
      .style("display", function(d) { return d.polygon.area() > 0 ? null : "none"; })
      .attr("d", function(d) { return "M" + d.polygon.join("L") + "Z"; });
});

function icosahedronFaces() {
  var faces = [],
      y = Math.atan2(1, 2) * 180 / Math.PI;
  for (var x = 0; x < 360; x += 72) {
    faces.push(
      [[x +  0, -90], [x +  0,  -y], [x + 72,  -y]],
      [[x + 36,   y], [x + 72,  -y], [x +  0,  -y]],
      [[x + 36,   y], [x +  0,  -y], [x - 36,   y]],
      [[x + 36,   y], [x - 36,   y], [x - 36,  90]]
    );
  }
  return faces;
}
