import {createScope, getAllScope} from '../controllers/scopeController.js'
import express from 'express'

const router = express.Router();

router.route('/api/scopes')
    .get(getAllScope)
    .post(createScope);


const scopeRoutes = router;
export default scopeRoutes