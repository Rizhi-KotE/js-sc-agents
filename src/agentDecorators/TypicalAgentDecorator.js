import {FinalizeDecorator} from "./FinalizeDecorator";
import {FindQuestionDecorator} from "./FindQuestionDecorator";
import {AddNrelAnswerDecorator} from "./AddNrelAnswerDecorator";

export default function (executor) {
    const findQuestionDecorator = FindQuestionDecorator(FinalizeDecorator(AddNrelAnswerDecorator(executor)));
    return findQuestionDecorator;
}