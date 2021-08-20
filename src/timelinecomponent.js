import React, { Component } from "react";
import ReactDOM from "react-dom";
import Timeline from "react-visjs-timeline";
import moment from "moment";

import "./scss/style.css";
import "react-toastify/dist/ReactToastify.css";
import "spinkit/css/spinkit.css";
import "./fleet.css";
import 'font-awesome/css/font-awesome.min.css';

import {
  ButtonGroup,
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Card,
  CardHeader,
  CardBody,
  icon
} from "reactstrap";

const groups = [
  {
    id: "a1",
    content: "Sergei Action Plan"
    /*     subgroupOrder: (a, b) => {
      console.log("What are we doing here??");
      console.log("A:", a, "B:", b);
      let r = 0;
      if (a.subgroup === 2) return (r = 1);
      if (b.subgroup === 5) return (r = -1);
      console.log("Result:", r);
      return r;
    } */
  },
  {
    id: "a2",
    content: "Group 2",
    subgroupOrder: "sborder"
  }
];
const options = {
  editable: {
    add: true,
    remove: false,
    updateGroup: false,
    updateTime: true
  },

  margin: {
    axis: 5,
    item: {
      vertical: 5,
      horizontal: 0
    }
  },
  orientation: {
    axis: "both",
    item: "top"
  },
  start: moment()
    .subtract(4, "days")
    .format(),
  end: moment()
    .add(4, "weeks")
    .format(),
  stack: false,
  stackSubgroups: false,
  type: "range",
  width: "100%",
  zoomable: true,
  zoomMin: 147600000,
  zoomMax: 51840000000
};
const items = [
  {
    start: moment()
      .subtract(4, "days")
      .format(),
    end: moment()
      .subtract(3, "days")
      .format(), // end is optional
    content: "Step1",
    group: "a1"
  },
  {
    start: moment()
      .subtract(3, "days")
      .format(),
    end: moment().format(), // end is optional
    content: "Step2",
    group: "a2"
  }
];

fetchGroups()

async function fetchGroups() {
   let groupsJson = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json.textContent
  console.log(groupsJson)
}

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleTimelineViewChange(event) {
    let range = event.target.textContent;
    let startTime = moment();
    let endTime = moment();
    switch (range) {
      case "One Week":
        startTime = startTime.subtract(1, "day");
        endTime = endTime.add(1, "week");
        break;
      case "Two Weeks":
        startTime = startTime.subtract(2, "day");
        endTime = endTime.add(2, "week");
        break;
      case "Six Weeks":
        startTime = startTime.subtract(6, "day");
        endTime = endTime.add(6, "week");
        break;
      default:
        startTime = moment().subtract(4, "days");
        endTime = endTime.add(4, "weeks");
    }
    this.handleUserTimelineMove({
      byUser: true,
      start: startTime.format(),
      end: endTime.format()
    });
  }
  handleUserTimelineMove(update) {
    if (update.byUser) {
      this.handleRangeChange(update); //pass the update to the debounced function to pass along to the reducer
      this.setState({
        timelineOptions: {
          start: update.start,
          end: update.end
        }
      });
    }
  }

  render() {
    let actionButtons;
    actionButtons = (
      <div className="card-header-actions">
        <Button outline color="primary">
        -
        </Button>
        <Button outline color="primary">
          +
        </Button>

        <ButtonDropdown isOpen={false}>
          <DropdownToggle className="p-0 btn btn-setting" color="transparent">
            <i
              id="timelineRangeSelector"
              className="card-header-action btn btn-setting icon-magnifier-add icons"
              title="Timeline view"
            />
          </DropdownToggle>
          <DropdownMenu className="timelineRangeSelector--dropdown" right>
            <DropdownItem onClick={this.handleTimelineViewChange}>
              One Week
            </DropdownItem>
            <DropdownItem onClick={this.handleTimelineViewChange}>
              Two Weeks
            </DropdownItem>
            <DropdownItem onClick={this.handleTimelineViewChange}>
              Four Weeks
            </DropdownItem>
            <DropdownItem onClick={this.handleTimelineViewChange}>
              Six Weeks
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>

        <ButtonGroup className="float-right">
          <ButtonDropdown isOpen={false}>
            <DropdownToggle className="p-0 btn btn-setting" color="transparent">
              <i
                className="card-header-action btn btn-setting icon-settings"
                title="Timeline actions"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem disabled>{"Combine Systems"}</DropdownItem>
              <DropdownItem>Generate New PM's</DropdownItem>
              <DropdownItem>{"Show Action Plans"}</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    );
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Timeline</strong>
            {actionButtons}
          </CardHeader>
          <CardBody>
            <Timeline options={options} items={items} groups={groups} />
          </CardBody>{" "}
        </Card>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<DisplayComponent />, rootElement);
