const { app } = require('./core'); 
const { db, update } = require('./db');

const devices = db.get('devices'); // Hämtar alla devices.
const categories = db.get('categories').value(); // Hämtar alla devices.

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.');
})

// IDN:
//  Vaccuum: VAC1
//  Light1: LIG1
//  Light2: LIG2
//  Light3: LIG3
//  Blind: BLI1
//  AC: AC1
//  Lock: LOC1
//  Camera: CAM1
//  Speaker: SPE1

/* CODE YOUR API HERE */

app.put('/api/:id/:state', (req, res) => {
    // http://localhost:3000/api/LOC1/unlock
        // Här måste man skicka in ett JSON objekt i request bodyn som ser ut så här: {"code":"1234"}
    // http://localhost:3000/api/AC1/on?temp=20
    // http://localhost:3000/api/LIG1/on?brig=0.6

    const id = req.params.id;
    const state = req.params.state;

    const foundDevice = devices.value().find(d => d.id == id); //Kollar om den kan hitta enheten med id:t.
    let msg = 'Device not found';
    let status = 200;

    if(foundDevice) { // Om enheten finns (dvs om ID:t stämmer). Allt detta kan bara köras om ett matchande id hittas.
        const device = devices.find({ id : id });
        const deviceObj = device.value();
        let unclearStateMsg = `Unclear state for ${deviceObj.id}.`;

        if(deviceObj.code) { // Om enheten kräver en kod.

            if(state == 'unlock'){
                if(req.body.code == deviceObj.code) { 
                    device.assign({locked: false}).value();
                    msg = `You unlocked ${deviceObj.id}.`;
                } else {
                    msg = `Wrong code for ${deviceObj.id}.`;
                    status = 401;
                }
            } else if (state == 'lock') {
                device.assign({locked: true}).value();
                msg = `You locked ${deviceObj.id}.`;
            } else {
                msg = unclearStateMsg;
                status = 404;
            }
        } else { // Om enheten inte kräver en kod.

            if (deviceObj.type == 'AC') { // Om enheten är en AC ska man kunna ändra temperaturen.
                req.query.temp ? device.assign({temperature : req.query.temp}).value() : '';
            } else if(deviceObj.type == 'Light') { // Om enheten är en lampa ska man kunna ändra ljusstyrkan.
                req.query.brig ? device.assign({brightness : req.query.brig}).value() : '';
            }

            if (state == 'on') { 
                device.assign({on : true}).value();
                msg = `You turned on ${deviceObj.id}.`;
            } else if (state == 'off') {
                device.assign({on : false}).value();
                msg = `You turned off ${deviceObj.id}.`;
            } else {
                msg = unclearStateMsg;
                status = 404;
            }
        }
    } else {
        status = 404;
    }
    res.status(status).send(msg);
    update();
});
