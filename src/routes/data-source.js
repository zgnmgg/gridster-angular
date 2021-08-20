const router = require('express').Router();
const sample = require('./../shared/utils')

sample.srand(new Date())

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const HOURS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
const SEASONS = ['Autumn', 'Winter', 'Spring', 'Summer']

router.get('/', (req, res) => {
    switch (req.query.type) {
        case 'line-chart':
            return res.status(200).json({
                xLabel: 'Month',
                labels: MONTHS,
                data: [
                    {
                        label: 'Data 1',
                        data: sample.numbers({count: MONTHS.length, min: 30, max: 75})
                    },
                    {
                        label: 'Data 2',
                        data: sample.numbers({count: MONTHS.length, min: 30, max: 75})
                    }
                ],
                config: {}
            });
        case 'bar-chart':
            return res.status(200).json({
                xLabel: 'Hours',
                labels: HOURS,
                data: [
                    {
                        label: 'Data 1',
                        data: sample.numbers({count: HOURS.length, min: 30, max: 55})
                    }
                ],
                config: {}
            });
        case 'pie-chart':
            if(req.query.mode === 'SYSTEM' && req.query.attribute === 'device-status') {
                return res.status(200).json({
                    xLabel: 'Status',
                    labels: ['Online', 'Offline'],
                    data: [
                        {
                            label: 'Data 1',
                            data: sample.numbers({count: 2, min: 0, max: 60, decimals: 0})
                        }
                    ],
                    config: {}
                });
            } else if(req.query.mode === 'SYSTEM' && req.query.attribute === 'command-status') {
                return res.status(200).json({
                    xLabel: 'State',
                    labels: ['Success', 'Fail', 'Queue'],
                    data: [
                        {
                            label: 'Data 1',
                            data: sample.numbers({count: 3, min: 0, max: 60, decimals: 0})
                        }
                    ],
                    config: {}
                });
            }

            return res.status(200).json({
                xLabel: 'Season',
                labels: SEASONS,
                data: [
                    {
                        label: 'Data 1',
                        data: sample.numbers({count: SEASONS.length, min: 100, max: 1000})
                    }
                ],
                config: {}
            });
        case 'bar-stacked-chart':
            return res.status(200).json({
                xLabel: 'Season',
                labels: SEASONS,
                data: [
                    {
                        label: 'Data 1',
                        data: sample.numbers({count: SEASONS.length, min: 30, max: 55})
                    },
                    {
                        label: 'Data 2',
                        data: sample.numbers({count: SEASONS.length, min: 30, max: 55})
                    },
                    {
                        label: 'Data 3',
                        data: sample.numbers({count: SEASONS.length, min: 30, max: 55})
                    }
                ],
                config: {}
            });
        case 'table':
            const data = [
                {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
                {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
                {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
                {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
                {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
                {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
                {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
                {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
                {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
                {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
                {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
                {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
                {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
                {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
                {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
                {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
                {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
                {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
                {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
                {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
            ];

            return res.status(200).json({
                rows: data,
                config: {}
            });
        case 'last-value':

            return res.status(200).json({
                value: sample.numbers({count: 1, min: 0, max: 100})[0]
            })
    }
});

router.get('/bar', (req, res) => {
    res.status(200).json({
        labels: HOURS,
        data: sample.numbers({count: HOURS.length, min: 30, max: 55}),
        config: {}
    });
});

router.get('/bar-stacked', (req, res) => {
    res.status(200).json({
        labels: SEASONS,
        data: [
            {
                label: 'Data 1',
                backgroundColor: 'info',
                data: sample.numbers({count: SEASONS.length, min: 30, max: 55})
            },
            {
                label: 'Data 2',
                backgroundColor: 'warning',
                data: sample.numbers({count: SEASONS.length, min: 30, max: 55})
            },
            {
                label: 'Data 3',
                backgroundColor: 'danger',
                data: sample.numbers({count: SEASONS.length, min: 30, max: 55})
            }
        ],
        config: {}
    });
});

router.get('/line', (req, res) => {
    res.status(200).json({
        labels: MONTHS,
        data: sample.numbers({count: MONTHS.length, min: 30, max: 75}),
        config: {}
    });
});

router.get('/pie', (req, res) => {
    res.status(200).json({
        labels: SEASONS,
        data: sample.numbers({count: SEASONS.length, min: 100, max: 1000}),
        config: {}
    });
});

router.get('/table', (req, res) => {
    const data = [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ];

    res.status(200).json({
        rows: data,
        config: {}
    });
});

module.exports = router;