import {Prisma} from "@prisma/client";
import {prisma} from "../config/database.js";

async function update(patientId: string, data: Prisma.AddressUncheckedUpdateInput) {
    return prisma.address.update({
        // @ts-ignore
        where: {
            patientId
        },
        data
    })
}

const addressRepository = {
    update
}

export default addressRepository