import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    todo: {
        type: String,
        required: [true, "Todo is required"]
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true });

export default mongoose.model("todo", TodoSchema);