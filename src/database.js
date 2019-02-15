const monk = require('monk');

let url = `mongodb://dbReadWrite:${
    process.env.MONGO_PW
}@cluster0-shard-00-00-qklfm.gcp.mongodb.net:27017,cluster0-shard-00-01-qklfm.gcp.mongodb.net:27017,cluster0-shard-00-02-qklfm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

const db = monk(url);
const broodjes = db.get('broodjes');

module.exports = function(app) {
    app.post('/addBroodje', (req, res) => {
        try {
            const { user, date, order, timeStamp } = req.body.broodje;

            broodjes
                .update(
                    { user, date },
                    { $set: { order, timeStamp } },
                    { upsert: true }
                )
                .then(r => res.status(200).json(r));
        } catch (error) {
            res.status(500).json(error);
        }
    });
    // app.post('/addBroodjeOld', (req, res) => {
    //     try {
    //         broodjes
    //             .insert(req.body.broodje)
    //             .then(r => res.status(200).json(r));
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // });
    app.get('/getBroodjes', (req, res) => {
        try {
            broodjes.find({}).then(r => {
                res.status(200).json(r);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    });

    app.get('/getBroodjesVandaag', (req, res) => {
        const d = new Date();
        const date =
            d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        try {
            broodjes.find({ date }).then(r => {
                res.status(200).json(r);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    });
};
