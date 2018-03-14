import Validate from "validate-arguments";

export function validate(value, spec) {
    let result = Validate.validate(value, spec);
    if(!result.isValid())
        throw new Error(result.errorString());
}
