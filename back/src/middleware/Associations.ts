import Modality from "../model/Modality";
import Course from "../model/Course";
import Review from "../model/Review";
import Graduate from "../model/Graduate";

export default function associateModels() {
    Course.associate();
    Modality.associate();
    Review.associate();
    Graduate.associate();
}