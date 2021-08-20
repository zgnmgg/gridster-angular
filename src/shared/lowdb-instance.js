const low = require('lowdb')
const { v4: uuidv4 } = require('uuid');
const FileSync = require('lowdb/adapters/FileSync')
const _ = require('lodash');

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({
    dashboards: [],
    widgets: [],
    vendors: [],
    devices: [],
    assets: [],
}).write()

getAll = () => {
    return db.value()
}

// <editor-fold desc="DASHBOARDS">

getDashboards = () => {
    return db.get('dashboards')
        .value()
}

getDashboard = async (id) => {
    const dashboard = await db.get('dashboards')
        .find({ id })
        .value()

    return {
        ...dashboard,
        widgets: await getWidgets(id)
    }
}

//</editor-fold>

// <editor-fold desc="WIDGETS">

addWidget = async (dashboardId, widget) => {
    if (db.get('widgets')
        .find({ dashboard: dashboardId, id: widget.id })
        .value()) {
        await db.get('widgets')
            .find({ dashboard: dashboardId, id: widget.id })
            .assign({
                ...widget,
                updatedAt: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })
            })
            .write()

        return getWidget(dashboardId, widget.id);
    } else {
        const newWidget = {
            ...widget,
            id: uuidv4(),
            dashboard: dashboardId,
            createdAt: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }),
            updatedAt: null
        }

        await db.get('widgets')
            .push(newWidget)
            .write()

        return newWidget;
    }
}

updateWidget = async (dashboardId, widgetId, widget) => {
    db.get('widgets')
        .find({ dashboard: dashboardId, id: widgetId })
        .assign({
            cols: widget.cols,
            rows: widget.rows,
            y: widget.y,
            x: widget.x,
            label: widget.label,
            filters: widget.filters,
            options: widget.options,
            updatedAt: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })
        })
        .write()
}

deleteWidget = async (dashboardId, widgetId) => {
    db.get('widgets')
        .find({ dashboard: dashboardId })
        .remove({ widgetId })
        .write()
}

getWidgets = async (dashboardId) => {
    const widgets = await db.get('widgets')
        .value()

    return widgets.filter(w => w.dashboard === dashboardId)
}

getWidget = (dashboardId, widgetId) => {
    return db.get('widgets')
        .find({ dashboard: dashboardId, id: widgetId })
        .value()
}

//</editor-fold>

// <editor-fold desc="VENDORS">

getVendors = () => {
    return db.get('vendors')
        .value()
}

//</editor-fold>

// <editor-fold desc="DEVICES">

getDevices = async (assetIds, vendorId) => {
    let devices = await db.get('devices').value()
    if(assetIds) devices = _.filter(devices,d => assetIds.includes(d.assetId))
    if(vendorId) devices = _.filter(devices,d => d.vendorId === vendorId)
    return devices;
}

//</editor-fold>

// <editor-fold desc="ASSETS">

getAssets = () => {
    return db.get('assets')
        .value()
}

//</editor-fold>

module.exports = {
    getAll,
    getDashboards,
    getDashboard,
    addWidget,
    updateWidget,
    deleteWidget,
    getWidgets,
    getWidget,
    getVendors,
    getDevices,
    getAssets
}