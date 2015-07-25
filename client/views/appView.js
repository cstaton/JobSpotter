var React = require('react');
var Nav = require('./navigationView');
var JobsList = require('./jobsView');
var Map = require('./mapView');
var Input = require('./inputView');
var Selections = require('./selectionsView');
var Metrics = require('./metricsView');
var Locs = require('./../collections/locations');
var Jobs = require('./../collections/jobs');
var Titles = require('./../collections/titles');

var AppView = React.createClass({

  getInitialState: function() {
    //create new Backbone collections to hold our data
    return { 
      zoomFlag: false,
      location: '',
      title: '',
      jobs: new Jobs(),
      allLocs: new Locs(),
      filteredLocs: new Locs(),
      titles: new Titles()
    }
  },

  componentDidMount: function() {
    var context = this;
    this.state.filteredLocs.fetch({
      success: function(locs) {
        // context.state.allLocs = locs;
        context.state.filteredLocs = locs;
        // context.state.titles = titles;
        context.refs.map.setMarkers();
        // context.refs.nav.autoFill();
      }
    });

    this.state.allLocs.fetch({
      success: function(locs) {
        context.state.titles.fetch({
          success: function(titles) {
            context.state.allLocs = locs;
            context.state.titles = titles;
            // context.refs.map.setMarkers();
            context.refs.nav.autoFill();
          }
        });
      }
    });
  },

  jobsUpdate: function(location, title, zoomFlag) {
    if(!location && !title) {
      this.setState({
        jobs: new Jobs(),
        location: '',
        title: '', 
        zoomFlag: zoomFlag
      });
      return;
    }

    var context = this;
    var request = {};
    request.location = location || '';
    request.title = title || '';

    this.state.jobs.fetch({
      traditional: true,
      data: request,
      success: function(jobs) {
        context.setState({
          jobs: jobs, 
          zoomFlag: zoomFlag, 
          location: request.location,
          title: request.title
        });
      }
    });

    if(title){
      this.state.filteredLocs.fetch({
        traditional: true,
        data: {title: title},
        success: function(newLocs) {
          context.state.filteredLocs = newLocs;
          context.refs.map.setMarkers();
        }
      });
    }
  },

  render: function() {
    console.log('all', this.state.allLocs);
    console.log('filtered', this.state.filteredLocs);
    return (
      <div>
        <Nav jobsUpdate={this.jobsUpdate} locs={this.state.allLocs} titles={this.state.titles} ref="nav" />
        <Map jobsUpdate={this.jobsUpdate} locs={this.state.filteredLocs} location={this.state.location} zoomFlag={this.state.zoomFlag} ref="map" />
        <Selections jobsUpdate={this.jobsUpdate} location={this.state.location} title={this.state.title} />
        <Metrics jobs={this.state.jobs} locs={this.state.locs} />
        <JobsList jobs={this.state.jobs} location={this.state.location} title={this.state.title} />
      </div>
    );
  }

});


module.exports = function() {
  React.render(<AppView />, document.getElementById('main'));
};

