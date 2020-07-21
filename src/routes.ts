import {UserController} from "./controller/UserController";
import {CharacterController} from "./controller/CharacterController"
import {ActivityController} from "./controller/ActivityController"
import {StatsController} from "./controller/StatsController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/character/create",
    controller: CharacterController,
    action: "create"
}, {
    method: "post",
    route: "/character",
    controller: CharacterController,
    action: 'getInfos'
},{
    method: "post",
    route: "/activity/retrieve",
    controller: ActivityController,
    action: "save"
}, {
    method: "get",
    route: "/",
    controller: UserController,
    action: "getInfos"
}, {
    method: "post",
    route: "/stats/add",
    controller: StatsController,
    action: "create"
}];