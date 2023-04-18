import mongoose, {Schema, model} from 'mongoose';

interface IReviews {
    username: string,
    description: string,
    time: string
}

const mySchema = new Schema<IReviews>({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});
const user = mongoose.model<IReviews>('reviews', mySchema);
export default user;