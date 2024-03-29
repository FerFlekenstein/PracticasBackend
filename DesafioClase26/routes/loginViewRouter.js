import { Router } from "express";
import passport from "passport";
import { userService } from "../daos/index.js";
import { createHash } from "../utils.js";

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
    const userExists = await userService.getBy({ email });
    //no pueden haber 2 usuarios con el mismo email
    if (userExists) return res.status(400).send({ status: "error", error: "El usuario ya existe" });
    const hashedPassword = await createHash(password)
    const result = await userService.save({
        nombre,
        apellido,
        email,
        password: hashedPassword
    })
    res.send({ status: "success", payload: result })
})
router.post('/', passport.authenticate('login', {failureRedirect: "/fail", failureMessage: true}), async (req, res) => {
    const user = req.user
    req.session.user = {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
    }
    res.redirect(307, '/ejs');
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
router.get("/fail", (req, res) => {
    if(req.session.messages.length>4) return res.status(400).send({message:"se paso de intentos"})
    res.status(400).send({status:"error",error:"Error de autenticación"})
})
//solicita la info a github y se la pasa a passport. (se identifica la app con github)
router.get('/github',passport.authenticate('github'),(req,res)=>{})
//trabaja la solicitud de datos del user a github
router.get('/login/githubcallback', passport.authenticate('github'), (req, res) => {
    const user = req.user
    req.session.user = {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
    }
    res.redirect('/')
})
export default router;