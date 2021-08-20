import React, { Component } from "react";
import ReactDOM from "react-dom";
import Timeline from "react-visjs-timeline";
import { TimelineOptions } from "./constants.js"
import * as OrderService from "./orderdataservice.js";

import "./scss/style.css";
import "react-toastify/dist/ReactToastify.css";
import "spinkit/css/spinkit.css";
import "./fleet.css";
import 'font-awesome/css/font-awesome.min.css';
import {
  Card,
  CardHeader,
  CardBody
} from "reactstrap";




class DisplayComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: OrderService.createDataSet(),
      groups: OrderService.createDataSet()
    };

    const thisComp = this;

    this.timelineOptions = TimelineOptions
    this.timelineOptions.onMove = function (item, callback) { thisComp.itemMoved(item, callback) }
    this.timelineOptions.onRemove = function (item, callback) { thisComp.itemRemoved(item, callback) }
    this.timelineOptions.onAdd = function (item, callback) { thisComp.itemAdded(item, callback) }
    this.timelineOptions.onUpdate = function (item, callback) { thisComp.itemUpdated(item, callback) }
    console.log(this.timelineOptions)
  }

  componentDidMount() {
    OrderService.fetchInitialData()
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            groups: result.groups,
            items: result.items
          });
        })
  }

  itemMoved(item, callback) {
    console.log(item)
  }

  itemRemoved(item, callback) {
    // this.state.items.remove(item)
    this.setState(state => ({ items: this.items }))
  }

  itemAdded(item, callback) {
    console.log(item)
  }

  itemUpdated(item, callback) {
    console.log(item)
  }

  refreshItem(item) {

  }

  setItems(items) {
    this.setState(state => ({ items: items }))
  }

  setGroups(groups) {
    this.setState(state => ({ groups: groups }))
  }

  clearItems() {
    this.setState(state => ({ items: OrderService.createDataSet() }))
  }

  render() {
    let x = (
      <div>
        <Card>
          <CardHeader>
            <strong>Timeline</strong>
          </CardHeader>
          <CardBody>
            {/* <Timeline options={this.props.timeLineOptions} items={this.props.items} groups={this.props.groups} /> */}
            <Timeline options={TimelineOptions} groups={this.state.groups.get()} items={this.state.items.get()} />
          </CardBody>{" "}
        </Card>
      </div>
    );
    return x;
  }
}

//
//
//
//
//              Logic
//
//
//
//


const rootElement = document.getElementById("root");
ReactDOM.render(<DisplayComponent />, rootElement);