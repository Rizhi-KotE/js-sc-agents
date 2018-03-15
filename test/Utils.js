import _ from "underscore";

function makeArgumentsList(list) {
    const pairs = _.map(list, (val, key) => [`${key}_`, addr.value]);
    return _.object(pairs);
}

export default async function doCommand(cmdAddr, argumentsList) {
    argumentsList = argumentsList || [];
    const args = _.extend(makeArgumentsList(argumentsList), {'cmd': cmdAddr});

    const options = {
        method: "POST"
    };
    return fetch("/api/cmd/do/?"+_.map(args, (val, key) => `${key}=${val}`).join("&"), options);
}