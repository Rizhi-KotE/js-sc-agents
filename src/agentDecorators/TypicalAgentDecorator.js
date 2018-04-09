import {FinalizeDecorator} from "./FinalizeDecorator";
import {FindQuestionDecorator} from "./FindQuestionDecorator";

export default function (executor) {
    return FindQuestionDecorator(FinalizeDecorator(executor));
}