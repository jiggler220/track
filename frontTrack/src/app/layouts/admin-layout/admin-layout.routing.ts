import { Routes } from "@angular/router";

import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { MapComponent } from "../../pages/map/map.component";
import { UserComponent } from "../../pages/user/user.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "maps", component: MapComponent },
  { path: "user", component: UserComponent },
];
