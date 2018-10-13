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
    username: Sequelize.STRING(50),
    password: Sequelize.STRING(50),
    address: Sequelize.STRING,
    secret: Sequelize.STRING,
    name: Sequelize.STRING,
    sex: Sequelize.TINYINT,
    status: Sequelize.TINYINT
},{
    timestamps: false,
    freezeTableName: true,
});
router.use(require('cors')());

router.get('/', function (req, res) {
    res.send('出来吧')
});
/*登陆*/
router.post('/login', bodyParser.json(),(req, res) => {
    let post = req.body;
    let data = {username: post.username, password: post.password};
    user.findOne({
        where: data
    }).then(user => {
        res.type('application/json');
        res.send(user);
    })
});

/*注册*/
router.post('/reg', bodyParser.json(),(req, res) => {
    let post = req.body;
    let data = {username: post.name,password: post.pass,address: post.address, secret: post.secret};
    let condition = {username: post.name}
    user.findOrCreate({where: condition, defaults: data})
        .spread((user, created) => {
            res.send({data:user,reslut: created});
        });
});

module.exports = router;