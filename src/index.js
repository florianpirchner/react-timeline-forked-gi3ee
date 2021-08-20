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
import { vis } from "vis/dist/vis-timeline-graph2d.min";


/**
 * Define the timeline here as a react component
 */
const timeline = <Timeline />


render()

/**
 * Renders the UI
 */
async function render() {
  let initData = await OrderService.fetchInitialData()
  // let groups = initData.groups.get()
  // let items = initData.items.get()
  const rootElement = document.getElementById("root");

  // let timeline = new Timeline()

  // ReactDOM.render(<div>{timeline}</div>, rootElement);


  ReactDOM.render(<DisplayComponent />, rootElement);

  // timeline.setProperties({ "groups": groups });

}



class DisplayComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: OrderService.createDataSet(),
      groups: OrderService.createDataSet()
    };
  }

  componentDidMount() {
    let initData = OrderService.fetchInitialData()
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            groups: result.groups,
            items: result.items
          });
        })
  }

  setItems(items) {
    this.props.items = items;
  }

  clearItems() {
    this.setState(state => ({items : OrderService.createDataSet()}))
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

    setTimeout(() => this.clearItems(), 5000);
    return x;
  }
}
