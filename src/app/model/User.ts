import mongoose , {Schema, Document} from 'mongoose';

export interface Message extends Document{
    content: string;
    createAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createAt:{
        type:Date,
        required:true,
        default: Date.now,
    }
});

export interface User extends Document{
    userName: string;
    email: string;
    password: string;
    varifyCode: string;
    varifyCodeExpiry: Date;
    isVarified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'Username is required'],
    },
    email:{
        type:String,
        required:[true, 'email is required'],
    },
    password:{
        type:String,
        required:[true, 'password is required'],
    },
    varifyCode:{
        type:String,
        required:[true, 'Varify Code is required'],
    },
    varifyCodeExpiry:{
        type:Date,
        required:[true, 'Varify code expiry is required'],
    },
    isVarified:{
        type:Boolean,
        default: false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default: true,
    },
    messages:{
        type:[MessageSchema],
    },
}); 

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;