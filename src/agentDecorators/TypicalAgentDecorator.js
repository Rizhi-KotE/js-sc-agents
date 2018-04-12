import {FinalizeDecorator} from "./FinalizeDecorator";
import {FindQuestionDecorator} from "./FindQuestionDecorator";

export default function (executor) {
    const findQuestionDecorator = FindQuestionDecorator(FinalizeDecorator(executor));
    return findQuestionDecorator;
}