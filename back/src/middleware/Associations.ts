import Modality from "../model/Modality";
import Course from "../model/Course";
import Review from "../model/Review";
import User from "../model/User";
import Survey from "../model/Survey";

export default function associateModels() {
    Course.associate();
    Modality.associate();
    Review.associate();
    User.associate();
    Survey.associate();
}