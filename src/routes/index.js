import AuthApiRoute from "./AuthRoute.js";
import roleRoutes from "./roleRoute.js";
import permissionRoutes from "./permissionRoute.js";
import utilisateurRoutes from "./utilisateurRoute.js";
import utilisateurRoleRoutes from "./utilisateurRoleRoute.js";
import rolePermissionRoutes from "./rolePermissionRoute.js";

const ApiRoutes = (app) => {
    app.use(AuthApiRoute); // Route pour l'authentification
    app.use(roleRoutes);
    app.use(permissionRoutes); // Route pour les archives
    app.use(utilisateurRoutes); 
    app.use(utilisateurRoleRoutes);
    app.use(rolePermissionRoutes);
};
export default ApiRoutes