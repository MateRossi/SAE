import Modality from "../model/Modality";
import Course from "../model/Course";

export default function associateModels() {
    associateCourseModality();

}

function associateCourseModality() {
    Course.associate();
    Modality.associate();
}