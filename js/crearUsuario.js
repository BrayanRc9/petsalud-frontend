import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import Usuario from '../models/Usuario.js'

dotenv.config()
mongoose.connect(process.env.MONGO_URI)

const crearUsuario = async () => {
  const hash = await bcrypt.hash('admin123', 10)

  const medico = new Usuario({
    nombre: 'Dr. Veterinario',
    email: 'medico@petsalud.com',
    password: hash,
    rol: 'medico'
  })

  await medico.save()
  console.log('Usuario médico creado')
  process.exit()
}

crearUsuario()
