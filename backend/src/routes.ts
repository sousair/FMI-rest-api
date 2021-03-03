import { MedicController } from "./controller/MedicController";

export const Routes = [
    {
        method: "get",
        route: "/medic",
        controller: MedicController,
        action: "getAllMedics"
    }, {
        method: "get",
        route: "/medic/specialties/:value",
        controller: MedicController,
        action: "getMedicsWithSpecificSpecialty"
    }, {
        method: "get",
        route: "/medic/:type/:value",
        controller: MedicController,
        action: "getOneMedic"
    }, {
        method: "post",
        route: "/medic",
        controller: MedicController,
        action: "saveMedic"
    },{
        method: "put",
        route: "/medic/:id",
        controller: MedicController,
        action: "updateMedic"
    }, {
        method: "delete",
        route: "/medic/:id",
        controller: MedicController,
        action: "removeMedic"
    }
];