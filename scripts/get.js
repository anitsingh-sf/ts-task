export let fetchData = () => {
    return fetch("../data/data.json")
        .then(res => res);
};
