import AuthApiRoute from "./AuthRoute.js";
import roleRoutes from "./roleRoute.js";
import utilisateurRoutes from "./utilisateurRoute.js";
import scopeRoutes from "./scopeRoute.js";
import roleScopeRoutes from "./roleScopeRoute.js";

const ApiRoutes = (app) => {
    app.use(AuthApiRoute); // Route pour l'authentification
    app.use(roleRoutes);
    app.use(utilisateurRoutes); 
    app.use(scopeRoutes);
    app.use(roleScopeRoutes)
};
export default ApiRoutes