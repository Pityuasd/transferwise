var transfers = db.transfersasd.find().toArray();

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

transfers.forEach(function (t) {
    var profile = db.profilesasd.findOne({"id": t['profile_id']});
    var recipient = db.profilesasd.findOne({"id": t['recipient_id']});

    t['src_country'] = profile['country'];
    t['tar_country'] = recipient['country'];

    t['_id'] = guid();

    db.transfersFinal.insert(t);
})