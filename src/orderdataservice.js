import vis from 'vis/dist/vis-timeline-graph2d.min'
import moment from "moment";
import { Properties } from "./constants.js"

/**
 * Creates a new DataSet
 * @param {JSON} options 
 * @returns 
 */
export function createDataSet(options) {
    return new vis.DataSet(options)
}


/**
 * Fetches the initial data 
 * @returns
 */
export async function fetchInitialData() {
    let groups = fetchGroups()
    let items = fetchOrders(new Date())

    let [r1, r2] = await Promise.all([groups, items])

    return {
        "groups": r1,
        "items": r2
    }
}

/**
 * Returns all groups.
 * @returns 
 */
export async function fetchGroups() {
    let response = await fetch(Properties.groupsURL)
    let json = await response.json()

    let ds = new vis.DataSet({})

    ds.add({
        id: "a1",
        content: "Sergei Action Plan"
    }
    )

    ds.add({
        id: "a2",
        content: "Group 2",
        subgroupOrder: "sborder"
    })

    // for (var key in json) {
    //     let group = json[key]
    //     ds.add({
    //         id : group.id,
    //         content : group.content
    //     })
    // }

    return ds
}

/**
 * Returns orders for the given day. Any date in the given day is allowed.
 * @param {Date} day 
 * @returns 
 */
export async function fetchOrders(day) {
    let response = await fetch(Properties.ordersURL)
    let json = await response.json()

    let ds = new vis.DataSet({})

    ds.add([
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
    ])

    // for (var key in json) {
    //     let order = json[key]
    //     ds.add({
    //         id: order.id,
    //         content: order.content,
    //         start: order.start,
    //         end: order.end,
    //         group: order.group,
    //         category: order.category
    //     })
    // }

    return ds
}
