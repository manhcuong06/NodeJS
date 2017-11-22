var Model = require('./_model');
var Message = require('./message');
var User = require('./user');

const COLLECTION_NAME = 'conversation';

module.exports = class Conversation extends Model {
    constructor() {}

    static async find(conditions = {}) {
        var conversations = await Model.find(COLLECTION_NAME, conditions);
        var messages = await Message.find();
        var users = await User.find({level: '4'});

        conversations.forEach(con => {
            // Get All Messages
            con.messages = [];
            messages.forEach(mes => {
                if (con._id.toString() == mes.conversation_id.toString()) {
                    con.messages.push(mes);
                    return;
                }
            });

            // Get User Information
            users.forEach(user => {
                if (con.user_id.toString() == user._id.toString()) {
                    con.name = user.name;
                    con.image = user.image;
                    return;
                }
            });
        })
        return conversations;
    }

    static async findOne(conditions) {
        var conversation = await Model.findOne(COLLECTION_NAME, conditions);

        // Get All Messages
        conversation.messages = await Message.find({conversation_id: Message.getObjectId(conversation._id)});

        // Get User Information
        var user = await User.findOne({_id: User.getObjectId(conversation.user_id)});
        conversation.user = {
            name: user.name,
            image: user.image,
        }

        return conversation;
    }

    static async insert(conversation) {
        return await Model.insert(COLLECTION_NAME, conversation);
    }
};