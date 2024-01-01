import { Alien } from "./models";

function parseAlienEntries(alienTableData: any[]): Alien[] {
    const alienEntries: Alien[] = [];

    alienTableData.forEach((data: any) => {
        const name = data.name as string;
        const tech = data.tech as string;
        const age = data.age as number;
        const sub = data.sub as boolean;
        const mongo_db_id = data._id as string;
        const mongo_v = data.__v as number;

        const currAlien: Alien = {
            name: name,
            tech: tech,
            age: age,
            sub: sub,
            _id: mongo_db_id,
            __v: mongo_v
        };

        alienEntries.push(currAlien);
    });

    return alienEntries;
}

export { parseAlienEntries };
