import { MedicController } from "./controller/MedicController";

export const Routes = [
    {
        method: "get",
        route: "/medic",
        controller: MedicController,
        action: "all"
    }, {
        method: "get",
        route: "/medic/:id",
        controller: MedicController,
        action: "one"
    }, {
        method: "post",
        route: "/medic",
        controller: MedicController,
        action: "save"
    }, {
        method: "delete",
        route: "/medic/:id",
        controller: MedicController,
        action: "remove"
    }
    // implementar rota update
];