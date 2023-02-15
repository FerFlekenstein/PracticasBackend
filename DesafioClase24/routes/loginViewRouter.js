import { Router } from "express";
import userModel from "../models/userModel.js";
const router = Router();
//views 
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/', (req, res) => {
    if(req.session.user !== undefined) res.redirect('/ejs')
    else res.render('login');
})
//logic
router.post('/register', async (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    //no pueden faltar los valores requeridos en model
    if (!nombre || !email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" });
    const userExists = await userModel.findOne({ email });
    //no pueden haber 2 usuarios con el mismo email
    if (userExists) return res.status(400).send({ status: "error", error: "El usuario ya existe" });
    const result = await userModel.create({
        nombre,
        apellido,
        email,
        password
    })
    res.send({ status: "success", payload: result })
})
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" });
    const user = await userModel.findOne({ email, password });
    if (!user) return res.status(400).send({ status: "error", error: "Correo o contraseña inválidos" });
    req.session.user = {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
    }
    res.send({status:"success",message:"Logueado :)"})
})
router.get('/logout', (req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }
        });
        res.clearCookie('connect.sid')
        setTimeout(() => {
            res.redirect('/')
        }, 2000)
    } catch (error) {
        console.log(error)
    }
})
export default router;