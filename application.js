$(document).ready(function() {
  var dataset = [];
  $("#addFurniture").hide();
  $('#deleteFurniture').hide();
  $('#roomSize').on('submit', function(e) {
    e.preventDefault();
    $('#roomSize').hide();
    $('#addFurniture').show();
    $('#deleteFurniture').show();
    var room_width = $('input[name=width]').val();
    var room_length = $('input[name=length]').val();
    var a = (room_width < room_length) ? room_width : room_length;
    function dragmove(d) {
      d3.select(this).attr("y", function() {
        if (d3.event.y < 0) {
          return 0;
        } else if (d3.event.y > (scale(room_width) - this.getBBox().height)) {
          return scale(room_width) - this.getBBox().height;
        } else {
          return d3.event.y;
        }
      })
      .attr("x", function() {
        if (d3.event.x < 0) {
          return 0;
        } else if (d3.event.x > (scale(room_length) - this.getBBox().width)) {
          return scale(room_length) - this.getBBox().width;
        } else {
          return d3.event.x;
        }
      });
    }
    var drag = d3.behavior.drag().on("drag", dragmove);
    var scale = d3.scale.linear()
                  .domain([0, a])
                  .range([0, 400]);
    var svg = d3.select('.container').append('svg').attr('width', scale(room_length)).attr('height', scale(room_width));
    $('#addFurniture').on('submit', function(e) {
      e.preventDefault();
      var name = $('input[name=name]').val().replace(/\s/g, '');
      var width = $('input[name=furnWidth]').val();
      var length = $('input[name=furnLength]').val();
      dataset.push({name: name, width: width, length: length, x:0, y: 0});
      furniture(dataset);
    });
    $('#deleteFurniture').on('submit', function(e) {
      e.preventDefault();
      var name = $('input[name=delName]').val().replace(/\s/g, '');
      svg.selectAll("rect." + name).remove();
      for (var i=0;i<dataset.length;i++) {
        if (name==dataset[i].name) {
          dataset.splice(i, 1);
        }
      }
    });
  function dragmove(d) {
    d3.select(this).attr("y", function() {
      if (d3.event.y < 0) {
        return 0;
      } else if (d3.event.y > (scale(room_width) - this.getBBox().height)) {
        return scale(room_width) - this.getBBox().height;
      } else {
        return d3.event.y;
      }
    })
    .attr("x", function() {
      if (d3.event.x < 0) {
        return 0;
      } else if (d3.event.x > (scale(room_length) - this.getBBox().width)) {
        return scale(room_length) - this.getBBox().width;
      } else {
        return d3.event.x;
      }
    });
  }
  var drag = d3.behavior.drag().on("drag", dragmove);
  function furniture(dataset) {  
    var r = svg.selectAll('rect').data(dataset).enter().append('rect');
    r.attr('x', function(d) {
      return scale(d.x);
    })
    .attr('y', function(d) {
      return scale(d.y);
    })
    .attr('width', function(d) {
      return scale(d.width);
    })
    .attr('height', function(d) {
      return scale(d.length);
    })
    .attr('fill', 'blue')
    .attr('class', function(d) {
      return d.name;
    })
    .call(drag);
  }
  });
});