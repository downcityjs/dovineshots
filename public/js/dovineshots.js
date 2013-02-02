function dovineshots(data) {
  var result = d3.select('body main').selectAll('.results')
      .data(data.results);

  result.enter().append('div')
      .attr('class', 'results')
      .each(function(d, i) {
        d3.select(this).html('searching...')
      });

  console.log(data);
}

function search() {
  var script = d3.select('body').selectAll('#search')
    .data(['http://search.twitter.com/search.json?q=dovineshots&callback=dovineshots'])

  script.enter()
      .append('script')
      .attr('id', '#search')
      .attr('src', function(d) { return d; }); 

  script
      .attr('src', '')
  script
      .attr('src', function(d) { return d; }); 
}
