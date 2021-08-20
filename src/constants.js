import moment from "moment";

export const Properties = {
    ordersURL : "https://jsonplaceholder.typicode.com/todos",
    groupsURL : "https://jsonplaceholder.typicode.com/todos"
}

export const TimelineOptions = {
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
