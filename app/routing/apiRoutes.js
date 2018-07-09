var friendlist = require('../data/friends.js');

module.exports = function(app){
    app.get('/api/friends', function(req, res){
        res.json(friendlist)
    })
    app.post('/api/friends', function(req, res){
        var newFriend = req.body;

        for(var i = 0; i<newFriend.scores.length; i++){
            switch(newFriend.scores[i]){
                case "1 (Strongly Disagree)": newFriend.scores[i] = 1;
                    break;
                case "5 (Strongly Agree)": newFriend.scores[i] = 5;
                    break;
                default:
                    newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }

        var friendDifferences = [];
        var difference = 0;
        for(var i = 0; i<friendlist.length; i++){
            for(var n = 0; n<newFriend.scores.length; n++){
                var questionDif = newFriend.scores[n] - friendlist[i].scores[n];
                // console.log(questionDif);
                if(questionDif < 0) questionDif *= -1;
                difference += questionDif;
            }
            friendDifferences.push(difference);
            // console.log("difference: " + difference);
            difference = 0;
        }

        var lowDif = 41;
        var lowFriendIndex = -1;
        for(var i=0; i<friendDifferences.length; i++){
            if(friendDifferences[i] < lowDif) {
                lowFriendIndex = i;
                lowDif = friendDifferences[i];
            }
        }

        friendlist.push(newFriend);

        res.json(friendlist[lowFriendIndex]);
    })
}