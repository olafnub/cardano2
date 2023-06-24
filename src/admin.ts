import mongoose, {Schema, model} from 'mongoose'

interface Username {
    username: string,
    password: string
}

const mySchema = new Schema<Username>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const admin = mongoose.model<Username>('admin', mySchema);
export default admin;
