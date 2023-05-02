import { Router } from "express";
import { getAll,getOne,save,update,deleteOne } from "../controllers/porductsControllers";

const productsRouterM = Router();

productsRouterM.get('/',getAll);
productsRouterM.get('/:id',getOne);
productsRouterM.post('/',save);
productsRouterM.put('/:id',update);
productsRouterM.delete('/:id',deleteOne);

export default productsRouterM;
