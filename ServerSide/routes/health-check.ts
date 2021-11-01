import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) =>
{
    return res.status(200).json({ response: "UP" });
});

export default router;