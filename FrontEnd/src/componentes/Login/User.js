import React, {useRef,useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom' 
import Avatar from '@material-ui/core/Avatar';
import AvatarUploader from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Cookies from 'js-cookie';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import swal from "sweetalert";
import Box from '@material-ui/core/Box';
import TrainIcon from '@material-ui/icons/TrainOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,Select, MenuItem,  } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
//import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {register,ActualizarPerfil,getUserData} from "../Functions/UserFunctions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: '200px', // Fix IE 11 issue.
    height: '200px', // Fix IE 11 issue.
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  })
);
export default function User() {
	
  const classes = useStyles();
  const history = useHistory();

  const Nombre = useRef('') 
  const Apellido = useRef('') 
  const Cargo = useRef('')
  const email = useRef('') 
  const password = useRef('') 
  const password1 = useRef('') 
  const password2 = useRef('') 
  const Departamento = useRef('') 
  const Tipo = useRef('') 

  const ImagenRef = useRef()

  const [data, setData] = useState([]);
  const [data1, setData1] = useState();
  const imagenes = useRef()

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const handleChange = async(e) =>{
    const base64 = await convertBase64(e.target.files[0])
    //console.log("base64")
    //console.log(base64)
    imagenes.current = base64
    setData1(base64)
  }

  const [Mensajes, setMensajes] = useState([]);
  const erroClave = useRef('')
  const erroClave2 = useRef('')

  const Validaciones = (event) =>{

    const nombre = event.currentTarget.name;
    const valor = event.currentTarget.value;
    const index = event.currentTarget.id;

    if(nombre=='passwordN1'){
      if(/^([A-Za-z0-9????????????????????#$%&/()']){8,}$/i.test(valor)){
        console.log("Lleque aqui");
        if((!/[A-Z]+/.test(valor))||(!/[0-9]+/.test(valor))||(!/[#$%&/()']+/.test(valor))){
          console.log("Lleque aquiiii");
          erroClave.current = "La contrase??a debe tener al menos una may??scula, un n??mero y alguno de los siguientes caracteres: #$%&/()'";
          password1.current.error=true;
          setMensajes("a");
        }else{
          erroClave.current = "";
          password1.current.error=false;
          setMensajes("b");
        }
      }else{
        console.log("Lleque aquiiii");
        erroClave.current = "Minimo debe de tener 8 caracteres";
        password1.current.error=true;
        setMensajes("c");
      }
    }
    if(nombre=='passwordN2'){
      if(/^([A-Za-z0-9????????????????????#$%&/()']){8,}$/i.test(valor)){
        if((!/[A-Z]+/.test(valor))||(!/[0-9]+/.test(valor))||(!/[#$%&/()']+/.test(valor))){
          erroClave2.current = "La contrase??a debe tener al menos una may??scula, un n??mero y alguno de los siguientes caracteres: #$%&/()'";
          password2.current.error=true;
          setMensajes("d");
        }else{
          erroClave2.current = "";
          password2.current.error=false;
          setMensajes("e");
        }
      }else{
        erroClave2.current = "Minimo debe de tener 8 caracteres";
        password2.current.error=true;
        setMensajes("f");
      }
    }
  }

  const Envio = (event) => {
    event.preventDefault();
    if(password1.current.value == password2.current.value)
    {
    	console.log(password1.current.value)
		const newUser = {
			Nombre: Nombre.current.value,
			Apellido: Apellido.current.value,
			Foto: imagenes.current,
			email: email.current.value,
			password: password.current.value,
			passwordn: password1.current.value,
			Departamento: departamento,
			Tipo: cargo
		}
		console.log(newUser)
		ActualizarPerfil(newUser).then(res => {
			console.log(res)
			if(res.success == true)
			{
				swal("??Actualizado!","", "success")
			}
			else
			{
				swal("??Error!","Ingresa tu contrase??a actual.", "error")
			} 
		})    
    }
    else
      swal("??Error!","Tu nueva contrase??a no coincide.", "error")
    
  }

  const [nombre, setNombre] = useState([]);
  const [apellido, setApellido] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [contrase??a, setContra] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [correo, setEmail] = useState([]);

  useEffect(() => {
    getLocal();
  }, []);

  const getLocal = async () => {
    const url = '/users/get_User'
    let email_p = Cookies.get("Email")
    console.log(email_p)
    const ema = {
      url: url,
      email: email_p
    }
    const _data = await getUserData(ema)
    console.log(_data)
    if (_data.data.Foto)
    {
      var bufferBase64 = new Buffer( _data.data.Foto, 'binary' ).toString('ascii');
      imagenes.current = bufferBase64
      setData1('a')
    }
    else
    {
      imagenes.current = "/images/avatars/U_T_titular.png"
      setData1('a')
    }
    let obj = _data.data
    let datas = _data.data.Nombre
    Nombre.current.value = datas
    setNombre(datas)
    let datas1 = _data.data.Apellido
    setApellido(datas1)
    Apellido.current.value = datas1
    let datas2 = _data.data.Tipo
    setCargo(datas2)
    let datas3 = _data.data.password
    setContra(datas3)
    let datas4 = _data.data.Departamento
    setDepartamento(datas4)
    let datas5 = _data.data.email
    setEmail(datas5)
    email.current.value = datas5
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Avatar alt="Person" className={classes.avatar} width="240" height="50" src={imagenes.current}/>
          <input
        accept="image/*"
        className={classes.input}
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="raised-button-file">
      <Button variant="contained" color="primary" component="span" style={{backgroundColor:"#CC353F"}}>
          <AddAPhotoIcon/>
        </Button>
</label> 
        <Typography component="h5" variant="h5">
          Mi Perfil
        </Typography>
        
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="Nombre"
                key="Nombre"
                helperText="Nombre"
                inputRef={Nombre}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Apellido"
                key="Apellido"
                helperText="Apellido"
                name="lastName"
                autoComplete="lname"
                inputRef={Apellido}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Departamento"
                key="Departamento"
                label="Departamento"
                value={departamento}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Cargo"
                key="Cargo"
                label="Cargo"
                name="lastName"
                value={cargo}
                autoComplete="lname"
                inputRef={Cargo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                key="email"
                helperText="Correo Electr??nico"
                name="email"
                inputRef={email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contrase??a actual"
                type="password"
                id="password"
                key="password"
                inputRef={password}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
             <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordN1"
                label="Nueva contrase??a"
                type="passwordN1"
                id="passwordN1"
                key="passwordN1"
                inputRef={password1}
                error={password1.current.error}
                helperText={erroClave.current}
                onBlur={Validaciones}
                autoComplete="current-password"
              />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordN2"
                label="Nueva contrase??a"
                type="passwordN2"
                id="passwordN2"
                key="passwordN2"
                inputRef={password2}
                error={password2.current.error}
                helperText={erroClave2.current}
                onBlur={Validaciones}
                autoComplete="current-password"
              />
              </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            style={{backgroundColor:"#CC353F"}}
            className={classes.submit}
            onClick={Envio}
            activeClassName="active"
          >
            Actualizar
          </Button>
        </form>
      </div>
    </Container>
  );
}
