const router = require('express').Router();
const {
    getDashboards,
    getDashboard,
    getWidgets,
    addWidget,
    updateWidget,
    deleteWidget,
    getAll,
    getWidget
} = require('../shared/lowdb-instance');

// <editor-fold desc="DASHBOARDS">

router.get('/', (req, res) => {
    res.status(200).json(getDashboards());
});

router.get('/:id', async (req, res) => {
    res.status(200).json(await getDashboard(req.params.id));
});

router.post('/:id', (req, res) => {
    req.body.widgets.forEach(w => addWidget(w))

    res.status(200).json(getAll());
});

//</editor-fold>

// <editor-fold desc="WIDGETS">

router.get('/:dashboardId/widget', async (req, res) => {
    res.status(200).json(await getWidgets(req.params.dashboardId));
});

router.post('/:dashboardId/widget', async (req, res) => {
    const widget = await addWidget(req.params.dashboardId, req.body)

    res.status(200).json(widget);
});

router.put('/:dashboardId/widget/:widgetId', async (req, res) => {
    await updateWidget(req.params.dashboardId, req.params.widgetId, req.body)

    res.status(200).json(getWidget(req.params.dashboardId, req.params.widgetId));
});

router.delete('dashboardId/widget/:widgetId', async (req, res) => {
    await deleteWidget(req.params.dashboardId, req.params.widgetId)

    res.status(200).json({});
});

//</editor-fold>

module.exports = router;