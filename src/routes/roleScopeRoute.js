import {createRoleScope, getAllRoleScope, deleteRoleScope} from '../controllers/roleScopeController.js'
import express from "express";

const router = express.Router();

router.route('/api/roleScopes')
    .get(getAllRoleScope)
    .post(createRoleScope);

router.delete('/api/roleScope', deleteRoleScope);

const roleScopeRoutes = router;
export default roleScopeRoutes