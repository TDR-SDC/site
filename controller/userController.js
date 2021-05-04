const azure = require('azure-storage');
const Users = require('../models/users');
const Sponsors = require('../models/sponsors');
const CAD = require('../models/cad');
const Docs = require('../models/team_documents');

module.exports.profile = function (req, res) {
    if (req.isAuthenticated()) {
        Users.find().sort({ permission: 1, name: 1 }).then((user) => {
            Sponsors.find({}, function (err, sponsors) {
                CAD.find({}, function (err, cad) {
                    Docs.find({}, function (err, document) {
                        return res.render('profile', {
                            profile_user: user,
                            sponsors: sponsors,
                            cad_list: cad,
                            documents: document
                        });
                    });
                });
            });
        });
    }
    else res.redirect('/login');
};

module.exports.upload_avatar = async function (req, res) {
    var user = await Users.findById(req.user._id);
    Users.uploadedAvatar(req, res, async function (err) {
        var blobService = azure.createBlobService();
        blobService.createBlockBlobFromLocalFile('team-members', `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) { });

        var avatarUrl = blobService.getUrl("team-members", `${req.file.originalname}`);
        user.avatar = avatarUrl;
        user.save();
    });
    res.redirect('/user');
};

module.exports.create = async function (req, res) {
    var permission = 10;
    if (req.body.year == 1)
        permission = 9;
    if (req.body.year == 2)
        permission = 8;
    if (req.body.year == 3)
        permission = 7;
    if (req.body.year == 4)
        permission = 10;
    if (req.body.position.toLowerCase().includes('lead'))
        permission = 3;
    if (req.body.position.toLowerCase().includes('manager'))
        permission = 2;
    if (req.body.position.toLowerCase().includes('team lead'))
        permission = 1;
    var management = false;
    if (req.body.management)
        management = true;

    await Users.create({
        "user": req.body.user,
        "name": req.body.name,
        "password": req.body.password,
        "dept": req.body.dept,
        "year": req.body.year,
        "position": req.body.position,
        "permission": permission,
        "management": management
    });
    res.redirect('/user/profile');
};

module.exports.update_credentials = async function (req, res) {
    let user = req.user;
    
    if (req.body.name)
        user.name = req.body.name;
    if (req.body.password)
        user.password = req.body.password;
    if (req.body.insta)
        user.social.insta = req.body.insta;
    if (req.body.linkedin)
        user.social.linkedin = req.body.linkedin;
    if (req.body.twitter)
        user.social.twitter = req.body.twitter;
    user.save();

    res.redirect('back');
}

// This function is solely for testing and mannual DB changes.
// Tread carefully over this function.
module.exports.user_info = async function (req, res) {
    if (req.isAuthenticated() && (req.user.user == 'krush' || req.user.permission == 0)) {
        await Users.find({}, (err, user) => {
            if (user.avatar == "https://defianzdtusdc.blob.core.windows.net/team-members/Screenshot%20from%202021-04-20%2012-17-05.png")
                Users.findByIdAndUpdate(user._id, { avatar: "https://defianzdtusdc.blob.core.windows.net/team-members/placeholder.png" });
            res.send(user);
        });
    }
    else
        res.render('error', {
            error: true,
            error_code: 403,
            error_message: "Forbidden!! You do not have access to this page."
        });
};

module.exports.logout = function (req, res) {
    req.logout();
    res.redirect('back');
};

module.exports.add_team_doc = function (req, res) {
    const document = new Docs();
    Docs.uploadedFile(req, res, async function (err) {
        var blobService = azure.createBlobService();
        var containerName = 'team-documents';
        blobService.createBlockBlobFromLocalFile(containerName, `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) { });

        var documentUrl = blobService.getUrl(containerName, `${req.file.originalname}`);
        document.file_name = req.file.originalname;
        document.remarks = req.body.remarks;
        document.location = documentUrl;
        document.posted_by = req.user.user;
        document.save();
        res.redirect('back');
    });
};
