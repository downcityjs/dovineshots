function dovineshots() {
  d3.json('/vines', function(data) {
    var vines = d3.select('.vines.cf').selectAll('.vine')
        .data(data)
      .enter().append('li')
        .attr('class', 'vine')
        .each(function(d, i) {
          d3.select(this).html(d);
          d3.select(this).select('video')
              .attr('controls', true)
              .attr('autoplay', 'autoplay')
              .attr('controls', null);;
        });
  });
