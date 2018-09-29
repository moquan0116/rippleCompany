let express = require('express');
let router = express.Router();
let bodyParser = require("body-parser");

const config = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const user = sequelize.define('hj_user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    address: Sequelize.STRING,
    password: Sequelize.STRING(50),
    secret: Sequelize.STRING,
    memo: Sequelize.TEXT
},{
    timestamps: false,
    freezeTableName: true,
});

router.get('/', function (req, res) {
    res.send('出来吧')
});

router.post('/ripple', bodyParser.json(),(req, res) => {
    /* user.findById(1).then(project => {
        res.json(project);
    }); */
    let post = req.body;
    let data = {password: post.pass};
    /*user.findOrCreate({where: {address: req.body.address}, defaults: data})
        .spread((user, created) => {
            res.send({data:user,reslut: created});
        });*/
    user.findOne({
        where: {address: post.address, password: post.pass}
    }).then(user => {
        res.json(user);
    })
});


module.exports = router;