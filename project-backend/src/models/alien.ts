import mongoose from "mongoose";
import { Alien } from "../../assets/types";

const AlienSchema = new mongoose.Schema<Alien>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        dropDups: true
    },
    tech: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sub: {
        type: Boolean,
        required: true,
        default: false
    }
});

const AlienModel = mongoose.model("Aliens", AlienSchema, "Aliens");

export { AlienSchema, AlienModel };
