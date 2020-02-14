export interface dataProvider {
    firstName: string,
    middleName: string,
    lastName: string, 
    eMail: string, 
    phone: string, 
    role: number,
    address: string
}

export let fetchData = (): Promise<Response> => {
    return fetch("../data/data.json")
        .then(res => res);
}
