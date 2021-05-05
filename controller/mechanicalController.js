const azure = require('azure-storage');
const CAD = require('../models/cad');

module.exports.add_cad = function (req, res) {
    const cad = new CAD();
    CAD.uploadedFile(req, res, async function (err) {
        var blobService = azure.createBlobService();
        var containerName = "cad";
        blobService.createBlockBlobFromLocalFile(containerName, `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) { });

        var cadUrl = blobService.getUrl(containerName, `${req.file.originalname}`);
        cad.remarks = req.body.remarks;
        cad.iteration = req.body.iteration;
        cad.location = cadUrl;
        cad.posted_by = req.user.user;
        cad.save();
        res.status(302).redirect('back');
    });
};
