import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';

import { Convert } from './helpers/converstions';
import { UserManagement } from './models/user-management-interface';

import routes from './routes/index';
import healthcheck from './routes/health-check';
import { Redis } from './helpers/redis';

const debug = require('debug')('express app');
const app = express();
const cors = require('cors')

// view engine setup | server uses pug, client angular
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);
app.use('/health-check', healthcheck);

// middleware
app.use(express.json());
app.use(express.urlencoded());

//redis class
const redis = new Redis();

// user endpoints ///////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/active', async (req: express.Request, res: express.Response) =>
{
    try
    {
        let request: UserManagement = Convert.castObject(req.body);
        let streams = await redis.GetStreams(request.userId);
        return res.json({ "activeStreams": streams });
    }
    catch (error)
    {
        return res.status(400).json({ "error": error });
    }
});


app.get('/count/:userId', async (req: express.Request, res: express.Response) =>
{
    try
    {
        let count = await redis.GetLength(req.params.userId);
        return res.json({ "count": count });
    }
    catch (error)
    {
        return res.status(400).json({ "error": error });
    }
});

app.post('/remove', async (req: express.Request, res: express.Response) =>
{
    try
    {
        let request: UserManagement = Convert.castObject(req.body);
        await redis.RemoveStream(request.userId)
        return res.status(200).json({ "success": "Removed top user" });;
    }
    catch (error)
    {
        return res.status(400).json({ "error": error });
    }
});

app.post('/add', async (req: express.Request, res: express.Response) =>
{
    try
    {
        let request: UserManagement = Convert.castObject(req.body);
        await redis.AddStream(request.userId, request.title);
        return res.status(200).json({ "success": `Added user ${ request.userId }` });
    }
    catch (error)
    {
        return res.status(400).json({ "error": error });
    }
});

// catch 404 and forward to error handler
app.use((req, res, next) =>
{
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// cors policy ///////////////////////////////////////////////////////////////////////////////////////////////////

// Add headers
app.use(function (req, res, next)
{

    // Website
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods | Restricted usage
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Pass to next layer of middleware
    next();
});

// error handlers ///////////////////////////////////////////////////////////////////////////////////////////////////

// development error handler
// will print stacktrace
if (app.get('env') === 'development')
{
    app.use((err, req, res, next) =>
    { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) =>
{ // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//default 3000 port
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function ()
{
    debug(`Server listening on port ${ (server.address() as AddressInfo).port }`);
});
